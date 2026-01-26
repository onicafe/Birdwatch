'use client';

import { useState, useEffect } from 'react';
import { Input, Spin, Modal, Tag, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchMedia } from '@/app/actions/searchMedia';

const MOCK_EXPLORE_IMAGES = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', // Cinema
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80', // Theater
    'https://images.unsplash.com/photo-1517604931442-71053e6837db?w=500&q=80', // Popcorn
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', // Projector
    'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=500&q=80', // Reel
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&q=80', // Camera
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80', // Friends
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&q=80', // Blade Runner vibes
    'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80', // Matrix vibes
];

export default function ExplorePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'movie' | 'tv' | 'anime'>('all');

    const [previewItem, setPreviewItem] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openPreview = (item: any) => {
        setPreviewItem(isMock ? {
            title: 'Mock Movie',
            poster: item,
            runtime: 120,
            source: 'tmdb',
            type: 'movie',
            description: 'This is a mock description because you clicked a placeholder image. Search for real movies to see real details!'
        } : item);
        setIsModalOpen(true);
    };

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const data = await searchMedia(query);
                setResults(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Filtering Logic
    const displayItems = (results.length > 0 ? results : MOCK_EXPLORE_IMAGES).filter(item => {
        if (results.length === 0) return true; // Don't filter mock data
        if (activeFilter === 'all') return true;
        return item.type === activeFilter;
    });

    const isMock = results.length === 0;

    return (
        <div className="pb-20">
            {/* Search Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md p-4">
                <Input
                    size="large"
                    placeholder="Search movies, TV, anime..."
                    prefix={<SearchOutlined className="text-gray-500" />}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    allowClear
                    className="rounded-xl bg-neutral-900 border-none text-white placeholder-gray-500 hover:bg-neutral-800 focus:bg-neutral-800"
                    style={{ color: 'white', caretColor: '#8b5cf6' }}
                />

                {/* Filters */}
                {results.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
                        {['all', 'movie', 'tv', 'anime'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type as any)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${activeFilter === type
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-white border-white/30 hover:border-white'
                                    }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-8">
                    <Spin size="large" />
                </div>
            )}

            {/* Masonry Grid */}
            <div className={`columns-2 md:columns-3 lg:columns-4 gap-1 px-1 ${loading ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
                {displayItems.map((item: any, i: number) => {
                    const src = isMock ? item : (item.poster || 'https://placehold.co/500x750/000000/FFFFFF?text=No+Image');
                    const key = isMock ? `mock-${i}` : item.id;

                    return (
                        <div
                            key={key}
                            onClick={() => openPreview(item)}
                            className="mb-1 break-inside-avoid relative group cursor-pointer overflow-hidden"
                        >
                            <img
                                src={src}
                                alt={isMock ? 'Explore' : item.title}
                                className="w-full h-auto object-cover min-h-[150px] bg-neutral-900"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                {!isMock && (
                                    <>
                                        <h3 className="text-white font-bold text-sm leading-tight">{item.title}</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-gray-300">{item.type.toUpperCase()}</span>
                                            <span className="text-xs text-yellow-500 font-mono">{item.runtime}m</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State Hint */}
            {!loading && displayItems.length === 0 && results.length > 0 && (
                <div className="text-center py-10 text-gray-500">
                    No {activeFilter} results found.
                </div>
            )}
            {!loading && results.length === 0 && query.length >= 2 && (
                <div className="text-center py-10 text-gray-500">
                    No results found for "{query}"
                </div>
            )}

            {/* Media Detail Modal */}
            <Modal
                title={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                styles={{ content: { padding: 0, overflow: 'hidden', backgroundColor: '#1a1a1a', border: '1px solid #333' } }}
                closeIcon={<span className="text-white text-xl">×</span>}
            >
                {previewItem && (
                    <div>
                        <div className="relative h-64 sm:h-80 w-full">
                            <img
                                src={previewItem.poster || 'https://placehold.co/500x750/000000/FFFFFF?text=No+Image'}
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1a1a1a] to-transparent h-32" />

                            <div className="absolute bottom-4 left-4 right-4">
                                <Tag color={previewItem.source === 'anilist' ? 'blue' : 'purple'} className="mb-2 border-none">
                                    {(previewItem.type || 'MOVIE').toUpperCase()}
                                </Tag>
                                <h2 className="text-2xl font-bold text-white leading-tight mb-1">{previewItem.title}</h2>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <span>⏱️ {previewItem.runtime || 0} min</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <p className="text-gray-300 leading-relaxed text-sm mb-6 max-h-40 overflow-y-auto">
                                {previewItem.description || 'No description available.'}
                            </p>

                            <div className="flex gap-3">
                                <Button type="primary" size="large" block className="bg-violet-600 hover:bg-violet-500 border-none font-semibold h-12">
                                    Recommend ({previewItem.runtime || 0} 🪙)
                                </Button>
                                <Button size="large" className="bg-white/10 border-none text-white hover:bg-white/20 h-12 w-12 flex items-center justify-center">
                                    🔖
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
