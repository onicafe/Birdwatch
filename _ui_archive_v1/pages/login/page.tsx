'use client';

import { useState } from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const onFinish = async (values: any) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Welcome back!');
            router.push('/');
        }
        setLoading(false);
    };

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
        if (error) message.error(error.message);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-gradient relative overflow-hidden">
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="w-full max-w-[380px] space-y-4 z-10">
                {/* Main Card */}
                <div className="glass-card rounded-xl p-8 flex flex-col items-center shadow-2xl relative border border-white/10">
                    <div className="absolute -top-12 animate-bounce-slow">
                        <img src="/logo.png" alt="Birdwatch" className="h-20 w-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]" />
                    </div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-2 tracking-tighter mt-6">Birdwatch</h1>
                    <p className="text-white/80 font-medium mb-8 text-center text-sm">Welcome back to the nest.</p>

                    <Form
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        className="w-full"
                    >
                        <Form.Item
                            name="email"
                            className="mb-4"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="text-white/50" />}
                                placeholder="Email"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className="mb-6"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-white/50" />}
                                placeholder="Password"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                className="shadow-lg font-bold h-11 rounded-lg border-none"
                                style={{ background: 'linear-gradient(to right, #8a2387, #e94057, #f27121)' }}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider className="border-gray-500/30 text-gray-400 text-xs font-semibold my-4">OR CONTINUE WITH</Divider>

                    <div className="flex gap-3 w-full">
                        <Button block icon={<GoogleOutlined />} onClick={() => handleSocialLogin('google')} className="bg-white/10 text-white border border-white/10 font-semibold h-10 hover:!bg-white/20 !border-white/10">Google</Button>
                        <Button block icon={<GithubOutlined />} onClick={() => handleSocialLogin('github')} className="bg-white/10 text-white border border-white/10 font-semibold h-10 hover:!bg-white/20 !border-white/10">GitHub</Button>
                    </div>

                    <a className="text-xs text-white/50 mt-6 hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white/50 pb-0.5">Forgot password?</a>
                </div>

                {/* Signup Link */}
                <div className="glass-card rounded-xl p-4 text-center text-white/80 text-sm shadow-xl">
                    Don't have an account? <Link href="/signup" className="text-pink-500 font-bold hover:text-pink-400 ml-1">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
