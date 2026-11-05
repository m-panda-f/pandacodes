import { SectionPlaceholderCard } from '../../cards/SectionPlaceholderCard';
import { SpotlightCard } from '../../cards/SpotlightCard';
import { StatusBadge } from '../../widgets/StatusBadge/StatusBadge';
import './CatalogPreviewSection.css';

const SAMPLE_DROPS = [
  {
    code: 'DROP // 001',
    name: 'Panda Obsidian 75 Keyboard',
    category: 'HARDWARE',
    price: '$340',
    edition: 'EDITION OF 50',
    status: 'READY FOR STAGE DESIGN',
  },
  {
    code: 'DROP // 002',
    name: 'Porcelain Soundbar Pro',
    category: 'ACOUSTICS',
    price: '$480',
    edition: 'EDITION OF 30',
    status: 'READY FOR STAGE DESIGN',
  },
  {
    code: 'DROP // 003',
    name: 'Monochrome Tactical Shell',
    category: 'APPAREL',
    price: '$210',
    edition: 'EDITION OF 120',
    status: 'READY FOR STAGE DESIGN',
  },
];

export const CatalogPreviewSection = () => {
  return (
    <section id="catalog" className="section-wrapper catalog-section">
      <div className="container">
        <div className="section-header">
          <div className="header-meta">
            <span className="mono-tag">SECTION // 02</span>
            <span className="meta-separator">/</span>
            <StatusBadge label="DROPS ENGINE READY" variant="neutral" />
          </div>
          <h2 className="heading-section">Curated Drops & Inventory.</h2>
          <p className="subheading section-subtext">
            Limited batch productions engineered with obsessive attention to tactile response, architectural silhouettes, and monochromatic purity.
          </p>
        </div>

        {/* Section Layout Container */}
        <div className="catalog-layout-grid">
          <SectionPlaceholderCard
            sectionNumber="SLOT // 02"
            title="SZN 01 Curated Drops Showcase"
            tagline="CATALOG SYSTEM"
            description="This container is pre-architected with grid columns, hover lighting, filter bar states, and checkout triggers. Next, we will craft custom product galleries, real-time stock counters, and modal checkout inspectors."
            wireframeType="grid"
            actionText="DESIGN CATALOG SECTION NEXT"
          />

          {/* Preliminary drop preview cards demonstrating typography and lighting */}
          <div className="drops-preview-column">
            {SAMPLE_DROPS.map((drop, idx) => (
              <SpotlightCard key={idx} className="drop-mini-card">
                <div className="drop-card-top">
                  <span className="mono-tag">{drop.code}</span>
                  <span className="drop-category">{drop.category}</span>
                </div>
                <h4 className="drop-name">{drop.name}</h4>
                <div className="drop-card-bottom">
                  <span className="drop-price">{drop.price}</span>
                  <span className="drop-edition">{drop.edition}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
