import { useEffect, type ReactNode } from 'react';
import { Navbar } from './Header/Navbar';
import { Footer } from './Footer/Footer';
import { TickerBar } from '../widgets/TickerBar/TickerBar';
import { AmbientBackdrop } from '../animations/AmbientBackdrop';
import { NoiseOverlay } from '../animations/NoiseOverlay';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // JavaScript fallback for browsers without native CSS animation-timeline: scroll()
    if (typeof window !== 'undefined' && !CSS.supports('animation-timeline', 'scroll()')) {
      const progressBar = document.getElementById('scroll-progress');
      if (!progressBar) return;

      const handleScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const scrolled = window.scrollY;
        const progressPercentage = Math.min(1, Math.max(0, scrolled / scrollable));
        progressBar.style.transform = `scaleX(${progressPercentage})`;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="layout-root">
      {/* Skip to Content for Screen Readers & Keyboard Navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Precision Scroll Progress Indicator */}
      <div id="scroll-progress" className="layout-scroll-progress" aria-hidden="true" />

      {/* Visual Depth & Texture Overlays */}
      <AmbientBackdrop />
      <NoiseOverlay />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Single Page Content */}
      <main className="layout-main" id="main-content">
        {children}
      </main>

      {/* Infinite Brand Ticker */}
      <TickerBar />

      {/* Editorial Monochrome Footer */}
      <Footer />
    </div>
  );
};
