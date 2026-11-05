import { SectionPlaceholderCard } from '../../cards/SectionPlaceholderCard';
import { SpotlightCard } from '../../cards/SpotlightCard';
import './StackSection.css';

const TECH_STACK = [
  {
    category: 'FRONTEND ARCHITECTURE',
    tech: 'React 19, TypeScript, Next.js, Vite',
    spec: 'Strict types, concurrent rendering, micro-frontends',
  },
  {
    category: 'DESIGN & MOTION',
    tech: 'Vanilla CSS, CSS Tokens, Figma API',
    spec: 'Sub-millisecond frame rendering, accessible semantics',
  },
  {
    category: 'BACKEND & DATA',
    tech: 'Node.js, Go, PostgreSQL, Redis',
    spec: 'ACID transactions, resilient caching, sub-50ms queries',
  },
  {
    category: 'EDGE & CLOUD INFRA',
    tech: 'Cloudflare Workers, AWS, Docker, GitHub CI',
    spec: 'Global anycast edge network, automated container builds',
  },
];

export const StackSection = () => {
  return (
    <section id="stack" className="section-wrapper stack-section">
      <div className="container">
        <div className="section-header">
          <div className="header-meta">
            <span className="mono-tag">SECTION // 04</span>
            <span className="meta-separator">/</span>
          </div>
          <h2 className="heading-section">Engineering Stack & Architecture.</h2>
          <p className="subheading section-subtext">
            Battle-tested technologies selected for maximum speed, security, and developer ergonomics.
          </p>
        </div>

        <div className="stack-content-grid">
          <SectionPlaceholderCard
            sectionNumber="SLOT // 04"
            title="Interactive Technology Radar & Architecture Diagram"
            tagline="ENGINEERING STACK"
            description="Slot reserved for interactive system architecture diagrams, benchmark comparisons, package health audits, and live latency metrics."
            wireframeType="showcase"
            imageSlotText="SYSTEM ARCHITECTURE INFOGRAPHIC"
            actionText="DESIGN STACK SECTION NEXT"
          />

          <SpotlightCard className="stack-specs-card">
            <div className="stack-card-header">
              <span className="mono-tag">CORE INFRASTRUCTURE SPECS</span>
              <span className="mono-spec">LATEST EDITIONS</span>
            </div>
            <div className="stack-list">
              {TECH_STACK.map((item, idx) => (
                <div key={idx} className="stack-item-row">
                  <div className="stack-item-top">
                    <span className="stack-item-cat">{item.category}</span>
                    <span className="stack-dot">✦</span>
                  </div>
                  <h4 className="stack-item-tech">{item.tech}</h4>
                  <p className="stack-item-spec">{item.spec}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
