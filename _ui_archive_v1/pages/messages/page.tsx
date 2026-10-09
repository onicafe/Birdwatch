'use client';

import { Avatar, Input } from 'antd';
import { SearchOutlined, EditOutlined, InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined, SmileOutlined, PictureOutlined, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const MOCK_CHATS = [
    { id: 1, user: 'alice_movies', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Alice', lastMessage: 'Did you see the new trailer? 😱', time: '2m', active: true },
    { id: 2, user: 'bob_the_builder', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Bob', lastMessage: 'Sent you a recommendation.', time: '1h', active: false },
    { id: 3, user: 'charlie_reviews', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Charlie', lastMessage: 'The ending was confusing tbh.', time: '5h', active: false },
    { id: 4, user: 'david_fincher_fan', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=David', lastMessage: 'Liked a message', time: '1d', active: false },
    { id: 5, user: 'eve_wall_e', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Eve', lastMessage: 'Bot verification complete.', time: '2d', active: false },
];

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);

    return (
        <div className="flex h-screen bg-black text-white pt-0 md:pt-0 overflow-hidden">
            {/* Chat List (Sidebar) */}
            <div className={`w-full md:w-[350px] md:border-r border-neutral-800 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-5 flex justify-between items-center bg-black/95 backdrop-blur z-10">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="font-bold text-xl">binky_watch</span>
                        <span className="text-xs">▼</span>
                    </div>
                    <EditOutlined className="text-2xl" />
                </div>

                {/* Search (Desktop only visual) */}
                <div className="px-4 pb-4 hidden md:block">
                    <Input
                        prefix={<SearchOutlined className="text-gray-500" />}
                        placeholder="Search"
                        className="bg-neutral-900 border-none rounded-lg text-white"
                    />
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex justify-between px-5 py-2">
                        <span className="font-bold text-base">Messages</span>
                        <span className="text-gray-500 font-semibold cursor-pointer">Requests</span>
                    </div>

                    {MOCK_CHATS.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-neutral-900 transition-colors ${selectedChat.id === chat.id ? 'bg-neutral-900' : ''}`}
                        >
                            <div className="relative">
                                <Avatar size={56} src={chat.avatar} />
                                {chat.active && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-normal truncate">{chat.user}</div>
                                <div className="text-sm text-gray-500 truncate">
                                    {chat.lastMessage} <span className="mx-1">·</span> {chat.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat View (Main) */}
            <div className={`flex-1 flex flex-col bg-black ${!selectedChat ? 'hidden md:flex' : 'flex absolute inset-0 md:static z-20'}`}>
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-black">
                            <div className="flex items-center gap-3">
                                {/* Back Button (Mobile) */}
                                <button onClick={() => setSelectedChat(null!)} className="md:hidden text-2xl mr-2">←</button>

                                <Avatar size={44} src={selectedChat.avatar} />
                                <div>
                                    <div className="font-semibold text-base">{selectedChat.user}</div>
                                    <div className="text-xs text-gray-500">Active {selectedChat.time} ago</div>
                                </div>
                            </div>
                            <div className="flex gap-6 text-2xl text-white">
                                <PhoneOutlined />
                                <VideoCameraOutlined />
                                <InfoCircleOutlined />
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                            {/* Timestamp */}
                            <div className="text-center text-xs text-gray-500 my-4">Today 4:20 PM</div>

                            {/* Bubbles */}
                            <div className="flex justify-end">
                                <div className="bg-[#3797f0] text-white px-4 py-2 rounded-2xl rounded-tr-md max-w-[70%]">
                                    Hey! Watch anything goood lately? 🎬
                                </div>
                            </div>

                            <div className="flex justify-start items-end gap-2">
                                <Avatar size={28} src={selectedChat.avatar} className="mb-1" />
                                <div className="bg-neutral-800 text-white px-4 py-2 rounded-2xl rounded-tl-md max-w-[70%]">
                                    {selectedChat.lastMessage}
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 m-4 mt-0 bg-neutral-900 rounded-full flex items-center gap-4 border border-neutral-800">
                            <div className="p-1 bg-[#3797f0] rounded-full flex items-center justify-center text-white">
                                <VideoCameraOutlined style={{ fontSize: '12px' }} />
                            </div>
                            <input
                                type="text"
                                placeholder="Message..."
                                className="bg-transparent border-none outline-none text-white flex-1 placeholder-gray-500"
                            />
                            <div className="flex gap-4 text-white text-xl">
                                <SmileOutlined />
                                <PictureOutlined />
                                <HeartOutlined />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-4">
                            <MessageOutlined style={{ fontSize: '48px' }} />
                        </div>
                        <h2 className="text-xl font-normal mb-2">Your Messages</h2>
                        <p className="text-gray-500 mb-6">Send private photos and messages to a friend.</p>
                        <button className="bg-[#3797f0] text-white px-4 py-1.5 rounded-lg font-semibold">Send Message</button>
                    </div>
                )}
            </div>
        </div>
    );
}
