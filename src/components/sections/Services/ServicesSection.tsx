import { useState } from 'react';
import { scrollTo } from '../../../hooks/useLenis';
import './ServicesSection.css';

interface PackageTier {
  id: string;
  name: string;
  tag: string;
  subtitle: string;
  price: string;
  priceNote: string;
  commercialModel: string;
  featured?: boolean;
  points: string[];
  ctaText: string;
}

const PACKAGES: PackageTier[] = [
  {
    id: 'launch',
    name: 'LAUNCH',
    tag: 'BASIC',
    subtitle: 'Build & Handover',
    price: '₹12,000',
    priceNote: 'Starting Website Baseline',
    commercialModel: 'One-time build fee. Client handles ongoing management.',
    points: [
      'End-to-end product development',
      '1 revision per development stage',
      'Standard UI/UX design',
      'Testing and deployment',
      'Basic documentation and management guidance',
    ],
    ctaText: 'SELECT LAUNCH',
  },
  {
    id: 'growth',
    name: 'GROWTH',
    tag: 'GOLD',
    subtitle: 'Build & Manage',
    price: '₹20,000',
    priceNote: 'Starting Website Baseline',
    featured: true,
    commercialModel: 'One-time development fee + monthly management.',
    points: [
      'Everything in Launch',
      '3 revisions per development stage',
      'Enhanced UI/UX design and optimization',
      'Ongoing technical assistance',
      'Bug monitoring and troubleshooting',
      'Monthly management services',
    ],
    ctaText: 'CHOOSE GROWTH',
  },
  {
    id: 'elite',
    name: 'ELITE',
    tag: 'PREMIUM',
    subtitle: 'Build, Manage & Scale',
    price: '₹35,000',
    priceNote: 'Starting Website Baseline',
    commercialModel: 'One-time development fee + maintenance and management.',
    points: [
      'Everything in Growth',
      'Complete development and deployment',
      'Dedicated maintenance & telemetry',
      'Security, automated backups and monitoring',
      'Priority technical support',
      'Continuous optimization & audits',
      '80% discount on additional development labour for the first 3 months',
    ],
    ctaText: 'SCALE WITH ELITE',
  },
];

interface ServiceVertical {
  id: string;
  title: string;
  subtitle: string;
  minFee: string;
  scope: string[];
  note: string;
}

const VERTICALS: ServiceVertical[] = [
  {
    id: 'web',
    title: 'Website Development',
    subtitle: 'Corporate & Growth Platforms',
    minFee: '₹25,000',
    scope: ['Corporate websites', 'Business websites', 'Portfolios', 'High-conversion landing pages'],
    note: 'End-to-end architectural execution',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    subtitle: 'Native & Cross-Platform',
    minFee: '₹1,00,000',
    scope: ['Android applications', 'iOS applications', 'Cross-platform apps', 'App store release & telemetry'],
    note: 'High-performance mobile UX',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Development',
    subtitle: 'High-Scale Retail Architecture',
    minFee: '₹45,000',
    scope: ['Shopify stores', 'Custom bespoke stores', 'Payment gateways', 'Logistics integrations'],
    note: 'Sub-second checkout workflows',
  },
  {
    id: 'software',
    title: 'Custom Software Development',
    subtitle: 'Internal Systems & SaaS',
    minFee: '₹1,00,000',
    scope: ['SaaS platforms', 'Custom CRM & ERP', 'Real-time telemetry dashboards', 'Business management systems'],
    note: 'Scalable cloud infrastructure',
  },
];

const LIFECYCLE_STEPS = [
  {
    step: '01',
    phase: 'PHASE 01',
    name: 'Discovery & Consultation',
    desc: 'Understanding business requirements, objectives, scope, and technical feasibility.',
  },
  {
    step: '02',
    phase: 'STRATEGY',
    name: 'Planning & Architecture',
    desc: 'Technology selection, system architecture, database planning, and project roadmap.',
  },
  {
    step: '03',
    phase: 'DESIGN',
    name: 'UI/UX Design',
    desc: 'Wireframes, visual design, interactive prototypes, and user experience planning.',
  },
  {
    step: '04',
    phase: 'BUILD',
    name: 'Development',
    desc: 'Frontend, backend, database engineering, APIs, and third-party integrations.',
  },
  {
    step: '05',
    phase: 'PHASE 02',
    name: 'Testing & QA',
    desc: 'Functional testing, cross-device responsiveness, performance auditing, and bug resolution.',
  },
  {
    step: '06',
    phase: 'RELEASE',
    name: 'Deployment & Launch',
    desc: 'Hosting configuration, domain setup, production deployment, and telemetry verification.',
  },
  {
    step: '07',
    phase: 'GROWTH',
    name: 'Maintenance & Growth',
    desc: 'Ongoing monitoring, technical support, server maintenance, and iterative development.',
  },
];



export const ServicesSection = () => {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPkg(pkgName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const navHeader = document.querySelector('.navbar-header') as HTMLElement | null;
      const navHeight = navHeader ? navHeader.offsetHeight : 70;
      scrollTo(contactEl, { offset: -navHeight, duration: 1.2 });
    }
  };

  return (
    <section id="services" className="section-wrapper services-section">
      <div className="container">
        {/* ==========================================================================
            1. SECTION MASTHEAD (Clean & Direct)
            ========================================================================== */}
        <div className="services-masthead">
          <h2 className="services-hero-title">Full-Stack Digital Solutions.</h2>
        </div>

        {/* ==========================================================================
            2. DEVELOPMENT & SERVICE PACKAGES (Three Options First)
            ========================================================================== */}
        <div className="services-packages-wrapper">
          <div className="packages-header">
            <span className="packages-subtitle">DEVELOPMENT &amp; SERVICE PACKAGES</span>
            <h3 className="packages-title">Choose Your Engagement Model</h3>
            <p className="packages-desc">
              Three transparent tiers designed for clean handover or long-term growth and technical partnership.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.featured ? 'is-featured' : ''} ${selectedPkg === pkg.name ? 'is-selected' : ''}`}
              >
                {pkg.featured && (
                  <div className="package-featured-badge">
                    <span>RECOMMENDED</span>
                  </div>
                )}

                <div className="package-card-header">
                  <div className="package-tier-badge">{pkg.tag}</div>
                  <h4 className="package-name">{pkg.name}</h4>
                  <p className="package-promise">{pkg.subtitle}</p>
                </div>

                {/* Price Display */}
                <div className="package-price-box">
                  <div className="package-price-row">
                    <span className="package-price-val">{pkg.price}</span>
                  </div>
                  <span className="package-price-subtext">{pkg.priceNote}</span>
                </div>

                <ul className="package-points-list">
                  {pkg.points.map((pt, i) => (
                    <li key={i} className="package-point-item">
                      <span className="package-check-icon">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-card-footer">
                  <div className="package-commercial-info">
                    <span className="commercial-label">COMMERCIAL MODEL</span>
                    <p className="commercial-desc">{pkg.commercialModel}</p>
                  </div>

                  <button
                    type="button"
                    className={`package-cta-btn ${pkg.featured ? 'btn-featured' : ''}`}
                    onClick={() => handleSelectPackage(pkg.name)}
                    aria-label={`Select ${pkg.name} package`}
                  >
                    <span>{pkg.ctaText}</span>
                    <span className="btn-arrow">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Calibration Minor Note */}
          <div className="packages-disclaimer-row">
            <span className="disclaimer-icon">ℹ</span>
            <p className="packages-disclaimer-text">
              * Rates shown reflect standard website baseline configurations. Final project fee scales with your selected vertical (Mobile App, E-Commerce, Custom Software) and ongoing monthly maintenance scope.
            </p>
          </div>
        </div>

        {/* ==========================================================================
            3. CORE SERVICE OFFERINGS (Four Primary Verticals With Minimum Fees)
            ========================================================================== */}
        <div className="services-verticals-wrapper">
          <div className="verticals-header">
            <span className="verticals-subtitle">PRIMARY DEVELOPMENT VERTICALS</span>
            <h3 className="verticals-title">Core Service Offerings</h3>
            <p className="verticals-desc">
              Every vertical follows an end-to-end development approach with clear minimum project baselines.
            </p>
          </div>

          <div className="verticals-grid">
            {VERTICALS.map((vertical) => (
              <div key={vertical.id} className="vertical-card">
                <div className="vertical-card-top">
                  <div className="vertical-fee-pill">
                    <span className="vertical-fee-label">MINIMUM PROJECT FEE</span>
                    <span className="vertical-fee-amount">{vertical.minFee}</span>
                  </div>
                  <h4 className="vertical-title">{vertical.title}</h4>
                  <span className="vertical-scope-tag">{vertical.subtitle}</span>
                </div>

                <ul className="vertical-scope-list">
                  {vertical.scope.map((item, idx) => (
                    <li key={idx} className="vertical-scope-item">
                      <span className="vertical-bullet-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="vertical-card-bottom">
                  <span className="vertical-note">{vertical.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            4. END-TO-END PROJECT LIFECYCLE (Structured 7-Step Connected Process)
            ========================================================================== */}
        <div className="services-lifecycle-wrapper">
          <div className="lifecycle-header">
            <span className="lifecycle-subtitle">DELIVERY ARCHITECTURE</span>
            <h3 className="lifecycle-title">End-to-End Project Lifecycle</h3>
            <p className="lifecycle-desc">
              Every project follows an intentional, structured engineering process from initial consultation to continuous scale.
            </p>
          </div>

          <div className="lifecycle-grid">
            {LIFECYCLE_STEPS.map((step, idx) => (
              <div key={step.step} className="lifecycle-step-card">
                <div className="step-card-header">
                  <span className="step-number">{step.step}</span>
                  <span className="step-phase-badge">{step.phase}</span>
                </div>
                <h4 className="step-name">{step.name}</h4>
                <p className="step-desc">{step.desc}</p>

                {/* Dotted Flow Connector to next step */}
                {idx < LIFECYCLE_STEPS.length - 1 && (
                  <div className={`step-flow-connector connector-step-${idx + 1}`} aria-hidden="true">
                    <div className="connector-dashed-line" />
                    <div className="connector-arrow-head">
                      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                        <path d="M1.5 1.5L6 5L1.5 8.5" stroke="#0c0c0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Step 07 Terminal Loop Indicator */}
                {idx === LIFECYCLE_STEPS.length - 1 && (
                  <div className="step-terminal-badge" aria-hidden="true">
                    <span className="terminal-loop-icon">↻</span>
                    <span>CONTINUOUS SCALE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            6. FOUR PILLARS CLOSING BANNER
            ========================================================================== */}
        <div className="services-pillars-banner">
          <div className="pillars-brand-tag">FROM IDEA TO INFRASTRUCTURE</div>
          <h3 className="pillars-headline">
            Design &middot; Develop &middot; Deploy &middot; Manage
          </h3>
          <p className="pillars-manifesto">
            We don't just build websites or applications. We engineer complete digital solutions, manage their technology, and help businesses scale through reliable software and continuous development.
          </p>

          <div className="pillars-cta-row">
            <button
              type="button"
              className="pillars-cta-button"
              onClick={() => handleSelectPackage('Custom Inquiry')}
            >
              <span>DISCUSS YOUR PROJECT SCOPE</span>
              <span className="btn-arrow">&rarr;</span>
            </button>
            <span className="pillars-legal-note">
              PREMIUM DIGITAL DEVELOPMENT &amp; TECHNOLOGY PARTNERSHIP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
