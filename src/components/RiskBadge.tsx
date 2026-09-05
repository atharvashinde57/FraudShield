import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  score: number;
  level?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ score, level, showScore = true }) => {
  let computedLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = level || 'LOW';
  if (!level) {
    if (score >= 81) computedLevel = 'CRITICAL';
    else if (score >= 61) computedLevel = 'HIGH';
    else if (score >= 31) computedLevel = 'MEDIUM';
    else computedLevel = 'LOW';
  }

  const getBadgeClass = () => {
    switch (computedLevel) {
      case 'CRITICAL': return 'risk-badge risk-badge-critical';
      case 'HIGH': return 'risk-badge risk-badge-high';
      case 'MEDIUM': return 'risk-badge risk-badge-medium';
      case 'LOW': default: return 'risk-badge risk-badge-low';
    }
  };

  const getIcon = () => {
    switch (computedLevel) {
      case 'CRITICAL': return <ShieldAlert size={12} />;
      case 'HIGH': return <AlertTriangle size={12} />;
      case 'MEDIUM': return <AlertCircle size={12} />;
      case 'LOW': default: return <ShieldCheck size={12} />;
    }
  };

  return (
    <span className={getBadgeClass()}>
      {getIcon()}
      <span>{computedLevel}</span>
      {showScore && <span style={{ opacity: 0.9, marginLeft: '0.15rem' }}>({score})</span>}
    </span>
  );
};
