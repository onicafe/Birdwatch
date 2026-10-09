import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Birdwatch',
    description: 'Social Media for Movie Lovers',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased bg-black text-white">
                {children}
            </body>
        </html>
    );
}
