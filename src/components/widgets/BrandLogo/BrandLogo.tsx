import './BrandLogo.css';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export const BrandLogo = ({ className = '', size = 28 }: BrandLogoProps) => {
  return (
    <div className={`brand-logo-container ${className}`}>
      {/* Sleek Minimalist Tech Icon (Code Slash Node) */}
      <div className="brand-glyph" style={{ width: size, height: size }}>
        <img
          src="/favicon/logo-1.png"
          alt="pandacodes"
          className="brand-logo-image"
          width={size}
          height={size}
          style={{ height: size, width: size }}
        />
        <span className="brand-wordmark"> pandacodes</span>
      </div>


    </div>
  );
};
