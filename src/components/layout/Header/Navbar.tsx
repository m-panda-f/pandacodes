import { useState, useEffect } from 'react';
import { BrandLogo } from '../../widgets/BrandLogo/BrandLogo';
import { ActionButton } from '../../widgets/ActionButton/ActionButton';
import { scrollTo } from '../../../hooks/useLenis';
import type { NavItem } from '../../../types';
import './Navbar.css';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'works', label: 'Works', href: '#works' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      // When near the top (Hero / Home section), no nav item should be active
      const aboutEl = document.getElementById('about');
      const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top : Infinity;
      if (scrollY < 80 || aboutTop > 180) {
        setActiveSection('');
        return;
      }

      // Check if user has scrolled near bottom of page
      const isAtBottom =
        window.innerHeight + Math.round(scrollY) >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = NAV_ITEMS.map((item) => item.id);
      let currentSection = '';
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            currentSection = sectionId;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open & handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection('');
    scrollTo(0, { duration: 1.2 });
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    if (targetId === 'hero' || targetId === 'home') {
      setActiveSection('');
      scrollTo(0, { duration: 1.2 });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      setActiveSection(targetId);
      const navHeader = document.querySelector('.navbar-header') as HTMLElement | null;
      const navHeight = navHeader ? navHeader.offsetHeight : 70;
      scrollTo(el, { offset: -navHeight, duration: 1.2 });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Mobile Header Bar (Border-free, 3-column with Centered Logo) */}
        <div className="mobile-header-bar">
          {/* Left: Borderless Minimalist Menu Trigger */}
          <button
            type="button"
            className={`mobile-menu-trigger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation drawer"
            aria-expanded={mobileMenuOpen}
          >
            <span className="menu-bar bar-top" />
            <span className="menu-bar bar-mid" />
            <span className="menu-bar bar-bot" />
          </button>

          {/* Center: Brand Logo */}
          <a
            href="#hero"
            className="mobile-brand-link"
            onClick={handleLogoClick}
            aria-label="Scroll to top"
          >
            <BrandLogo size={24} />
          </a>

          {/* Right: Unique High-Conversion Start Button */}
          <button
            type="button"
            className="mobile-action-pill"
            onClick={() => handleNavClick('#contact')}
            aria-label="Start Project"
          >
            <span className="action-arrow">🏁</span>
          </button>
        </div>

        {/* Desktop Navbar Pill View */}
        <nav className="desktop-navbar-pill glass-panel">
          {/* Logo Space on Desktop */}
          <a
            href="#hero"
            className="navbar-brand-link"
            onClick={handleLogoClick}
            aria-label="Scroll to top"
          >
            <BrandLogo size={28} />
          </a>

          {/* Desktop Nav Links */}
          <ul className="navbar-links" role="list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Button */}
          <div className="navbar-right">
            <ActionButton
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('#contact')}
              icon={<span style={{ fontSize: '0.8rem' }}>↗</span>}
            >
              START PROJECT
            </ActionButton>
          </div>
        </nav>
      </div>

      {/* Backdrop Overlay for Left-Sliding Drawer */}
      <div
        className={`drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Street-Style Mobile Drawer */}
      <aside className={`mobile-left-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand-wrap">
            <a
              href="#hero"
              className="navbar-brand-link"
              onClick={handleLogoClick}
              aria-label="Scroll to top"
            >
              <BrandLogo size={26} />
            </a>

          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation drawer"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-list">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className="drawer-nav-item"
                style={{ '--item-delay': `${index * 55 + 50}ms` } as React.CSSProperties}
              >
                <a
                  href={item.href}
                  className={`drawer-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  <span className="drawer-link-index">0{index + 1}</span>
                  <span className="drawer-link-text">{item.label}</span>
                  <span className="drawer-link-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-footer">
          <button
            type="button"
            className="drawer-action-btn"
            onClick={() => handleNavClick('#contact')}
          >
            <span className="drawer-btn-glow" />
            <span className="drawer-btn-text">START A PROJECT</span>
            <span className="drawer-btn-arrow">↗</span>
          </button>
          <div className="drawer-legal-row">
            <img src="/favicon/logo.png" alt="logo" />
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </aside>
    </header>
  );
};

