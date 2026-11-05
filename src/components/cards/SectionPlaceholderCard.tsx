import { SpotlightCard } from './SpotlightCard';
import './SectionPlaceholderCard.css';

interface SectionPlaceholderCardProps {
  sectionNumber: string;
  title: string;
  tagline: string;
  description: string;
  actionText?: string;
  wireframeType?: 'grid' | 'showcase' | 'editorial' | 'split';
  imageSlotText?: string;
  onActionClick?: () => void;
}

export const SectionPlaceholderCard = ({
  sectionNumber,
  title,
  tagline,
  description,
  actionText = 'STAGE // QUEUED FOR NEXT DESIGN',
  wireframeType = 'grid',
  imageSlotText = 'DESIGNATED IMAGE SLOT',
  onActionClick,
}: SectionPlaceholderCardProps) => {
  return (
    <SpotlightCard className="section-placeholder-card">
      <div className="card-top-bar">
        <div className="section-index-badge">
          <span className="index-num">{sectionNumber}</span>
          <span className="index-divider">/</span>
          <span className="index-tag">{tagline}</span>
        </div>
        <div className="card-status-chip">
          <span className="chip-dot" />
          <span>LAYOUT STAGED</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="section-card-title">{title}</h3>
        <p className="section-card-desc">{description}</p>

        {/* Architectural Wireframe Mockup with Image Slot */}
        <div className={`wireframe-preview type-${wireframeType}`}>
          <div className="wireframe-cell cell-1">
            <div className="wireframe-line w-long" />
            <div className="wireframe-line w-med" />
          </div>
          <div className="wireframe-image-slot">
            <span className="image-slot-icon">🖼</span>
            <span>{imageSlotText}</span>
          </div>
          <div className="wireframe-cell cell-3">
            <div className="wireframe-line w-short" />
            <div className="wireframe-line w-med" />
          </div>
        </div>

        <div className="card-bottom-actions">
          <button
            type="button"
            className="stage-action-btn"
            onClick={onActionClick}
          >
            <span>{actionText}</span>
            <span className="stage-arrow">→</span>
          </button>
          <span className="mono-spec">READY FOR IMAGES</span>
        </div>
      </div>
    </SpotlightCard>
  );
};
