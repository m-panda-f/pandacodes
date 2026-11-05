import './TickerBar.css';

interface TickerBarProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  'pandacodes // DIGITAL PRODUCTS & ENGINEERING',
  'MODERN WEB ARCHITECTURE',
  'HIGH-PERFORMANCE INTERFACES',
  'BESPOKE DESIGN SYSTEMS',
  'FULL-STACK CLOUD EXECUTION',
  'AVAILABLE FOR SELECT COMMISSIONS',
];

export const TickerBar = ({
  items = DEFAULT_ITEMS,
  className = '',
}: TickerBarProps) => {
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className={`ticker-wrapper ${className}`}>
      <div className="ticker-track animate-marquee">
        {repeatedItems.map((item, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-dot">✦</span>
            <span className="ticker-label">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
