import { SectionPlaceholderCard } from '../../cards/SectionPlaceholderCard';
import { SpotlightCard } from '../../cards/SpotlightCard';
import { StatusBadge } from '../../widgets/StatusBadge/StatusBadge';
import './ManifestoSection.css';

const PILLARS = [
  {
    title: 'Chromatic Silence',
    desc: 'Color is noise. Black and white reveal form, proportion, weight, and light without distraction.',
    tag: 'PILLAR // 01',
  },
  {
    title: 'Tactile Architecture',
    desc: 'Every edge is chamfered. Every surface has calibrated texture. Mechanical joy in every touch.',
    tag: 'PILLAR // 02',
  },
  {
    title: 'Zero Artificial Scarcity',
    desc: 'Drops are limited by machine tooling tolerances and hand-inspection rates, never marketing tricks.',
    tag: 'PILLAR // 03',
  },
];

export const ManifestoSection = () => {
  return (
    <section id="manifesto" className="section-wrapper manifesto-section">
      <div className="container">
        <div className="section-header">
          <div className="header-meta">
            <span className="mono-tag">SECTION // 03</span>
            <span className="meta-separator">/</span>
            <StatusBadge label="PHILOSOPHY" variant="neutral" />
          </div>
          <h2 className="heading-section">The Noir & Ivory Manifesto.</h2>
          <p className="subheading section-subtext">
            Why panda black and white? In an internet suffocated by RGB saturation and flashy gradient fads, pure monochrome commands supreme attention.
          </p>
        </div>

        <div className="manifesto-grid">
          {/* Main Stage Placeholder Card for Deep Design */}
          <SectionPlaceholderCard
            sectionNumber="SLOT // 03"
            title="The Panda Manifesto & Editorial Narrative"
            tagline="EDITORIAL SYSTEM"
            description="Prepared layout slot for multi-column editorial typography, author quotes, material microscopy zoom-ins, and philosophy video / canvas embed."
            wireframeType="editorial"
            actionText="DESIGN MANIFESTO SECTION NEXT"
          />

          {/* Three Pillars Preview */}
          <div className="pillars-grid">
            {PILLARS.map((pillar, idx) => (
              <SpotlightCard key={idx} className="pillar-card">
                <span className="mono-tag">{pillar.tag}</span>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
