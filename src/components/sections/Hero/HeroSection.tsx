import { useState, useRef, useEffect } from 'react';
import './HeroSection.css';

const MOBILE_HERO_SLIDES = [
  {
    id: 'mobile-slide-1',
    image: '/ads/ad-1.png',
  },
  {
    id: 'mobile-slide-2',
    image: '/ads/ad-2.png',
  },
  {
    id: 'mobile-slide-3',
    image: '/ads/ad-3.png',
  },
];

// Circular Loop Extended Slides: [Clone of Last, ...Originals, Clone of First]
const EXTENDED_SLIDES = [
  { ...MOBILE_HERO_SLIDES[MOBILE_HERO_SLIDES.length - 1], uniqueKey: 'loop-clone-last' },
  ...MOBILE_HERO_SLIDES.map((s, idx) => ({ ...s, uniqueKey: `real-slide-${idx}` })),
  { ...MOBILE_HERO_SLIDES[0], uniqueKey: 'loop-clone-first' },
];

interface HeroSectionProps {
  isLoaded?: boolean;
}

export const HeroSection = ({ isLoaded = false }: HeroSectionProps) => {
  const [, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  // Setup loop boundary listening & initial scroll positioning
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Immediately anchor on index 1 (the first real slide)
    const setInitialPos = () => {
      const width = el.clientWidth;
      if (width > 0) {
        el.scrollLeft = width * 1;
      }
    };

    setInitialPos();
    window.addEventListener('resize', setInitialPos);

    let isTeleporting = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (isTeleporting) return;
      const width = el.clientWidth;
      if (width <= 0) return;

      const rawIndex = Math.round(el.scrollLeft / width);

      // Map raw track position to real dot indicator index (0, 1, 2)
      let realDot = 0;
      if (rawIndex <= 0) {
        realDot = MOBILE_HERO_SLIDES.length - 1;
      } else if (rawIndex >= EXTENDED_SLIDES.length - 1) {
        realDot = 0;
      } else {
        realDot = rawIndex - 1;
      }
      setActiveSlide(realDot);

      // Once the scroll animation or touch swipe lands on clone, silently teleport
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const curIdx = Math.round(el.scrollLeft / width);
        if (curIdx === 0) {
          isTeleporting = true;
          el.scrollLeft = width * MOBILE_HERO_SLIDES.length;
          setTimeout(() => {
            isTeleporting = false;
          }, 40);
        } else if (curIdx === EXTENDED_SLIDES.length - 1) {
          isTeleporting = true;
          el.scrollLeft = width * 1;
          setTimeout(() => {
            isTeleporting = false;
          }, 40);
        }
      }, 90);
    };

    const handleTouchStart = () => {
      isInteractingRef.current = true;
    };

    const handleTouchEnd = () => {
      isInteractingRef.current = false;
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', setInitialPos);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Continuous auto-swipe every 2 seconds ALWAYS to the right in infinite loop
  useEffect(() => {
    const timer = setInterval(() => {
      if (isInteractingRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const width = el.clientWidth;
      if (width <= 0) return;

      const curRawIndex = Math.round(el.scrollLeft / width);
      // Always swipe forward to the right into the next slide or clone
      const nextRawIndex = curRawIndex + 1;
      el.scrollTo({
        left: width * nextRawIndex,
        behavior: 'smooth',
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);


  return (
    <section id="hero" className="hero-section">
      {/* Anchor for Home / Hero navigation */}
      <div id="home" aria-hidden="true" />

      {/* Top 30% Mobile-Only Infinite Circular 16:9 Banner */}
      <div className="hero-mobile-banner-section" aria-label="Featured mobile banner showcase">
        <div className="hero-mobile-banner-track" ref={scrollRef}>
          {EXTENDED_SLIDES.map((slide) => (
            <div key={slide.uniqueKey} className="hero-mobile-banner-item">
              <img
                src={slide.image}
                alt=""
                className="hero-mobile-banner-img"
                loading="eager"
              />
            </div>
          ))}
        </div>


      </div>

      {/* Layer 1: Black & White Circular Gradient radiating from center */}
      <div className="hero-circular-gradient-wrapper" aria-hidden="true">
        <div className="hero-circular-gradient" />
        <div className="hero-gradient-ring ring-outer" />
        <div className="hero-gradient-ring ring-mid" />
      </div>

      {/* Layer 2: Giant Ultra-Bold Typography + Designation */}
      <div className="hero-bg-text-wrapper" aria-hidden="true">
        <div className="hero-bg-text-container">
          <div className="hero-bg-text">
            <span>F</span>
            <span>A</span>
            <span>I</span>
            <span>Z</span>
            <span>A</span>
            <span>N</span>
          </div>
          <br />

          <div className="hero-designation">
            DEVELOPER
          </div>
        </div>
      </div>

      {/* Layer 3: Foreground Container with Flush-Bottom Cutout (9:16 Portrait) */}
      <div className="hero-container">
        {/* Cutout Image Stage (Anchored to Bottom) */}
        <div className="hero-cutout-stage">
          <picture className="hero-picture">
            <source media="(min-width: 768px)" srcSet="/desktop-panda.png" />
            <img
              src="/panda-bg.png"
              alt="Faizan - pandacodes"
              className="hero-cutout-img"
              loading="eager"
            />
          </picture>

          {/* 16:9 Floating Icons Overlay (Only pops out AFTER the loader page exits) */}
          <img
            src="/icons.png"
            alt=""
            className={`hero-overlay-icons ${isLoaded ? 'pop-active' : ''}`}
            loading="eager"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

