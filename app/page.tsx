'use client';

import FeedItem from '@/components/FeedItem';

// Mock Data
const FEED_DATA = [
    {
        id: 1,
        user: { name: 'alice_movies', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Alice' },
        media: { title: 'Inception', poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', year: '2010', rating: 9.0 },
        caption: 'Mind blowing re-watch! The spinning top usually gets me, but the hallway fight scene is peak cinema. 🤯 ✨',
        likes: 124,
        comments: 18
    },
    {
        id: 2,
        user: { name: 'bob_the_builder', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Bob' },
        media: { title: 'Spirited Away', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', year: '2001', rating: 9.5 },
        caption: 'Sunday comfort watch. Ghibli food always looks so good. 🍙',
        likes: 89,
        comments: 42
    },
    {
        id: 3,
        user: { name: 'charlie_reviews', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Charlie' },
        media: { title: 'The Dark Knight', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80', year: '2008', rating: 9.8 },
        caption: 'Best superhero movie ever made? I think yes.',
        likes: 342,
        comments: 156
    }
];

export default function FeedPage() {
    return (
        <div className="max-w-md mx-auto pt-2">
            {/* Stories Placeholder (Optional Future) */}
            <div className="flex gap-4 px-4 overflow-x-auto pb-4 no-scrollbar">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[64px]">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`} className="w-full h-full" />
                            </div>
                        </div>
                        <span className="text-xs text-center truncate w-full">User {i}</span>
                    </div>
                ))}
            </div>

            {/* Feed */}
            <div>
                {FEED_DATA.map(item => (
                    <FeedItem key={item.id} {...item} />
                ))}
            </div>

            {/* Footer Spacer */}
            <div className="h-40 text-center text-gray-700 p-8 flex flex-col items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 grayscale opacity-50">✓</div>
                <span className="text-sm">You're all caught up!</span>
            </div>
        </div>
    );
}
