import './AmbientBackdrop.css';

export const AmbientBackdrop = () => {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      {/* Top Monochromatic Radial Light Glow */}
      <div className="ambient-radial glow-top animate-pulse-glow" />

      {/* Secondary Depth Bloom */}
      <div className="ambient-radial glow-bottom" />

      {/* Precision Grid Matrix */}
      <div className="ambient-grid" />

      {/* Linear Horizon Accent */}
      <div className="ambient-horizon" />
    </div>
  );
};
