import { useState, useEffect } from 'react';
import { scrollTo } from '../../../hooks/useLenis';
import './WorksSection.css';

interface WorkProject {
  id: string;
  gridArea: 'box1' | 'box2' | 'box3' | 'box4' | 'box5' | 'box6';
  title: string;
  subtitle: string;
  category: string;
  image: string;
  previewUrl: string;
  description: string;
  highlights: string[];
  specs: {
    stack: string[];
    timeline: string;
    role: string;
    outcome: string;
  };
  metric: string;
  featured?: boolean;
}

const PROJECTS: WorkProject[] = [
  {
    id: 'ironix-ecommerce',
    gridArea: 'box1',
    title: 'IRONIX — Premium E-Commerce',
    subtitle: 'Performance Apparel Storefront & Integrated Commerce Experience',
    category: 'E-COMMERCE PLATFORM',
    image: '/projects/pr-1.png',
    previewUrl: 'https://ironix.in',
    metric: 'END-TO-END COMMERCE',
    featured: true,
    description:
      'A premium Shopify-powered e-commerce platform for IRONIX, a performance-focused gymwear and streetwear brand. Designed to deliver a refined shopping experience through product discovery, collection management, optimized product pages, and integrated checkout workflows. The platform brings together commerce operations, payment experiences, cart enhancements, and shipping automation into a unified storefront.',
    highlights: [
      'Custom Shopify storefront with premium UI, responsive layouts, product collections, and optimized shopping journeys',
      'Integrated COD King partial-payment workflows, supporting online advance payments and balance collection on delivery',
      'Rapid Cart enhancements and Shiprocket integration for cart experiences, order processing, and shipping operations',
      'Product variant and inventory management with size-based stock allocation',
      'End-to-end storefront maintenance, integration management, and technical architecture'
    ],
    specs: {
      stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Shopify Apps'],
      timeline: 'Not specified',
      role: 'Full-Stack Developer & E-Commerce Architect',
      outcome: 'Integrated premium commerce ecosystem'
    }
  },

  {
    id: 'hotel-management',
    gridArea: 'box2',
    title: 'Hotel Booking Platform',
    subtitle: 'Hotel Discovery, Room Availability & Reservation Management',
    category: 'BOOKING PLATFORM',
    image: '/projects/pr-2.png',
    previewUrl: 'https://hotel-booking-management-qw1g.onrender.com/',
    metric: 'ROOM RESERVATIONS',
    featured: false,
    description:
      'A hotel-specific booking website designed to simplify the guest reservation journey. Visitors can explore available room categories, review accommodation details, select their preferred dates, and submit room reservations through a streamlined booking experience. The platform focuses on making hotel information and room booking accessible through a responsive digital interface.',
    highlights: [
      'Dedicated hotel website with room categories, detailed accommodation information, and visual listings',
      'Date-based room selection and availability-oriented booking workflow',
      'Reservation forms capturing guest information and booking requirements',
      'Structured room and reservation management workflows',
      'Responsive interface designed for seamless browsing across desktop and mobile devices'
    ],
    specs: {
      stack: ['Frontend', 'Backend', 'Database'],
      timeline: 'Not specified',
      role: 'Full-Stack Developer',
      outcome: 'Digital hotel reservation experience'
    }
  },

  {
    id: 'candle-commerce',
    gridArea: 'box3',
    title: 'Candle Studio',
    subtitle: 'Minimalist Product Catalog & Boutique Shopping Experience',
    category: 'E-COMMERCE SHOWCASE',
    image: '/projects/pr-3.png',
    previewUrl: 'https://pandas-candle.onrender.com/',
    metric: 'PRODUCT SHOWCASE',
    featured: false,
    description:
      'A visually driven single-page website for a boutique candle business, built to present its products through an elegant and immersive digital storefront. The experience combines product-focused imagery, curated catalog sections, brand storytelling, and clear customer action points to establish a premium online identity without the complexity of a full-scale commerce platform.',
    highlights: [
      'Single-page product catalog with structured product presentation and category-based discovery',
      'Premium visual direction with elegant typography, imagery, and cohesive brand styling',
      'Dedicated product showcases highlighting candle designs, collections, and product details',
      'Strategically positioned inquiry and customer conversion touchpoints',
      'Responsive layout optimized for mobile-first product exploration'
    ],
    specs: {
      stack: ['HTML', 'CSS', 'JavaScript'],
      timeline: 'Not specified',
      role: 'Frontend Developer & UI Designer',
      outcome: 'Premium single-page product showcase'
    }
  },

  {
    id: 'weather-application',
    gridArea: 'box4',
    title: 'Atmos — Weather Intelligence',
    subtitle: 'Real-Time Weather Monitoring & Forecast Experience',
    category: 'WEATHER APPLICATION',
    image: '/projects/pr-4.png',
    previewUrl: 'https://pandas-candle.onrender.com/',
    metric: 'LIVE WEATHER DATA',
    featured: false,
    description:
      'A modern weather application designed to make environmental information easier to understand through a clean, intuitive interface. The application presents weather conditions and forecast information in an accessible format, transforming raw weather data into a visually engaging experience that helps users stay informed about changing conditions.',
    highlights: [
      'Weather information dashboard presenting current environmental conditions',
      'API-driven weather data retrieval and dynamic information rendering',
      'Forecast-oriented interface for understanding upcoming weather conditions',
      'Weather-specific visual components and intuitive information hierarchy',
      'Responsive application interface with a streamlined user experience'
    ],
    specs: {
      stack: ['JavaScript', 'Weather API', 'HTML', 'CSS'],
      timeline: 'Not specified',
      role: 'Frontend Developer',
      outcome: 'Interactive weather information dashboard'
    }
  },

  {
    id: 'brilnix-education',
    gridArea: 'box5',
    title: 'Brilnix — Intelligent Learning',
    subtitle: 'AI-Powered Educational Video Platform & Collaborative Learning Community',
    category: 'EDTECH & AI PLATFORM',
    image: '/projects/pr-5.png',
    previewUrl: 'https://github.com/m-panda-f/BRILNIX',
    metric: 'AI VIDEO VALIDATION',
    featured: true,
    description:
      'Brilnix is an intelligent educational application that transforms learning into an interactive, community-driven experience. The platform uses AI-assisted video classification to evaluate uploaded content and determine whether it provides genuine educational value. Approved educational contributions earn students points, which can be used to unlock courses and learning opportunities. An integrated AI chatbot helps students resolve doubts, while community features encourage collaboration and knowledge sharing.',
    highlights: [
      'AI-assisted educational video validation that evaluates uploaded content before allowing it onto the learning platform',
      'Content-based reward mechanism that awards learning points for approved educational contributions',
      'Gamified learning ecosystem where accumulated points provide access to available courses',
      'Integrated AI chatbot that allows students to ask questions and clarify doubts while learning',
      'Student community with social interaction, peer connections, and knowledge sharing',
      'Video submission, processing, classification, and approval workflow'
    ],
    specs: {
      stack: ['Flutter', 'Firebase', 'Python', 'Flask', 'Gemini API'],
      timeline: 'Not specified',
      role: 'Full-Stack Developer & AI Integration',
      outcome: 'AI-validated collaborative learning ecosystem'
    }
  },

  {
    id: 'tone-garage',
    gridArea: 'box6',
    title: 'Tone Garage — Fitness Ecosystem',
    subtitle: 'Integrated Fitness Transformation Platform & Trainer Management System',
    category: 'FITNESS TECHNOLOGY',
    image: '/projects/pr-6.png',
    previewUrl: 'https://tonegarage.in',
    metric: 'WEB + MOBILE ECOSYSTEM',
    featured: true,
    description:
      'A comprehensive digital fitness ecosystem built around the Tone Garage transformation experience, connecting its website, mobile application, backend services, and database infrastructure. The platform supports structured workout experiences, trainer-led transformation programs, membership journeys, and digital fitness operations. Its architecture brings together user-facing experiences and operational workflows to support a connected fitness business.',
    highlights: [
      'Integrated website and mobile application supporting the broader Tone Garage digital ecosystem',
      'Structured fitness programs with VIP, GOLD, and NORMAL transformation plan categories',
      'Trainer and coach selection workflows with multi-branch management considerations',
      'Workout delivery system supporting exercise descriptions, video playback, rest timers, sets, and workout progression',
      'Free and paid workout experiences with differentiated access and navigation flows',
      'Backend API development, database management, authentication, application integrations, and ongoing maintenance',
      'Firebase Analytics and Google Analytics event tracking for application usage and engagement insights'
    ],
    specs: {
      stack: ['Flutter', 'React.js', 'Node.js', 'Express.js', 'Firebase'],
      timeline: 'Ongoing Development',
      role: 'Sole Full-Stack Developer & Technical Owner',
      outcome: 'Unified fitness web and mobile ecosystem'
    }
  }
];

export const WorksSection = () => {
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  // Keyboard navigation (ESC closes modal) & body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const handleModalContactClick = () => {
    setSelectedProject(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const navHeader = document.querySelector('.navbar-header') as HTMLElement | null;
      const navHeight = navHeader ? navHeader.offsetHeight : 70;
      scrollTo(contactEl, { offset: -navHeight, duration: 1.2 });
    }
  };

  return (
    <section id="works" className="section-wrapper works-section">
      <div className="container">
        {/* Two Separation Layout: Left Text & Right Pure Image-Filled Bento Grid */}
        <div className="works-split-container">
          {/* Left Column: Text & Monumental Title (Zero // junk) */}
          <div className="works-editorial-col">
            <h2 className="works-editorial-title">
              Bespoke Web Development &amp; Digital Craft
            </h2>

            <ul className="works-bullet-list">
              <li className="works-bullet-item">
                <span className="works-bullet-dot" />
                <span>
                  Created engaging digital platforms and web applications aligned with brand visual identity.
                </span>
              </li>
              <li className="works-bullet-item">
                <span className="works-bullet-dot" />
                <span>
                  Planned, architected, and engineered custom solutions with high-conversion user experiences.
                </span>
              </li>
              <li className="works-bullet-item">
                <span className="works-bullet-dot" />
                <span>
                  Full-stack execution from bespoke frontend interfaces to scalable cloud infrastructure.
                </span>
              </li>
            </ul>

            {/* Giant Monumental Display Typography (Matching reference design) */}
            <div className="works-monumental-text" aria-hidden="true">
              <span className="monumental-line">PREVIOUS</span>
              <span className="monumental-line">PROJECTS</span>
            </div>
          </div>

          {/* Right Column: 100% PURE IMAGE-FILLED 1:1 SQUARE BENTO GRID */}
          <div className="works-bento-grid">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className={`work-bento-card ${proj.featured ? 'is-featured' : 'is-compact'}`}
                data-area={proj.gridArea}
                onClick={() => setSelectedProject(proj)}
                role="button"
                tabIndex={0}
                aria-label={`Open case study for ${proj.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(proj);
                  }
                }}
              >
                {/* 100% Pure Image Filled Box (Zero text on hover) */}
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="work-card-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================================================
          INTERACTIVE POPUP BOX (Appears on Click with Information & Action Buttons)
          ========================================================================== */}
      {selectedProject && (
        <div
          className="works-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          aria-hidden="true"
        >
          <div
            className="works-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-meta">
                <span className="modal-category">{selectedProject.category}</span>
                <span className="modal-metric-badge">{selectedProject.metric}</span>
                <a
                  href={selectedProject.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-header-live-badge"
                  title="Open live preview in new tab"
                >
                  <span className="modal-live-dot" />
                  <span>LIVE PREVIEW</span>
                  <span className="modal-live-arrow">&nearr;</span>
                </a>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal dialog"
              >
                ✕
              </button>
            </div>

            {/* Modal Visual Hero Image with Live URL Bar */}
            <div className="modal-visual-hero">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-hero-img"
              />
              <div className="modal-hero-live-bar">
                <div className="modal-hero-url-text">
                  <span className="modal-live-dot" />
                  <span>{selectedProject.previewUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </div>
                <a
                  href={selectedProject.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-hero-launch-link"
                >
                  <span>{selectedProject.previewUrl.includes('github.com') ? 'VIEW REPO' : 'LAUNCH LIVE'}</span>
                  <span className="modal-btn-arrow">&nearr;</span>
                </a>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="modal-body">
              <h3 id="modal-project-title" className="modal-title">
                {selectedProject.title}
              </h3>
              <p className="modal-subtitle">{selectedProject.subtitle}</p>
              <p className="modal-desc">{selectedProject.description}</p>

              {/* Highlights List */}
              <div className="modal-section-block">
                <h4 className="modal-block-heading">KEY ACHIEVEMENTS</h4>
                <ul className="modal-highlights-list">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="modal-highlight-item">
                      <span className="modal-highlight-dot">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Grid */}
              <div className="modal-specs-grid">
                <div className="modal-spec-cell">
                  <span className="spec-cell-label">TECH STACK</span>
                  <div className="spec-tags-cluster">
                    {selectedProject.specs.stack.map((tech, i) => (
                      <span key={i} className="spec-tag-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-spec-cell">
                  <span className="spec-cell-label">TIMELINE</span>
                  <span className="spec-cell-value">{selectedProject.specs.timeline}</span>
                </div>

                <div className="modal-spec-cell">
                  <span className="spec-cell-label">ROLE</span>
                  <span className="spec-cell-value">{selectedProject.specs.role}</span>
                </div>

                <div className="modal-spec-cell">
                  <span className="spec-cell-label">KEY OUTCOME</span>
                  <span className="spec-cell-value">{selectedProject.specs.outcome}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="modal-footer">
              <a
                href={selectedProject.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-action-live-btn"
              >
                <span>{selectedProject.previewUrl.includes('github.com') ? 'VIEW SOURCE ON GITHUB' : 'VISIT LIVE PLATFORM'}</span>
                <span className="modal-btn-arrow">&nearr;</span>
              </a>

              <button
                type="button"
                className="modal-primary-btn"
                onClick={handleModalContactClick}
              >
                <span>LET'S BUILD A SIMILAR PLATFORM</span>
                <span className="modal-btn-arrow">&rarr;</span>
              </button>

              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setSelectedProject(null)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
