import React, { useState } from 'react';
import { Transaction } from '../data/mockData';
import { RiskBadge } from './RiskBadge';
import { Shield, ShieldAlert, ArrowLeft, CheckCircle, Ban, Cpu, Activity } from 'lucide-react';

interface FraudInvestigationViewProps {
  transaction: Transaction;
  onNavigate: (view: string) => void;
  onBlockTransaction: (txn: Transaction) => void;
  onApproveTransaction: (txn: Transaction) => void;
  onShowToast: (title: string, message?: string, type?: 'success' | 'danger' | 'warning' | 'info') => void;
}

export const FraudInvestigationView: React.FC<FraudInvestigationViewProps> = ({
  transaction,
  onNavigate,
  onBlockTransaction,
  onApproveTransaction,
  onShowToast
}) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="view-container">
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button
            onClick={() => onNavigate('transactions')}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
          >
            <ArrowLeft size={16} /> Back to Monitoring
          </button>
          <h1 className="view-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cpu className="text-primary" /> SecOps Fraud Investigation Canvas
          </h1>
          <p className="view-subtitle">Deep transaction packet & forensic telemetry analysis</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onApproveTransaction(transaction)}
            className="btn btn-success"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <CheckCircle size={16} /> Mark Legitimate
          </button>
          <button
            onClick={() => onBlockTransaction(transaction)}
            className="btn btn-danger"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Ban size={16} /> Block & Report
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Transaction Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="font-mono text-muted" style={{ fontSize: '0.85rem' }}>TXN ID: {transaction.id}</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0' }}>{transaction.formattedAmount}</h2>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-subtle)' }}>Merchant: {transaction.merchant}</span>
              </div>
              <RiskBadge level={transaction.riskLevel} score={transaction.riskScore} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <span className="text-subtle" style={{ fontSize: '0.75rem' }}>Customer</span>
                <p style={{ fontWeight: 600, margin: '0.25rem 0' }}>{transaction.customerName}</p>
                <span className="font-mono text-muted" style={{ fontSize: '0.75rem' }}>{transaction.customerId}</span>
              </div>

              <div>
                <span className="text-subtle" style={{ fontSize: '0.75rem' }}>Location / IP</span>
                <p style={{ fontWeight: 600, margin: '0.25rem 0' }}>{transaction.location}</p>
                <span className="font-mono text-muted" style={{ fontSize: '0.75rem' }}>{transaction.ipAddress}</span>
              </div>

              <div>
                <span className="text-subtle" style={{ fontSize: '0.75rem' }}>Payment Method</span>
                <p style={{ fontWeight: 600, margin: '0.25rem 0' }}>{transaction.paymentMethod}</p>
                <span className="font-mono text-muted" style={{ fontSize: '0.75rem' }}>Device: {transaction.device}</span>
              </div>
            </div>
          </div>

          {/* Machine Learning / Rules Telemetry */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity className="text-primary" size={18} /> Spring Boot Fraud Engine Risk Factor Breakdown
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-subtle)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
                <strong style={{ fontSize: '0.875rem' }}>Rule #102: Velocity Spiking Anomaly</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                  Multiple high-value transactions triggered within 120s window from same device fingerprint.
                </p>
              </div>

              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-subtle)', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
                <strong style={{ fontSize: '0.875rem' }}>Rule #404: Impossible Travel Geolocation</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                  IP route mapped to Tor Exit Node / Proxy network outside habitual customer geo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analyst Notes Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert className="text-warning" size={18} /> SecOps Analyst Case Notes
            </h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Record forensic observation, IP lookup, or customer verification details..."
              style={{
                width: '100%',
                height: '140px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                resize: 'none',
                marginBottom: '1rem'
              }}
            />
            <button
              onClick={() => {
                onShowToast('Forensic Note Saved', 'Investigation log appended to case file.', 'info');
                setNotes('');
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Save Analyst Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
