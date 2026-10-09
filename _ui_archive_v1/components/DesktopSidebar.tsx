'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HomeFilled, CompassFilled, HeartFilled, UserOutlined, SearchOutlined, MessageOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

export default function DesktopSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    // Hide sidebar on auth pages
    if (pathname?.startsWith('/login') || pathname?.startsWith('/signup')) {
        return null;
    }

    const navItems = [
        { key: '/', icon: <HomeFilled style={{ fontSize: '24px' }} />, label: 'Home' },
        { key: '/explore', icon: <SearchOutlined style={{ fontSize: '24px' }} />, label: 'Search' },
        { key: '/explore?mode=feed', icon: <CompassFilled style={{ fontSize: '24px' }} />, label: 'Explore' },
        { key: '/messages', icon: <MessageOutlined style={{ fontSize: '24px' }} />, label: 'Messages' },
        { key: '/activity', icon: <HeartFilled style={{ fontSize: '24px' }} />, label: 'Notifications' },
        { key: '/create', icon: <PlusSquareOutlined style={{ fontSize: '24px' }} />, label: 'Create' },
        { key: '/profile', icon: <UserOutlined style={{ fontSize: '24px' }} />, label: 'Profile' },
    ];

    return (
        <div className="hidden md:flex flex-col w-[245px] fixed h-full border-r border-white/10 px-3 pt-8 pb-5 bg-black z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 px-3 mb-8 cursor-pointer group" onClick={() => router.push('/')}>
                <img src="/logo.png" alt="Birdwatch" className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-transform group-hover:scale-110" />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter" style={{ fontFamily: 'sans-serif' }}>Birdwatch</h1>
            </div>

            {/* Nav Items */}
            <div className="flex-1 flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.key;
                    return (
                        <div
                            key={item.key}
                            onClick={() => router.push(item.key)}
                            className={`flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group`}
                        >
                            <span className={`transition-transform group-active:scale-90 ${isActive ? 'text-white' : 'text-white'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-base ${isActive ? 'font-bold text-white' : 'text-white font-normal'}`}>
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Menu */}
            <div className="mt-auto px-3">
                <div
                    onClick={async () => {
                        const { createClient } = await import('../lib/supabaseClient');
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        router.refresh(); // Force refresh to clear server session state
                        router.push('/login');
                    }}
                    className="flex items-center gap-4 py-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                    <span className="text-2xl text-white">⏻</span>
                    <span className="text-base text-white">Logout</span>
                </div>
            </div>
        </div>
    );
}
