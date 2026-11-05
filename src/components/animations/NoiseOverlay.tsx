import './NoiseOverlay.css';

export const NoiseOverlay = () => {
  return (
    <div className="noise-overlay" aria-hidden="true">
      <svg className="noise-svg">
        <filter id="panda-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#panda-noise)" />
      </svg>
    </div>
  );
};
