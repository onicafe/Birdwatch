'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HomeFilled, CompassFilled, HeartFilled, UserOutlined } from '@ant-design/icons';

export default function MobileBottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    // Hide mobile nav on auth pages
    if (pathname?.startsWith('/login') || pathname?.startsWith('/signup')) {
        return null;
    }

    const navItems = [
        { key: '/', icon: <HomeFilled style={{ fontSize: '24px' }} />, label: 'Home' },
        { key: '/explore', icon: <CompassFilled style={{ fontSize: '24px' }} />, label: 'Explore' },
        { key: '/activity', icon: <HeartFilled style={{ fontSize: '24px' }} />, label: 'Activity' },
        { key: '/profile', icon: <UserOutlined style={{ fontSize: '24px' }} />, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom">
            {navItems.map((item) => {
                const isActive = pathname === item.key;
                return (
                    <div
                        key={item.key}
                        onClick={() => router.push(item.key)}
                        className={`cursor-pointer transition-transform active:scale-90 ${isActive ? 'text-white' : 'text-gray-500'}`}
                    >
                        {item.icon}
                    </div>
                );
            })}
        </div>
    );
}
