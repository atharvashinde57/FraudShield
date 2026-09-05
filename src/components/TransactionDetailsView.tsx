import React from 'react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  MapPin, 
  Smartphone, 
  Globe, 
  Clock, 
  CreditCard, 
  Store, 
  Ban, 
  CheckCircle, 
  SearchCode,
  AlertTriangle
} from 'lucide-react';
import { Transaction } from '../data/mockData';
import { RiskBadge } from './RiskBadge';

interface TransactionDetailsViewProps {
  transaction: Transaction;
  onNavigate: (view: string) => void;
  onBlockTransaction: (txn: Transaction) => void;
  onApproveTransaction: (txn: Transaction) => void;
}

export const TransactionDetailsView: React.FC<TransactionDetailsViewProps> = ({
  transaction,
  onNavigate,
  onBlockTransaction,
  onApproveTransaction
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back button & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => onNavigate('transactions')} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Back to Monitoring Table
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate('investigate')}
            className="btn btn-secondary btn-sm"
          >
            <SearchCode size={16} color="var(--secondary)" /> Open Investigation Workspace
          </button>
          <button
            onClick={() => onApproveTransaction(transaction)}
            className="btn btn-success btn-sm"
          >
            <CheckCircle size={16} /> Approve & Mark Safe
          </button>
          <button
            onClick={() => onBlockTransaction(transaction)}
            className="btn btn-danger btn-sm"
          >
            <Ban size={16} /> Block Transaction
          </button>
        </div>
      </div>

      {/* Main Details Banner Card */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }} className="font-mono">
                {transaction.id}
              </h1>
              <RiskBadge score={transaction.riskScore} level={transaction.riskLevel} />
              <span className={`status-pill status-${transaction.status.toLowerCase().replace(' ', '-')}`}>
                {transaction.status}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Initiated by <strong>{transaction.customerName}</strong> ({transaction.customerId})
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              TRANSACTION AMOUNT
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)' }} className="font-mono">
              {transaction.formattedAmount}
            </div>
          </div>
        </div>

        {/* Core Attributes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Store size={14} /> MERCHANT
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{transaction.merchant}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CreditCard size={14} /> PAYMENT METHOD
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{transaction.paymentMethod}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} /> GEOLOCATION
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{transaction.location}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Smartphone size={14} /> DEVICE FINGERPRINT
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{transaction.device}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Globe size={14} /> MASKED IP ADDRESS
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }} className="font-mono">{transaction.ipAddress}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} /> TIMESTAMP
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{transaction.timestamp}</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Risk Analysis + Transaction Timeline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: '1.5rem'
      }} className="transaction-details-grid">

        {/* Risk Factor Analysis */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Risk Analysis Breakdown
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Individual risk factor contribution weight computed by ML Model v2.4.1
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL RISK SCORE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: transaction.riskScore > 80 ? 'var(--critical)' : 'var(--warning)' }} className="font-mono">
                {transaction.riskScore} / 100
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {transaction.riskFactors.map((factor, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{factor.factor}</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }} className="font-mono">+{factor.score} pts</span>
                </div>
                {/* Horizontal Progress Indicator */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(factor.score / 40) * 100}%`,
                    height: '100%',
                    background: factor.score > 25 ? 'linear-gradient(90deg, #f97316 0%, #ef4444 100%)' : 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Model Note */}
          <div style={{
            marginTop: '1.75rem',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid var(--critical-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem'
          }}>
            <AlertTriangle size={18} color="var(--critical)" style={{ marginTop: '0.1rem' }} />
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--critical)' }}>High Fraud Probability Triggered:</strong> Geolocation distance change exceeds 500km within 15 minutes of prior device registration.
            </div>
          </div>
        </div>

        {/* Transaction Timeline */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Transaction Timeline
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Chronological audit events
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.5rem' }}>
            {/* Timeline Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'var(--border-color)'
            }} />

            {transaction.timeline.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Node Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: idx === transaction.timeline.length - 1 ? 'var(--critical)' : 'var(--primary)',
                  boxShadow: idx === transaction.timeline.length - 1 ? '0 0 8px var(--critical)' : 'none'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)' }} className="font-mono">
                  {item.time}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 500, marginTop: '0.1rem' }}>
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
