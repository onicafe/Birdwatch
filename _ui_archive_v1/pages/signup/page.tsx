'use client';

import { useState } from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const onFinish = async (values: any) => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    username: values.username,
                    full_name: values.fullName,
                }
            }
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Account created! Please check your email.');
            router.push('/login');
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="w-full max-w-[380px] space-y-4 z-10">
                {/* Main Card */}
                <div className="glass-card rounded-xl p-8 flex flex-col items-center text-center shadow-2xl border border-white/10 relative">
                    <div className="absolute -top-10 animate-pulse-slow">
                        <img src="/logo.png" alt="Birdwatch" className="h-16 w-auto drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]" />
                    </div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-2 tracking-tighter mt-6">Birdwatch</h1>
                    <p className="text-white/80 font-medium mb-6 text-sm">Join the flock. See what your friends are watching.</p>

                    <div className="flex gap-3 w-full mb-4">
                        <Button block icon={<GoogleOutlined />} onClick={() => handleSocialLogin('google')} className="bg-white/10 text-white border border-white/10 font-semibold h-10 hover:!bg-white/20 !border-white/10">Google</Button>
                        <Button block icon={<GithubOutlined />} onClick={() => handleSocialLogin('github')} className="bg-white/10 text-white border border-white/10 font-semibold h-10 hover:!bg-white/20 !border-white/10">GitHub</Button>
                    </div>

                    <Divider className="border-gray-500/30 text-gray-400 text-xs font-semibold my-4">OR REGISTER WITH EMAIL</Divider>

                    <Form
                        name="signup"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        className="w-full"
                    >
                        <Form.Item
                            name="email"
                            className="mb-3"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input
                                placeholder="Mobile Number or Email"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            name="fullName"
                            className="mb-3"
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input
                                placeholder="Full Name"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            className="mb-3"
                            rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input
                                placeholder="Username"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            className="mb-6"
                            rules={[{ required: true, message: 'Password is required' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'white', height: '45px' }}
                                className="hover:!border-white/30 focus:!border-white placeholder:text-white/30 rounded-lg text-sm transition-all"
                            />
                        </Form.Item>

                        <p className="text-[10px] text-gray-400 my-4 text-center px-2 leading-tight">
                            By signing up, you agree to our <a href="#" className="text-white hover:underline">Terms</a>. Learn how we collect, use and share your data in our <a href="#" className="text-white hover:underline">Data Policy</a>.
                        </p>

                        <Form.Item className="mb-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                className="shadow-lg font-bold h-11 rounded-lg border-none"
                                style={{ background: 'linear-gradient(to right, #8a2387, #e94057, #f27121)' }}
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Login Link */}
                <div className="glass-card rounded-xl p-4 text-center text-white/80 text-sm shadow-xl">
                    Have an account? <Link href="/login" className="text-pink-500 font-bold hover:text-pink-400 ml-1">Log in</Link>
                </div>
            </div>
        </div>
    );
}
