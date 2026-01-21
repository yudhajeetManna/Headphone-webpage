import dynamic from 'next/dynamic';
import HeadphoneScroll from "./components/HeadphoneScroll";
import ModelPreviewWrapper from "./components/ModelPreviewWrapper";

const ProductSection = dynamic(() => import('./components/ProductSection'), {
  loading: () => <div className="h-screen bg-[#050505]" />,
});

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <HeadphoneScroll />
      <ProductSection />
      <ModelPreviewWrapper />

      <footer className="py-12 text-center text-white/30 text-sm border-t border-white/5 flex flex-col gap-4">
        <p>&copy; 2026 soundDEX Audio. All rights reserved.</p>
        <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
      </footer>
    </main>
  );
}
