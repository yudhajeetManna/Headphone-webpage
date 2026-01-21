'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 40;

export default function HeadphoneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const render = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[Math.floor(index)];

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Cover

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    }
  };

  useEffect(() => {
    const loadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIndex = (i + 1).toString().padStart(3, '0');
        img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;

        img.onload = () => {
          imagesRef.current[i] = img;
          if (i === 0) {
            setIsLoaded(true);
            render(0);
          }
        };
      }
    };

    loadImages();
  }, []);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(currentIndex.get());
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 font-sans">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-sm tracking-widest uppercase">Loading Experience</p>
            </div>
          </div>
        )}

        <OverlayText scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}

function OverlayText({ scrollYProgress }: { scrollYProgress: any }) {
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

  const opacity4 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.8, 0.9], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 0% - Centered Title */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white/90 tracking-tighter mb-4">soundDEX</h1>
          <p className="text-xl text-white/60 font-light tracking-wide">Pure Sound.</p>
        </div>
      </motion.div>

      {/* 30% - Left Aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center justify-start px-8 md:px-24"
      >
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-6xl font-semibold text-white/90 tracking-tight mb-4">Precision Engineering</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Every component is crafted with micron-level accuracy.
          </p>
        </div>
      </motion.div>

      {/* 60% - Right Aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-8 md:px-24"
      >
        <div className="max-w-lg text-right">
          <h2 className="text-4xl md:text-6xl font-semibold text-white/90 tracking-tight mb-4">Titanium Drivers</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Unmatched clarity across the entire frequency spectrum.
          </p>
        </div>
      </motion.div>

      {/* 90% - Centered CTA */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white/90 tracking-tighter mb-8">Hear Everything</h2>
          <button className="pointer-events-auto px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform duration-300">
            Pre-order Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
