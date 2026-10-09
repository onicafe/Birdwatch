'use client';
import React from 'react';
import { Avatar } from 'antd';
import { HeartOutlined, MessageOutlined, RetweetOutlined, SendOutlined, MoreOutlined } from '@ant-design/icons';

interface FeedCardProps {
    author: string;
    avatar?: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    replies: number;
    hasThreadBelow?: boolean; // For the vertical line
}

export default function FeedCard({ author, avatar, time, content, image, likes, replies, hasThreadBelow }: FeedCardProps) {
    return (
        <div className="bg-white p-4 md:p-5 border-b border-gray-100 md:border md:rounded-3xl md:shadow-sm md:mb-4 relative">
            {/* Thread Line (Visual connector) */}
            {hasThreadBelow && (
                <div className="absolute left-[38px] md:left-[42px] top-[70px] bottom-0 w-[2px] bg-gray-100 z-0"></div>
            )}

            <div className="flex gap-4 relative z-10">
                <div className="flex flex-col items-center gap-2">
                    <Avatar size={48} className="flex-shrink-0 bg-blue-100 border border-gray-100" src={avatar}>{author[0]}</Avatar>
                    {/* Small interactive avatar stack could go here for replies */}
                </div>

                <div className="flex-1 flex flex-col gap-2">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <span className="font-semibold text-black text-[15px]">{author}</span>
                        <div className="flex items-center gap-3 text-gray-400">
                            <span className="text-sm">{time}</span>
                            <MoreOutlined className="cursor-pointer text-lg" />
                        </div>
                    </div>

                    {/* Content */}
                    <p className="text-[15px] text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {content}
                    </p>

                    {/* Optional Image */}
                    {image && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-gray-100">
                            <img src={image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-6 mt-3 text-gray-600">
                        <button className="hover:text-red-500 transition-colors"><HeartOutlined style={{ fontSize: '20px' }} /></button>
                        <button className="hover:text-blue-500 transition-colors"><MessageOutlined style={{ fontSize: '20px' }} /></button>
                        <button className="hover:text-green-500 transition-colors"><RetweetOutlined style={{ fontSize: '20px' }} /></button>
                        <button className="hover:text-blue-500 transition-colors"><SendOutlined style={{ fontSize: '20px' }} /></button>
                    </div>

                    {/* Stats Footer */}
                    {(likes > 0 || replies > 0) && (
                        <div className="mt-2 flex items-center gap-2 text-gray-400 text-sm">
                            {replies} replies &bull; {likes} likes
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
