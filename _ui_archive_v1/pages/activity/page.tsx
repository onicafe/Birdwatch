'use client';

import { List, Avatar, Button } from 'antd';

const ACTIVITIES = [
    { user: 'alice_movies', type: 'liked your review', time: '2h' },
    { user: 'bob_the_builder', type: 'started following you', time: '5h' },
    { user: 'charlie_reviews', type: 'commented: "Great list!"', time: '1d' },
];

export default function ActivityPage() {
    return (
        <div className="p-4 pb-20">
            <h1 className="text-xl font-bold text-white mb-4">Activity</h1>
            <List
                itemLayout="horizontal"
                dataSource={ACTIVITIES}
                renderItem={(item, index) => (
                    <List.Item className="border-b border-white/10">
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<span className="text-white font-semibold">{item.user}</span>}
                            description={<span className="text-gray-400">{item.type} <span className="text-gray-600 text-xs ml-2">{item.time}</span></span>}
                        />
                        {item.type.includes('following') && <Button type="primary" size="small" className="bg-violet-600 border-none">Follow Back</Button>}
                    </List.Item>
                )}
            />
        </div>
    );
}
