'use client';

import { Avatar, Button, Tabs } from 'antd';
import { SettingOutlined, TableOutlined, SaveOutlined, TagOutlined } from '@ant-design/icons';

const MOCK_PROFILE_IMAGES = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80', // Cinema
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80', // Theater
    'https://images.unsplash.com/photo-1517604931442-71053e6837db?w=500&q=80', // Popcorn
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80', // Projector
    'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=500&q=80', // Reel
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&q=80', // Camera
];

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto md:pt-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-6 md:gap-24 items-center md:items-start mb-8 md:ml-12">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Avatar
                        size={{ xs: 80, sm: 80, md: 150 }}
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=Binky"
                        className="border-2 border-neutral-800 cursor-pointer hover:opacity-90 transition-opacity"
                    />
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full md:mt-4">
                    {/* Row 1: Username + Buttons */}
                    <div className="flex flex-col md:flex-row items-center md:justify-start gap-4 mb-5">
                        <span className="text-xl md:text-xl text-white font-normal">binky_watch</span>
                        <div className="flex gap-2">
                            <Button className="bg-white text-black font-semibold border-none hover:bg-gray-200 h-8 px-4 rounded-lg">Edit profile</Button>
                            <Button className="bg-neutral-800 text-white font-semibold border-none hover:bg-neutral-700 h-8 px-4 rounded-lg">View archive</Button>
                        </div>
                        <Button type="text" icon={<SettingOutlined className="text-white text-xl" />} />
                    </div>

                    {/* Row 2: Stats (Desktop) */}
                    <div className="hidden md:flex gap-10 mb-5 text-white text-base">
                        <span><strong className="font-semibold">42</strong> posts</span>
                        <span><strong className="font-semibold">1.2k</strong> followers</span>
                        <span><strong className="font-semibold">340</strong> following</span>
                    </div>

                    {/* Bio */}
                    <div className="text-white text-sm md:text-base text-center md:text-left">
                        <div className="font-semibold">Binky The Pilot</div>
                        <div className="whitespace-pre-wrap">Building the future of social cinema. 🎥 ✨</div>
                        <div className="font-medium text-white/60 mt-1 cursor-pointer hover:underline">
                            <span className="mr-1">🔗</span>
                            movie-econ.vercel.app
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Stats Row (Hidden on Desktop) */}
            <div className="flex md:hidden justify-around border-t border-neutral-800 py-3 mb-2 text-white text-center">
                <div>
                    <div className="font-semibold">42</div>
                    <div className="text-gray-400 text-xs">posts</div>
                </div>
                <div>
                    <div className="font-semibold">1.2k</div>
                    <div className="text-gray-400 text-xs">followers</div>
                </div>
                <div>
                    <div className="font-semibold">340</div>
                    <div className="text-gray-400 text-xs">following</div>
                </div>
            </div>

            {/* Highlights Placeholder */}
            <div className="flex gap-4 md:gap-10 px-4 md:px-12 mb-8 md:mb-12 overflow-x-auto no-scrollbar">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <span className="text-xs text-white">Highlight {i + 1}</span>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-neutral-800">
                <div className="flex justify-center gap-12 text-xs md:text-sm tracking-widest font-semibold text-white uppercase">
                    <div className="border-t border-white -mt-[1px] py-4 flex items-center gap-2 cursor-pointer">
                        <TableOutlined className="text-base" /> Posts
                    </div>
                    <div className="py-4 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300">
                        <SaveOutlined className="text-base" /> Saved
                    </div>
                    <div className="py-4 flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-300">
                        <TagOutlined className="text-base" /> Tagged
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-1">
                {MOCK_PROFILE_IMAGES.map((src, i) => (
                    <div key={i} className="aspect-square bg-neutral-900 group relative cursor-pointer">
                        <img src={src} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                            <span className="flex items-center gap-1"><span className="text-lg">❤️</span> 1.2k</span>
                            <span className="flex items-center gap-1"><span className="text-lg">💬</span> 45</span>
                        </div>
                    </div>
                ))}
                {MOCK_PROFILE_IMAGES.map((src, i) => (
                    <div key={`dup-${i}`} className="aspect-square bg-neutral-900 group relative cursor-pointer">
                        <img src={src} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                            <span className="flex items-center gap-1"><span className="text-lg">❤️</span> 892</span>
                            <span className="flex items-center gap-1"><span className="text-lg">💬</span> 21</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Spacer for Mobile Nav */}
            <div className="h-10 md:hidden" />
        </div>
    );
}
