import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  SearchCode, 
  Ban, 
  CheckCircle, 
  Clock, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { FraudAlert, Transaction } from '../data/mockData';
import { RiskBadge } from './RiskBadge';

interface FraudAlertsViewProps {
  alerts: FraudAlert[];
  transactions: Transaction[];
  onNavigate: (view: string) => void;
  onSelectTransaction: (txn: Transaction) => void;
  onBlockTransaction: (txn: Transaction) => void;
  onResolveAlert: (alertId: string) => void;
  searchQuery?: string;
}

export const FraudAlertsView: React.FC<FraudAlertsViewProps> = ({
  alerts,
  transactions,
  onNavigate,
  onSelectTransaction,
  onBlockTransaction,
  onResolveAlert,
  searchQuery
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Critical' | 'High Risk' | 'Under Investigation' | 'Resolved'>('All');

  const query = searchQuery?.toLowerCase().trim();

  const filteredAlerts = alerts.filter(a => {
    const matchesTab = activeTab === 'All' || a.status === activeTab;
    const matchesQuery = !query ||
      a.id.toLowerCase().includes(query) ||
      a.alertCode.toLowerCase().includes(query) ||
      a.customerName.toLowerCase().includes(query) ||
      a.transactionId.toLowerCase().includes(query) ||
      a.reasons.some(r => r.toLowerCase().includes(query));

    return matchesTab && matchesQuery;
  });

  const getTabCount = (tab: string) => {
    if (tab === 'All') return alerts.length;
    return alerts.filter(a => a.status === tab).length;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <AlertTriangle color="var(--critical)" size={28} /> Real-Time Fraud Alerts
          </h1>
          <p className="page-subtitle">
            Centralized queue of triggered threat rules and high-risk transactional alerts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(['All', 'Critical', 'High Risk', 'Under Investigation', 'Resolved'] as const).map((tab) => {
          const count = getTabCount(tab);
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.65rem 1.1rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
              <span style={{
                fontSize: '0.725rem',
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-elevated)',
                color: isActive ? 'var(--primary)' : 'var(--text-subtle)'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alert Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '1.25rem'
      }}>
        {filteredAlerts.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle size={36} color="var(--success)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>No Alerts Found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              There are currently no alerts matching the selected category.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const relatedTxn = transactions.find(t => t.id === alert.transactionId);
            return (
              <div 
                key={alert.id}
                className="glass-card interactive"
                style={{
                  borderLeft: alert.status === 'Critical' 
                    ? '4px solid var(--critical)' 
                    : alert.status === 'High Risk' 
                      ? '4px solid var(--high)' 
                      : '4px solid var(--primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Alert Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      color: alert.status === 'Critical' ? 'var(--critical)' : 'var(--warning)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <ShieldAlert size={14} /> {alert.alertCode}
                    </span>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {alert.timestamp}
                    </span>
                  </div>

                  {/* Customer & Transaction info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {alert.customerName}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }} className="font-mono">
                        {alert.transactionId} • {alert.amount}
                      </div>
                    </div>
                    <RiskBadge score={alert.riskScore} level={alert.riskLevel} />
                  </div>

                  {/* Detection Reasons */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      DETECTION TRIGGER REASONS:
                    </div>
                    <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {alert.reasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => {
                      if (relatedTxn) onSelectTransaction(relatedTxn);
                      onNavigate('investigate');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, gap: '0.3rem' }}
                  >
                    <SearchCode size={14} color="var(--secondary)" /> Investigate
                  </button>
                  <button
                    onClick={() => {
                      if (relatedTxn) onBlockTransaction(relatedTxn);
                    }}
                    className="btn btn-danger btn-sm"
                    style={{ flex: 1, gap: '0.3rem' }}
                  >
                    <Ban size={14} /> Block
                  </button>
                  <button
                    onClick={() => onResolveAlert(alert.id)}
                    className="btn btn-outline btn-sm"
                    style={{ gap: '0.3rem' }}
                    title="Mark Safe & Resolve Alert"
                  >
                    <CheckCircle size={14} color="var(--success)" /> Safe
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
