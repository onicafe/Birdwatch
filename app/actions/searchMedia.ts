'use server';

interface MediaItem {
    id: number;
    source: 'tmdb' | 'anilist';
    title: string;
    poster: string | null;
    runtime: number; // minutes
    description: string;
    type: 'movie' | 'tv' | 'anime';
}

const TMDB_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

async function fetchAniList(query: string): Promise<MediaItem[]> {
    const url = 'https://graphql.anilist.co';
    const queryGQL = `
  query ($search: String) {
    Page(page: 1, perPage: 20) {
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title { romaji english }
        coverImage { large }
        duration
        description
        genres
      }
    }
  }
  `;
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: queryGQL, variables: { search: query } }),
        });
        const json = await res.json();
        const media = json.data?.Page?.media || [];

        return media.map((data: any) => ({
            id: data.id,
            source: 'anilist',
            title: data.title.english || data.title.romaji,
            poster: data.coverImage.large,
            runtime: data.duration || 24,
            description: data.description,
            type: 'anime',
        }));
    } catch (e) {
        console.error('AniList Fetch Error:', e);
        return [];
    }
}

async function fetchTMDB(query: string, type: 'movie' | 'tv'): Promise<MediaItem[]> {
    const baseUrl = 'https://api.themoviedb.org/3';
    try {
        const searchRes = await fetch(
            `${baseUrl}/search/${type}?query=${encodeURIComponent(query)}&include_adult=false`,
            { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } }
        );
        const searchData = await searchRes.json();
        const results = searchData.results?.slice(0, 20) || []; // Limit to top 20 per type

        const enriched = await Promise.all(results.map(async (item: any) => {
            // Fetch Details for Runtime (Parallelize if needed, but keeping simple for now)
            try {
                const detailRes = await fetch(
                    `${baseUrl}/${type}/${item.id}`,
                    { headers: { Authorization: `Bearer ${TMDB_TOKEN}` } }
                );
                const details = await detailRes.json();
                const runtime = type === 'movie' ? details.runtime : (details.episode_run_time?.[0] || 0);

                return {
                    id: item.id,
                    source: 'tmdb',
                    title: item.title || item.name,
                    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                    runtime: runtime || 0,
                    description: item.overview,
                    type: type,
                };
            } catch {
                return null;
            }
        }));

        return enriched.filter((i): i is MediaItem => i !== null);
    } catch (e) {
        console.error('TMDB Fetch Error:', e);
        return [];
    }
}

// Helper to calculate relevance score
function calculateRelevance(title: string, query: string): number {
    const t = title.toLowerCase();
    const q = query.toLowerCase();

    if (t === q) return 100; // Exact match
    if (t.startsWith(q)) return 80; // Starts with
    if (t.includes(` ${q}`)) return 70; // Word boundary match
    return 60; // Contains (base expectation since we filter for this)
}

export async function searchMedia(query: string): Promise<MediaItem[]> {
    if (!query || query.length < 2) return [];

    // Fetch all sources in parallel
    const [movies, tvs, animes] = await Promise.all([
        fetchTMDB(query, 'movie'),
        fetchTMDB(query, 'tv'),
        fetchAniList(query)
    ]);

    // Dedup: If an item exists in both AniList (Anime) and TMDB (TV) with similar titles, prefer AniList.
    const animeTitles = new Set(animes.map(a => a.title.toLowerCase()));

    const uniqueTvs = tvs.filter(tv => {
        // Simple fuzzy check: if exact title match, skip the TV version
        return !animeTitles.has(tv.title.toLowerCase());
    });

    const allResults = [...animes, ...movies, ...uniqueTvs];

    // Strict Filter & Sort
    return allResults
        .filter(item => {
            // Strictness: Title must contain the query string (case-insensitive)
            return item.title.toLowerCase().includes(query.toLowerCase());
        })
        .map(item => ({
            ...item,
            score: calculateRelevance(item.title, query)
        }))
        .sort((a, b) => b.score - a.score); // Sort by relevance desc
}
