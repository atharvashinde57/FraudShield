import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  SlidersHorizontal, 
  Key, 
  User, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  Terminal,
  Layers
} from 'lucide-react';
import { FraudRule, MOCK_RULES } from '../data/mockData';

interface SettingsViewProps {
  onShowToast: (title: string, message?: string, type?: 'success' | 'danger' | 'warning' | 'info') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'Rules' | 'Thresholds' | 'Security' | 'API' | 'Notifications'>('Rules');
  
  // Risk thresholds state
  const [lowThreshold, setLowThreshold] = useState(30);
  const [medThreshold, setMedThreshold] = useState(60);
  const [highThreshold, setHighThreshold] = useState(80);

  // Fraud rules state
  const [rules, setRules] = useState<FraudRule[]>(MOCK_RULES);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCondition, setNewRuleCondition] = useState('');
  const [newRuleAction, setNewRuleAction] = useState<'BLOCK' | 'FLAG_REVIEW' | 'ALERT_CRITICAL' | 'REQUIRE_2FA'>('BLOCK');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRuleCondition.trim()) return;

    const createdRule: FraudRule = {
      id: `RULE-00${rules.length + 1}`,
      name: newRuleName.trim(),
      condition: newRuleCondition.trim(),
      action: newRuleAction,
      riskIncrement: 25,
      status: 'ACTIVE',
      triggeredCount: 0
    };

    setRules([...rules, createdRule]);
    setNewRuleName('');
    setNewRuleCondition('');
    onShowToast('Custom Rule Created', `Rule ${createdRule.id} activated in detection engine`, 'success');
  };

  const handleToggleRuleStatus = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : r));
    onShowToast('Rule Updated', `Rule status toggled`, 'info');
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    onShowToast('Rule Deleted', `Rule ${id} deleted`, 'warning');
  };

  const handleSaveThresholds = () => {
    onShowToast('Thresholds Updated', 'Global risk scoring brackets saved successfully', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <SettingsIcon color="var(--primary)" size={28} /> System Settings & Rule Engine
          </h1>
          <p className="page-subtitle">
            Configure risk classification thresholds, custom threat detection rules, and API keys.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '0.5rem' }}>
        {(['Rules', 'Thresholds', 'Security', 'API', 'Notifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.65rem 1.1rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {tab === 'Rules' && 'Fraud Rules Engine'}
            {tab === 'Thresholds' && 'Risk Thresholds'}
            {tab === 'Security' && 'Security & Auth'}
            {tab === 'API' && 'API & Webhooks'}
            {tab === 'Notifications' && 'Notifications'}
          </button>
        ))}
      </div>

      {/* Tab Content: Fraud Rules Engine */}
      {activeTab === 'Rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Custom Rule Builder Box */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Create Custom Fraud Rule
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Define logic triggers evaluated during instant payment parsing
            </p>

            <form onSubmit={handleAddRule} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div className="input-group">
                <label className="input-label">Rule Identifier Name</label>
                <input
                  type="text"
                  placeholder="e.g. Midnight High Ticket Anomaly"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Condition Syntax Expression</label>
                <input
                  type="text"
                  placeholder="e.g. AMOUNT > 100000 AND IS_NEW_DEVICE == TRUE"
                  value={newRuleCondition}
                  onChange={(e) => setNewRuleCondition(e.target.value)}
                  className="input-field font-mono"
                  style={{ fontSize: '0.825rem' }}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Automated Action</label>
                <select
                  value={newRuleAction}
                  onChange={(e: any) => setNewRuleAction(e.target.value)}
                  className="input-field select-field"
                >
                  <option value="BLOCK">INSTANT BLOCK</option>
                  <option value="FLAG_REVIEW">FLAG FOR REVIEW</option>
                  <option value="ALERT_CRITICAL">ALERT CRITICAL</option>
                  <option value="REQUIRE_2FA">REQUIRE 2FA</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ gap: '0.4rem', height: '38px' }}>
                <Plus size={16} /> Deploy Rule
              </button>
            </form>
          </div>

          {/* Active Rules List */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Active Rule Engine Rules ({rules.length})
            </h2>

            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Rule Code</th>
                    <th>Rule Name</th>
                    <th>Logic Condition</th>
                    <th>Automated Action</th>
                    <th>Status</th>
                    <th>Trigger Count</th>
                    <th style={{ textAlign: 'right' }}>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id}>
                      <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {rule.id}
                      </td>
                      <td style={{ fontWeight: 600 }}>{rule.name}</td>
                      <td className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                        {rule.condition}
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: rule.action === 'BLOCK' ? 'var(--critical-bg)' : 'rgba(59, 130, 246, 0.15)',
                          color: rule.action === 'BLOCK' ? 'var(--critical)' : 'var(--primary)'
                        }}>
                          {rule.action}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${rule.status === 'ACTIVE' ? 'status-legitimate' : 'status-review'}`}>
                          {rule.status}
                        </span>
                      </td>
                      <td className="font-mono">{rule.triggeredCount}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleToggleRuleStatus(rule.id)}
                            className="btn btn-secondary btn-sm"
                          >
                            {rule.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="btn-icon"
                            style={{ color: 'var(--critical)' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Risk Thresholds */}
      {activeTab === 'Thresholds' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Threat Classification Severity Thresholds
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Adjust mathematical bounds for Low, Medium, High, and Critical fraud score buckets.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Low Bracket */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>LOW RISK BRACKET</span>
                <span className="font-mono" style={{ fontWeight: 700 }}>0 – {lowThreshold} pts</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={lowThreshold}
                onChange={(e) => setLowThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--success)' }}
              />
            </div>

            {/* Medium Bracket */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--warning)' }}>MEDIUM RISK BRACKET</span>
                <span className="font-mono" style={{ fontWeight: 700 }}>{lowThreshold + 1} – {medThreshold} pts</span>
              </div>
              <input
                type="range"
                min="41"
                max="70"
                value={medThreshold}
                onChange={(e) => setMedThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--warning)' }}
              />
            </div>

            {/* High Bracket */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--high)' }}>HIGH RISK BRACKET</span>
                <span className="font-mono" style={{ fontWeight: 700 }}>{medThreshold + 1} – {highThreshold} pts</span>
              </div>
              <input
                type="range"
                min="71"
                max="85"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--high)' }}
              />
            </div>

            {/* Critical Bracket */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--critical)' }}>CRITICAL RISK BRACKET</span>
                <span className="font-mono" style={{ fontWeight: 700 }}>{highThreshold + 1} – 100 pts</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Transactions in this range trigger instant hold and automated SecOps alerts.
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSaveThresholds} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <Save size={16} /> Save Threshold Configurations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: API & Webhooks */}
      {activeTab === 'API' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            API Keys & Real-Time Webhooks
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Production REST API endpoints for bank core transaction ingestion
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group">
              <label className="input-label">Production API Secret Key</label>
              <input
                type="password"
                readOnly
                value="fs_live_99834019283019842918a8b"
                className="input-field font-mono"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Fraud Alert Webhook Endpoint URL</label>
              <input
                type="text"
                defaultValue="https://api.bank-core.com/v1/secops/fraud-webhooks"
                className="input-field font-mono"
              />
            </div>

            <button onClick={() => onShowToast('API Key Regenerated', 'New API secret key generated', 'warning')} className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }}>
              Regenerate Live API Key
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Security */}
      {activeTab === 'Security' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Security & Authentication Preferences
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Manage SecOps team access policies and multi-factor authentication requirements
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              Enforce Hardware WebAuthn YubiKey 2FA for all Tier-3 Analysts
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              Automatically terminate session after 15 minutes of inactivity
            </label>
          </div>
        </div>
      )}

      {/* Tab Content: Notifications */}
      {activeTab === 'Notifications' && (
        <div className="glass-card" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Notification Channels
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Configure alert escalation routes for Slack, PagerDuty, and SMS
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              Dispatch PagerDuty Incident on CRITICAL Risk Score (&gt; 90)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              Send Slack #secops-alerts channel broadcast for high-value fraud
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
