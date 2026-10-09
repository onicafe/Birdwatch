'use client';

import React from 'react';
import FeedLayout from "@/components/FeedLayout";
import PostComposer from "@/components/PostComposer";
import FeedCard from "@/components/FeedCard";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
    const posts = [
        {
            author: "Devon Lane",
            time: "8m",
            content: "Just landed in Kyoto! The colors here are absolutely unreal this time of year. 🍁 Can't wait to explore the old temples.",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
            likes: 124,
            replies: 12,
            hasThread: true
        },
        {
            author: "Jerome Bell",
            time: "2h",
            content: "Anyone tested the new React 19 server components feature yet? It feels like we're finally merging the best of PHP with the interactivity of JS. Thoughts? 👇",
            likes: 856,
            replies: 45,
            hasThread: false
        },
        {
            author: "Darlene Robertson",
            time: "5h",
            content: "Working on a new pottery collection. The glaze turned out perfectly! 🏺✨",
            likes: 230,
            replies: 8,
            hasThread: true
        }
    ];

    return (
        <FeedLayout sidebar={<RightSidebar />}>
            <PostComposer />

            <div className="flex flex-col">
                {posts.map((post, i) => (
                    <FeedCard
                        key={i}
                        {...post}
                        hasThreadBelow={post.hasThread}
                    />
                ))}
            </div>
        </FeedLayout>
    );
}
