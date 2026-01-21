'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate network request
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                    soundDEX
                </Link>
                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                    Back to Home
                </Link>
            </nav>

            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left: Info */}
                <div className="w-full md:w-1/2 p-6 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Get in Touch</h1>
                        <p className="text-xl text-white/60 font-light leading-relaxed max-w-md mb-12">
                            Have questions about soundDEX? Our engineering team is ready to assist you.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Support</h3>
                                <p className="text-lg">support@sounddex.com</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Press</h3>
                                <p className="text-lg">press@sounddex.com</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Headquarters</h3>
                                <p className="text-lg text-white/60">
                                    100 Soundwave Blvd<br />
                                    San Francisco, CA 94107
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Form */}
                <div className="w-full md:w-1/2 p-6 md:p-24 flex flex-col justify-center bg-white/[0.02]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md w-full mx-auto"
                    >
                        {formState === 'success' ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                                <p className="text-white/60">We'll get back to you shortly.</p>
                                <button
                                    onClick={() => setFormState('idle')}
                                    className="mt-8 text-sm underline underline-offset-4 hover:text-white/60"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm uppercase tracking-widest text-white/40">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm uppercase tracking-widest text-white/40">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/20"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm uppercase tracking-widest text-white/40">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="w-full bg-white text-black font-bold py-4 rounded-full mt-8 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {formState === 'submitting' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Send Message</span>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
