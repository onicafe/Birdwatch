import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ConfigProvider, theme } from 'antd';
import MobileBottomNav from '@/components/MobileBottomNav';
import DesktopSidebar from '@/components/DesktopSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MovieEcon',
    description: 'Social Media for Movie Lovers',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <ConfigProvider
                        theme={{
                            algorithm: theme.darkAlgorithm,
                            token: {
                                colorPrimary: '#8b5cf6',
                                colorBgBase: '#000000',
                                colorBgContainer: '#121212',
                            },
                        }}
                    >
                        <div className="flex min-h-screen bg-black text-white">
                            {/* Desktop Sidebar (Left) */}
                            <DesktopSidebar />

                            {/* Main Content */}
                            <main className="flex-1 md:ml-[245px] pb-20 md:pb-0 min-w-0">
                                {children}
                            </main>

                            {/* Mobile Bottom Nav (Bottom) */}
                            <div className="md:hidden">
                                <MobileBottomNav />
                            </div>
                        </div>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
