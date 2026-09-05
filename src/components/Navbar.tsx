import React, { useState } from 'react';
import { Shield, Search, Bell, Sun, Moon, Radio, AlertTriangle, X } from 'lucide-react';
import type { FraudAlert } from '../data/mockData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isLiveStreaming: boolean;
  onToggleLiveStream: () => void;
  alerts: FraudAlert[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  theme,
  onToggleTheme,
  isLiveStreaming,
  onToggleLiveStream,
  alerts,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const criticalAlertsCount = alerts.filter(a => a.status === 'Critical').length;

  return (
    <header className="navbar-header" style={{
      height: '64px',
      background: 'var(--bg-sidebar)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div 
          onClick={() => onNavigate('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
          }}>
            <Shield size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Fraud<span style={{ color: 'var(--primary)' }}>Shield</span>
              <span style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'var(--primary)',
                padding: '0.15rem 0.4rem',
                borderRadius: '4px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>ENTERPRISE</span>
            </div>
          </div>
        </div>

        {/* Quick Search */}
        <div style={{ position: 'relative', width: '320px' }} className="nav-search-container">
          <Search size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search TXN ID, customer, location..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.3rem', height: '36px', fontSize: '0.825rem' }}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Live Transaction Stream Toggle */}
        <button
          onClick={onToggleLiveStream}
          className="btn btn-sm"
          style={{
            background: isLiveStreaming ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-elevated)',
            color: isLiveStreaming ? 'var(--success)' : 'var(--text-muted)',
            border: isLiveStreaming ? '1px solid var(--success-border)' : '1px solid var(--border-color)',
            gap: '0.4rem'
          }}
          title={isLiveStreaming ? "Live Feed Streaming Active" : "Stream Paused"}
        >
          <Radio size={14} className={isLiveStreaming ? "pulse-dot-green" : ""} />
          <span style={{ fontSize: '0.775rem' }}>{isLiveStreaming ? "LIVE FEED ACTIVE" : "PAUSED"}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="btn-icon"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
        </button>

        {/* Notifications Drawer Toggle */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-icon"
            style={{ position: 'relative' }}
            title="Notifications"
          >
            <Bell size={18} />
            {criticalAlertsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                background: 'var(--critical)',
                color: '#fff',
                borderRadius: '50%',
                fontSize: '0.65rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px var(--critical)'
              }}>
                {criticalAlertsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '360px',
              zIndex: 200,
              padding: '1rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={16} color="var(--warning)" /> Security Notifications
                </div>
                <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {alerts.slice(0, 4).map(alert => (
                  <div key={alert.id} 
                    onClick={() => { onNavigate('alerts'); setShowNotifications(false); }}
                    style={{
                      padding: '0.65rem',
                      background: alert.status === 'Critical' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      borderLeft: alert.status === 'Critical' ? '3px solid var(--critical)' : '3px solid var(--warning)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      <span>{alert.alertCode}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {alert.customerName} - Risk Score <span style={{ fontWeight: 700, color: alert.riskScore > 90 ? 'var(--critical)' : 'var(--warning)' }}>{alert.riskScore}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { onNavigate('alerts'); setShowNotifications(false); }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                View All Fraud Alerts
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--primary)'
            }}>
              SA
            </div>
            <div style={{ textAlign: 'left' }} className="nav-profile-info">
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>Senior Analyst</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SecOps Tier-3</div>
            </div>
          </button>

          {showProfile && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '200px',
              zIndex: 200,
              padding: '0.75rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                Signed in as <strong>analyst@fraudshield.ai</strong>
              </div>
              <button 
                onClick={() => { onNavigate('settings'); setShowProfile(false); }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.4rem' }}
              >
                Security Settings
              </button>
              <button 
                onClick={() => { onNavigate('login'); setShowProfile(false); }}
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
