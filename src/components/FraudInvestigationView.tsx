import React, { useState } from 'react';
import { 
  SearchCode, 
  User, 
  ShieldAlert, 
  Clock, 
  Ban, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Send, 
  Calendar, 
  History, 
  Activity,
  Layers
} from 'lucide-react';
import { Transaction, CustomerProfile, MOCK_CUSTOMERS } from '../data/mockData';
import { RiskBadge } from './RiskBadge';

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
  const [analystNotes, setAnalystNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  // Find corresponding customer profile
  const customer: CustomerProfile = MOCK_CUSTOMERS.find(c => c.id === transaction.customerId) || {
    id: transaction.customerId,
    name: transaction.customerName,
    email: 'user@example.com',
    country: transaction.country,
    accountAgeMonths: 18,
    totalTransactions: 94,
    totalVolume: '₹14.2L',
    fraudAttempts: 2,
    riskLevel: transaction.riskLevel,
    accountStatus: 'Flagged',
    devices: [transaction.device, 'iPhone 14 Pro'],
    knownLocations: [transaction.location, 'Pune, IN'],
    recentActivity: 'Under active security review'
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setAnalystNotes([`[${new Date().toLocaleTimeString()}] ${newNote.trim()}`, ...analystNotes]);
    setNewNote('');
    onShowToast('Note Added', 'Analyst case note logged successfully', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <SearchCode color="var(--secondary)" size={28} /> Fraud Investigation Workspace
          </h1>
          <p className="page-subtitle">
            Case file review for Target Transaction <strong className="font-mono">{transaction.id}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onShowToast('Escalated Case', 'Case escalated to Senior SecOps Lead', 'warning')}
            className="btn btn-secondary btn-sm"
          >
            <AlertTriangle size={14} color="var(--warning)" /> Escalate Case
          </button>
          <button
            onClick={() => {
              onShowToast('False Positive Marked', 'Transaction updated to False Positive', 'success');
              onApproveTransaction(transaction);
            }}
            className="btn btn-outline btn-sm"
          >
            Mark False Positive
          </button>
        </div>
      </div>

      {/* 3-Panel Grid Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1.1fr',
        gap: '1.25rem'
      }} className="investigation-3panel-grid">
        
        {/* Left Panel: Customer Information */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
              CUSTOMER RISK PROFILE
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#fff',
                fontSize: '1rem'
              }}>
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {customer.name}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="font-mono">
                  {customer.id} • {customer.email}
                </div>
              </div>
            </div>
          </div>

          {/* Stats List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Account Status:</span>
              <span style={{ fontWeight: 700, color: customer.accountStatus === 'Frozen' ? 'var(--critical)' : 'var(--warning)' }}>
                {customer.accountStatus}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Account Tenure:</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{customer.accountAgeMonths} months</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Prior Fraud Incidents:</span>
              <span style={{ fontWeight: 800, color: customer.fraudAttempts > 0 ? 'var(--critical)' : 'var(--success)' }} className="font-mono">
                {customer.fraudAttempts} incidents
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Overall Risk Level:</span>
              <RiskBadge score={transaction.riskScore} level={customer.riskLevel} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Volume:</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }} className="font-mono">{customer.totalVolume}</span>
            </div>
          </div>

          {/* Known Devices & Locations */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>
              REGISTERED DEVICES ({customer.devices.length})
            </div>
            <ul style={{ paddingLeft: '1.1rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              {customer.devices.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Panel: Transaction Audit History */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
              CASE TIMELINE & AUDIT LOG
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }} className="font-mono">
              TXN: {transaction.id}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
            {transaction.timeline.map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                padding: '0.75rem',
                borderRadius: '8px',
                display: 'flex',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0
                }}>
                  <Clock size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)' }} className="font-mono">
                    {item.time}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>
                    {item.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Risk Assessment & Analyst Decision */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 800, color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
                AI RISK RECOMMENDATION
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: transaction.riskScore > 80 ? 'var(--critical)' : 'var(--warning)' }} className="font-mono">
                  SCORE {transaction.riskScore} / 100
                </span>
                <span style={{
                  background: 'var(--critical-bg)',
                  color: 'var(--critical)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  border: '1px solid var(--critical-border)'
                }}>
                  ACTION: BLOCK RECOMMENDED
                </span>
              </div>
            </div>

            {/* Analyst Case Notes */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <FileText size={14} /> Analyst Case Notes ({analystNotes.length})
              </div>

              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Add case observation..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={13} />
                </button>
              </form>

              <div style={{ maxHeight: '130px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {analystNotes.map((note, idx) => (
                  <div key={idx} style={{ fontSize: '0.775rem', color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.03)', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decision Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => onBlockTransaction(transaction)}
              className="btn btn-danger btn-lg"
              style={{ width: '100%', gap: '0.5rem' }}
            >
              <Ban size={18} /> CONFIRM BLOCK TRANSACTION
            </button>
            <button
              onClick={() => onApproveTransaction(transaction)}
              className="btn btn-success"
              style={{ width: '100%', gap: '0.5rem' }}
            >
              <CheckCircle size={18} /> APPROVE TRANSACTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
