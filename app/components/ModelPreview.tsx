'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
}

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-4 text-white">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-sm tracking-widest uppercase">Loading 3D Model</p>
            </div>
        </Html>
    );
}

function PlaceholderModel() {
    return (
        <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#333" wireframe />
        </mesh>
    );
}

export default function ModelPreview() {
    return (
        <section className="h-screen bg-[#050505] relative z-10 flex flex-col items-center justify-center py-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tighter mb-4">360° View</h2>
                <p className="text-white/60">Drag to explore the details.</p>
            </div>

            <div className="w-full h-[60vh] md:h-[70vh] cursor-grab active:cursor-grabbing">
                <Canvas dpr={[1, 2]} camera={{ fov: 45 }} shadows>
                    <Suspense fallback={<Loader />}>
                        <Stage environment="city" intensity={0.6}>
                            <Model path="/models/headphone.glb" />
                        </Stage>
                    </Suspense>
                    <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                </Canvas>
            </div>

            <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
                <p className="text-white/20 text-xs uppercase tracking-widest">Interactive 3D Preview</p>
            </div>
        </section>
    );
}

useGLTF.preload('/models/headphone.glb');
