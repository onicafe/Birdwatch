'use client';
import React, { useState } from 'react';
import { Avatar, Button, Divider } from 'antd';
import { UserOutlined, PictureOutlined, LinkOutlined, PaperClipOutlined } from '@ant-design/icons';

export default function PostComposer() {
    const [content, setContent] = useState('');

    return (
        <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-5 shadow-sm border border-gray-100 mb-2">
            <div className="flex gap-4">
                <Avatar size={48} icon={<UserOutlined />} className="flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">Jacob Jones</span>
                    </div>
                    <textarea
                        className="w-full text-base bg-transparent border-none outline-none resize-none placeholder-gray-400 min-h-[40px]"
                        placeholder="Start a thread..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={content.length > 50 ? 3 : 1}
                    />

                    {/* Actions Row */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2 text-gray-400">
                            <Button type="text" shape="circle" icon={<PictureOutlined style={{ fontSize: '20px' }} />} />
                            <Button type="text" shape="circle" icon={<PaperClipOutlined style={{ fontSize: '20px' }} />} />
                        </div>

                        <Button
                            type="primary"
                            shape="round"
                            className="bg-black hover:!bg-gray-800 font-semibold px-6 border-none"
                            disabled={!content.trim()}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
