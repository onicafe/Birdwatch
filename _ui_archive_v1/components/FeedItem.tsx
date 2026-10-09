'use client';

import { Avatar, Typography, Tag, Button } from 'antd';
import { HeartOutlined, MessageOutlined, SendOutlined, BookOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface FeedItemProps {
    user: {
        name: string;
        avatar: string;
    };
    media: {
        title: string;
        poster: string;
        year: string;
        rating: number;
    };
    caption: string;
    likes: number;
    comments: number;
}

export default function FeedItem({ user, media, caption, likes, comments }: FeedItemProps) {
    return (
        <article className="border-b border-white/10 pb-4 mb-4">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} size="small" className="border border-white/20" />
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                </div>
                <Button type="text" shape="circle" icon={<EllipsisOutlined className="text-white" />} />
            </div>

            {/* Media (Image) */}
            <div className="relative aspect-[4/5] bg-neutral-900 w-full overflow-hidden">
                <img src={media.poster} alt={media.title} className="w-full h-full object-cover" />
                {/* Overlay Tag */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-bold text-white">🎬 {media.title} ({media.year})</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex gap-4">
                    <HeartOutlined className="text-2xl text-white cursor-pointer hover:text-red-500 transition-colors" />
                    <MessageOutlined className="text-2xl text-white cursor-pointer hover:text-gray-300 transition-colors" />
                    <SendOutlined className="text-2xl text-white cursor-pointer hover:text-gray-300 transition-colors" />
                </div>
                <BookOutlined className="text-2xl text-white cursor-pointer hover:text-gray-300 transition-colors" />
            </div>

            {/* Footer / Caption */}
            <div className="px-4 text-sm">
                <div className="font-semibold mb-1 text-white">{likes.toLocaleString()} likes</div>
                <div>
                    <span className="font-semibold text-white mr-2">{user.name}</span>
                    <span className="text-gray-300">{caption}</span>
                </div>
                {comments > 0 && (
                    <div className="text-gray-500 mt-1 cursor-pointer">View all {comments} comments</div>
                )}
                <div className="text-gray-600 text-xs mt-1 uppercase tracking-wide">2 hours ago</div>
            </div>
        </article>
    );
}
