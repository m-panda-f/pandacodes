import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let globalLenisInstance: Lenis | null = null;

export const getLenis = () => globalLenisInstance;

export const scrollTo = (
  target: string | number | HTMLElement,
  options?: { offset?: number; duration?: number }
) => {
  const offset = options?.offset ?? 0;
  const duration = options?.duration ?? 1.2;

  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, { offset, duration });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (typeof target === 'string') {
    const id = target.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const targetTop = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  } else if (target instanceof HTMLElement) {
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  }
};

export const useLenis = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    // Respect accessibility reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    globalLenisInstance = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Smoothly intercept in-page hash links (#about, #works, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        if (id === 'hero' || id === 'home') {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }

        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          const navHeader = document.querySelector('.navbar-header') as HTMLElement | null;
          const navHeight = navHeader ? navHeader.offsetHeight : 70;
          lenis.scrollTo(el, { offset: -navHeight, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, [enabled]);
};
