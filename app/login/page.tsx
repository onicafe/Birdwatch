'use client';

import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { GoogleOutlined, AppleFilled, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { checkUserExists } from '@/app/actions/checkUser';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState<'EMAIL' | 'LOGIN_PASSWORD' | 'SIGNUP_DETAILS'>('EMAIL');
    const [email, setEmail] = useState('');
    const supabase = createClient();
    const router = useRouter();
    const [form] = Form.useForm();

    const handleEmailSubmit = async (values: any) => {
        setLoading(true);
        const inputEmail = values.email;
        setEmail(inputEmail);

        try {
            const exists = await checkUserExists(inputEmail);
            if (exists) {
                setStage('LOGIN_PASSWORD');
            } else {
                setStage('SIGNUP_DETAILS');
            }
        } catch (error) {
            console.error("Check failed", error);
            message.error("Verification failed. Please try again.");
        }
        setLoading(false);
    };

    const handleLogin = async (values: any) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: values.password,
        });
        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                message.error('Incorrect password or user not found.');
            } else {
                message.error(error.message);
            }
        } else {
            router.push('/');
        }
        setLoading(false);
    };

    const handleSignup = async (values: any) => {
        setLoading(true);
        if (values.password !== values.confirm) {
            message.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email: email,
            password: values.password,
            options: {
                data: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                }
            }
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Account created! Please check your email.');
        }
        setLoading(false);
    };

    // Sub-components for stages
    const EmailStage = () => (
        <Form onFinish={handleEmailSubmit} layout="vertical" size="large" initialValues={{ email }}>
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                <Input
                    prefix={<MailOutlined className="text-gray-400 mr-2" />}
                    placeholder="Enter your email"
                    className="bg-white/70 border-gray-200 hover:bg-white focus:bg-white !rounded-xl !px-4 !py-3 !text-gray-800 text-base"
                    autoFocus
                />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 hover:!bg-blue-700 h-12 !rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 border-none">
                Next
            </Button>
        </Form>
    );

    const PasswordStage = () => (
        <Form onFinish={handleLogin} layout="vertical" size="large">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600 font-medium bg-gray-100/50 px-2 py-1 rounded">{email}</span>
                <a onClick={() => setStage('EMAIL')} className="text-blue-600 text-sm cursor-pointer hover:underline">Edit</a>
            </div>
            <Form.Item name="password" rules={[{ required: true, message: 'Password required' }]}>
                <Input.Password
                    placeholder="Enter your password"
                    className="bg-white/70 border-gray-200 hover:bg-white focus:bg-white !rounded-xl !px-4 !py-3 !text-gray-800 text-base"
                    autoFocus
                />
            </Form.Item>
            <div className="flex items-center justify-between mb-6">
                <a className="text-gray-500 text-sm hover:text-black cursor-pointer bg-white/50 px-2 py-1 rounded" onClick={() => setStage('SIGNUP_DETAILS')}>Not you? Create account.</a>
                <a className="text-blue-600 font-medium hover:text-blue-800 text-sm" href="#">Forgot?</a>
            </div>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 hover:!bg-blue-700 h-12 !rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 border-none">
                Log In
            </Button>
        </Form>
    );

    const SignupStage = () => (
        <Form onFinish={handleSignup} layout="vertical" size="large">
            <div className="mb-4 flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setStage('EMAIL')}>
                <ArrowLeftOutlined /> <span className="text-sm">Back</span>
            </div>
            <div className="flex gap-2">
                <Form.Item name="firstName" rules={[{ required: true, message: 'Required' }]} className="w-1/2 mb-4">
                    <Input placeholder="First Name" className="bg-white/70 border-gray-200 !rounded-xl !px-4 !py-3 !text-gray-800" />
                </Form.Item>
                <Form.Item name="lastName" rules={[{ required: true, message: 'Required' }]} className="w-1/2 mb-4">
                    <Input placeholder="Last Name" className="bg-white/70 border-gray-200 !rounded-xl !px-4 !py-3 !text-gray-800" />
                </Form.Item>
            </div>
            <Form.Item name="password" rules={[{ required: true, message: 'Required' }]} className="mb-4">
                <Input.Password placeholder="Create Password" className="bg-white/70 border-gray-200 !rounded-xl !px-4 !py-3 !text-gray-800" />
            </Form.Item>
            <Form.Item name="confirm" rules={[{ required: true, message: 'Required' }]} className="mb-4">
                <Input.Password placeholder="Confirm Password" className="bg-white/70 border-gray-200 !rounded-xl !px-4 !py-3 !text-gray-800" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-blue-600 hover:!bg-blue-700 h-12 !rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 border-none">
                Complete Signup
            </Button>
        </Form>
    );

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 font-sans bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/login-bg-mountains.png')" }}
        >
            {/* Main Card Container - Contained 5:4ish Ratio look */}
            <div className="w-full max-w-[1100px] h-[85vh] max-h-[750px] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl overflow-hidden flex flex-row border border-white/20">

                {/* LEFT SIDE - FORM */}
                <div className="w-full md:w-[45%] lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center relative bg-white/50 z-10 backdrop-blur-sm">

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">✨</div>
                            <h1 className="text-lg font-bold text-black tracking-tight">Birdwatch</h1>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {stage === 'EMAIL' ? 'Hi there!' : stage === 'SIGNUP_DETAILS' ? 'Join the Flock' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-500 text-base">
                            {stage === 'EMAIL' ? 'Enter your email to continue.' : stage === 'SIGNUP_DETAILS' ? 'Tell us a bit about yourself.' : 'Enter your password to access your account.'}
                        </p>
                    </div>

                    {/* Progressively Rendered Form */}
                    <div className="mb-6">
                        {stage === 'EMAIL' && <EmailStage />}
                        {stage === 'LOGIN_PASSWORD' && <PasswordStage />}
                        {stage === 'SIGNUP_DETAILS' && <SignupStage />}
                    </div>

                    {stage === 'EMAIL' && (
                        <>
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-white/80 backdrop-blur rounded text-gray-400">OR CONTINUE WITH</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button className="h-12 !rounded-xl border border-gray-300 flex items-center justify-center gap-3 hover:bg-white bg-white/50 text-gray-700 font-medium text-base">
                                    <AppleFilled style={{ fontSize: '20px' }} /> Log in with Apple
                                </Button>
                                <Button className="h-12 !rounded-xl border border-gray-300 flex items-center justify-center gap-3 hover:bg-white bg-white/50 text-gray-700 font-medium text-base">
                                    <GoogleOutlined style={{ fontSize: '20px', color: '#EA4335' }} /> Log in with Google
                                </Button>
                            </div>
                        </>
                    )}

                    {/* Footer Text */}
                    <p className="mt-auto pt-4 text-center text-xs text-gray-400">
                        © 2026 Birdwatch. All rights reserved. <br />
                        <a href="#" className="hover:text-gray-600 underline">Terms</a> &bull; <a href="#" className="hover:text-gray-600 underline">Privacy</a>
                    </p>

                </div>

                {/* RIGHT SIDE - IMAGE */}
                <div className="hidden md:block w-[55%] lg:w-[60%] bg-blue-900 relative overflow-hidden">
                    <img
                        src="/login-bg.png"
                        alt="Liquid Blue Art"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-12 left-12 max-w-md text-white">
                        <h2 className="text-4xl font-bold mb-3 drop-shadow-md">Find your flow.</h2>
                        <p className="text-lg opacity-90 drop-shadow-md leading-relaxed">Immerse yourself in a community that values creativity and fluidity.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
