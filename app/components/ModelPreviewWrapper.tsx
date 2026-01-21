'use client';

import dynamic from 'next/dynamic';

const ModelPreview = dynamic(() => import('./ModelPreview'), {
    loading: () => <div className="h-[70vh] bg-[#050505]" />,
    ssr: false
});

export default function ModelPreviewWrapper() {
    return <ModelPreview />;
}
