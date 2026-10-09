'use client';

import { usePathname } from 'next/navigation';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Normalize pathname to ensure we catch all sub-paths if necessary, 
    // but specific checks for /login and /signup are usually sufficient.
    const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup');

    if (isAuthPage) {
        return (
            <div className="flex min-h-screen bg-black text-white">
                {/* Full screen content for auth pages, no sidebars */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Desktop Sidebar (Left) */}
            <DesktopSidebar />

            {/* Main Content with left margin for sidebar */}
            <main className="flex-1 md:ml-[245px] pb-20 md:pb-0 min-w-0">
                {children}
            </main>

            {/* Mobile Bottom Nav (Bottom) */}
            <div className="md:hidden">
                <MobileBottomNav />
            </div>
        </div>
    );
}
