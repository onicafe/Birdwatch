import React, { ReactNode } from 'react';

interface FeedLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
}

export default function FeedLayout({ children, sidebar }: FeedLayoutProps) {
    return (
        <div className="max-w-[1140px] mx-auto min-h-screen pt-4 pb-20 md:pb-0 px-0 md:px-4 flex gap-8 justify-center">
            {/* Main Feed Column */}
            <div className="w-full max-w-[640px] flex flex-col gap-4">
                {children}
            </div>

            {/* Right Sidebar Column (Hidden on Mobile) */}
            <div className="hidden lg:block w-[360px] sticky top-8 h-max">
                {sidebar}
            </div>
        </div>
    );
}
