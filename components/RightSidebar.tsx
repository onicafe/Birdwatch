'use client';
import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function RightSidebar() {
    const suggestions = [
        { name: 'Jane Cooper', handle: '@jane' },
        { name: 'Arlene McCoy', handle: '@arlene' },
        { name: 'Cody Fisher', handle: '@cody' },
        { name: 'Cameron Williamson', handle: '@cam' },
    ];

    return (
        <div className="flex flex-col gap-6">

            {/* Suggested Users Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 font-medium text-sm">Suggested for you</span>
                    <span className="text-gray-900 text-xs font-semibold cursor-pointer">View All</span>
                </div>

                <div className="flex flex-col gap-5">
                    {suggestions.map((user, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar size={40} icon={<UserOutlined />} className="bg-gray-100 text-gray-400" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm text-gray-900 leading-none">{user.name}</span>
                                    <span className="text-gray-400 text-xs">{user.handle}</span>
                                </div>
                            </div>
                            <Button size="small" className="rounded-full px-5 font-semibold border-gray-300">Follow</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Today on Threads / News Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-900 font-bold text-base">Today on Birdwatch</span>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">Trending</span>
                        <p className="font-medium text-sm text-gray-900">How AR and VR can transform education: Students can walk among dinos...</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400 block mb-1">Design</span>
                        <p className="font-medium text-sm text-gray-900">The new typography trends of 2026 that you need to know.</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2 text-xs text-gray-300">
                    <span>© 2026 Birdwatch</span>
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Cookie Policy</span>
                </div>
            </div>

        </div>
    );
}
