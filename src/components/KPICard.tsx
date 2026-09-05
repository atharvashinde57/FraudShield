import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositiveTrend?: boolean;
  comparisonPeriod?: string;
  icon: LucideIcon;
  accentColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositiveTrend = true,
  comparisonPeriod = 'vs last 30 days',
  icon: Icon,
  accentColor = 'var(--primary)'
}) => {
  const isUp = change.startsWith('+') || change.includes('↑');

  return (
    <div className="glass-card interactive" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Subtle Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        right: '-15px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: accentColor,
        opacity: 0.12,
        filter: 'blur(20px)'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor
        }}>
          <Icon size={20} />
        </div>
      </div>

      <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', marginBottom: '0.5rem' }} className="font-mono">
        {value}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.2rem',
          fontWeight: 700,
          color: isPositiveTrend ? 'var(--success)' : 'var(--critical)',
          background: isPositiveTrend ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '0.15rem 0.45rem',
          borderRadius: 'var(--radius-sm)'
        }}>
          {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {change}
        </span>
        <span style={{ color: 'var(--text-subtle)', fontSize: '0.775rem' }}>
          {comparisonPeriod}
        </span>
      </div>
    </div>
  );
};
