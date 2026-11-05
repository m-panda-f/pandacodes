import { useState, useEffect } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ARCHITECTURE');
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPercent(100);
      setStatusText('SYSTEM READY');
      setIsExiting(true);
      onComplete();
      const removeTimer = setTimeout(() => setIsRemoved(true), 100);
      return () => clearTimeout(removeTimer);
    }

    // Lock page scroll during preloader
    document.body.style.overflow = 'hidden';

    // Smooth accelerating progress counter
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate towards the finish
      const increment = current < 30 ? 2 : current < 70 ? 3 : current < 90 ? 4 : 5;
      current = Math.min(100, current + increment);
      setPercent(current);

      if (current < 30) {
        setStatusText('INITIALIZING ARCHITECTURE');
      } else if (current < 65) {
        setStatusText('CALIBRATING DIGITAL SUITE');
      } else if (current < 92) {
        setStatusText('SYNCHRONIZING ASSETS');
      } else if (current < 100) {
        setStatusText('FINALIZING INTERFACE');
      } else {
        setStatusText('WELCOME TO PANDACODES');
        clearInterval(interval);

        // Slight pause on 100% before cinematic upward curtain reveal
        setTimeout(() => {
          setIsExiting(true);
          // Trigger home page pop-in as curtain begins lifting
          onComplete();

          // Unlock scrolling
          document.body.style.overflow = '';

          // Completely unmount preloader once exit animation finishes
          setTimeout(() => {
            setIsRemoved(true);
          }, 850);
        }, 220);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`preloader-overlay ${isExiting ? 'preloader-exit' : ''}`}
      aria-label="Loading digital experience"
      aria-live="polite"
    >
      {/* Subtle Architectural Ambient Glow & Grid Backdrop */}
      <div className="preloader-backdrop-glow" aria-hidden="true" />
      <div className="preloader-backdrop-grid" aria-hidden="true" />

      {/* Main Content Showcase */}
      <div className="preloader-content">
        {/* Official Brand Logo Showcase */}
        <div className="preloader-logo-wrap">
          <img
            src="/favicon/logo.png"
            alt="pandacodes"
            className="preloader-brand-logo"
            loading="eager"
          />
        </div>

        {/* Monolithic Digital Typography Counter */}
        <div className="preloader-counter-wrap">
          <span className="preloader-number">
            {percent < 10 ? `00${percent}` : percent < 100 ? `0${percent}` : percent}
          </span>
          <span className="preloader-percent-symbol">%</span>
        </div>

        {/* Precision Progress Track */}
        <div className="preloader-bar-track" aria-hidden="true">
          <div
            className="preloader-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Dynamic Status Readout */}
        <div className="preloader-status-row">
          <span className="preloader-status-indicator" />
          <span className="preloader-status-text">{statusText}</span>
        </div>
      </div>

      {/* Bottom Corner Coordinates & Audio / Tech Specs */}
      <div className="preloader-footer" aria-hidden="true">
        <span className="preloader-footer-spec">LOC // HYDERABAD, IN</span>
        <span className="preloader-footer-spec">HIGH-PERFORMANCE FULL-STACK</span>
      </div>
    </div>
  );
};

