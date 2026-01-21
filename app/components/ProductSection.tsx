'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const COLORS = [
    { name: 'Ceramic White', hex: '#f5f5f5', tailwind: 'bg-neutral-100', image: '/products/ceramic-white.png' },
    { name: 'Matte Black', hex: '#1a1a1a', tailwind: 'bg-neutral-900', image: '/products/matte-black.png' },
    { name: 'Midnight Blue', hex: '#191970', tailwind: 'bg-blue-900', image: '/products/midnight-blue.png' },
    { name: 'Rose Gold', hex: '#b76e79', tailwind: 'bg-rose-400', image: '/products/rose-gold.png' },
];

const VARIANTS = [
    { id: 'core', name: 'Core', price: 299, features: ['High-Fidelity Audio', 'Passive Isolation', '3.5mm Jack'] },
    { id: 'pro', name: 'Pro', price: 499, features: ['Active Noise Cancellation', 'Spatial Audio', 'Wireless + USB-C'] },
];

export default function ProductSection() {
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedVariant, setSelectedVariant] = useState(VARIANTS[1]);

    return (
        <section className="min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Product Visual */}
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/5 flex items-center justify-center group">
                    <motion.div
                        key={selectedColor.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={selectedColor.image}
                            alt={`Zenith X in ${selectedColor.name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={false}
                        />
                    </motion.div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-8 left-8">
                        <p className="text-white/40 text-sm tracking-widest uppercase mb-1">Colorway</p>
                        <p className="text-2xl font-semibold tracking-tight">{selectedColor.name}</p>
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">soundDEX</h2>
                        <p className="text-xl text-white/60 font-light leading-relaxed max-w-md">
                            The culmination of acoustic engineering and minimalist design.
                            Experience sound in its purest form.
                        </p>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Select Finish</p>
                        <div className="flex gap-4">
                            {COLORS.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${selectedColor.name === color.name
                                        ? 'border-white scale-110'
                                        : 'border-transparent hover:scale-105'
                                        }`}
                                    style={{ padding: '2px' }}
                                >
                                    <div className={`w-full h-full rounded-full ${color.tailwind}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Variant Selection */}
                    <div>
                        <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Select Model</p>
                        <div className="grid grid-cols-2 gap-4">
                            {VARIANTS.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`p-6 rounded-2xl border text-left transition-all duration-300 ${selectedVariant.id === variant.id
                                        ? 'bg-white text-black border-white'
                                        : 'bg-neutral-900/50 text-white border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-lg">{variant.name}</span>
                                        <span className="font-mono text-sm opacity-60">${variant.price}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {variant.features.map((feature) => (
                                            <li key={feature} className="text-xs opacity-80 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-current" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-6 items-center">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-white/40 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-4xl font-bold font-mono">${selectedVariant.price}</p>
                        </div>

                        <button className="flex-1 w-full bg-white text-black h-16 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 group">
                            <span>Add to Cart</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex gap-8 text-xs text-white/30 justify-center sm:justify-start">
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Free Shipping
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            2-Year Warranty
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            30-Day Return
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
