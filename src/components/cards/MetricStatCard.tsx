import { SpotlightCard } from './SpotlightCard';
import './MetricStatCard.css';

interface MetricStatCardProps {
  label: string;
  value: string;
  subtext: string;
  code?: string;
}

export const MetricStatCard = ({
  label,
  value,
  subtext,
  code = 'STAT // 01',
}: MetricStatCardProps) => {
  return (
    <SpotlightCard className="metric-stat-card">
      <div className="metric-header">
        <span className="mono-tag">{code}</span>
        <span className="metric-dot">✦</span>
      </div>
      <div className="metric-value-wrapper">
        <span className="metric-value">{value}</span>
      </div>
      <div className="metric-footer">
        <h4 className="metric-label">{label}</h4>
        <p className="metric-subtext">{subtext}</p>
      </div>
    </SpotlightCard>
  );
};
