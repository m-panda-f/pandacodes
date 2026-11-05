import { SectionPlaceholderCard } from '../../cards/SectionPlaceholderCard';
import { SpotlightCard } from '../../cards/SpotlightCard';
import { StatusBadge } from '../../widgets/StatusBadge/StatusBadge';
import './ShowcaseSection.css';

const LAB_SPECS = [
  { label: 'CNC CHASSIS', spec: 'Aviation-grade 6063 Aluminum, bead-blasted 120-mesh' },
  { label: 'CERAMIC COATING', spec: 'Nanoscale porcelain white deposition with 9H hardness' },
  { label: 'THERMAL FLUX', spec: 'Custom vapor dissipation channels tuned for silent operation' },
  { label: 'FIRMWARE CORE', spec: 'Rust-based ultra-low latency input scanning engine' },
];

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="section-wrapper showcase-section">
      <div className="container">
        <div className="section-header">
          <div className="header-meta">
            <span className="mono-tag">SECTION // 04</span>
            <span className="meta-separator">/</span>
            <StatusBadge label="HARDWARE LABS" variant="live" />
          </div>
          <h2 className="heading-section">Hardware Labs & Engineering.</h2>
          <p className="subheading section-subtext">
            Behind every porcelain curve and obsidian chamfer lies rigorous engineering and micro-meter precision.
          </p>
        </div>

        <div className="showcase-content-grid">
          <SectionPlaceholderCard
            sectionNumber="SLOT // 04"
            title="Interactive 3D / Exploded Product Visualizer"
            tagline="HARDWARE SYSTEM"
            description="Slot reserved for 360-degree exploded product views, interactive hotspot callouts, material specification selectors, and lab benchmark graphs."
            wireframeType="showcase"
            actionText="DESIGN LABS SECTION NEXT"
          />

          <SpotlightCard className="lab-specs-card">
            <div className="specs-card-header">
              <span className="mono-tag">LAB SPECIFICATIONS // RAW DATA</span>
              <span className="mono-spec">TOLERANCE: ±0.02mm</span>
            </div>
            <div className="specs-list">
              {LAB_SPECS.map((item, idx) => (
                <div key={idx} className="spec-item-row">
                  <span className="spec-item-label">{item.label}</span>
                  <span className="spec-item-value">{item.spec}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
