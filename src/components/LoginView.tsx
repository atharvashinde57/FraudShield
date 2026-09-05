import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, KeyRound, Globe, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('analyst@fraudshield.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      background: '#070b14',
      overflow: 'hidden'
    }}>
      {/* Left Visual Banner */}
      <div style={{
        flex: 1.2,
        background: 'radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.4) 0%, rgba(9, 13, 26, 0.95) 70%)',
        borderRight: '1px solid var(--border-color)',
        padding: '4rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }} className="login-left-banner">
        {/* Animated Cyber Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6
        }} />

        {/* Floating Glowing Nodes */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '60%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'rgba(6, 182, 212, 0.15)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.18)',
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }} />

        {/* Top Logo */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)'
          }}>
            <Shield size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Fraud<span style={{ color: 'var(--primary)' }}>Shield</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ENTERPRISE SECURITY PLATFORM
            </p>
          </div>
        </div>

        {/* Center Tagline & Stats Visual */}
        <div style={{ position: 'relative', zIndex: 2, margin: '3rem 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={14} /> AI-Powered Fraud Intelligence v2.4
          </div>

          <h2 style={{ fontSize: '2.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
            Detect threats before <br />
            <span style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              they become losses.
            </span>
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Real-time transaction risk scoring, automated fraud mitigation, and deep analyst investigation workflows built for enterprise banking.
          </p>

          {/* Abstract Security Matrix Widget */}
          <div className="glass-card" style={{ marginTop: '2.5rem', maxWidth: '440px', padding: '1.25rem', background: 'rgba(15, 23, 42, 0.7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>LIVE THREAT ENGINE</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span className="pulse-dot pulse-dot-green"></span> 99.98% Uptime
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }} className="font-mono">14ms</div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-subtle)' }}>Avg Latency</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success)' }} className="font-mono">96.8%</div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-subtle)' }}>Accuracy</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }} className="font-mono">₹8.4M</div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-subtle)' }}>Loss Prevented</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '1.5rem', color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
          <span>SOC2 Type II Certified</span>
          <span>•</span>
          <span>ISO 27001 Compliant</span>
          <span>•</span>
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        background: '#090d16'
      }}>
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Analyst Portal
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Sign in to access real-time fraud monitoring & response workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Field */}
            <div className="input-group">
              <label className="input-label">Work Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="analyst@bank.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                Remember this workstation
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              Authenticate & Launch Portal <ArrowRight size={18} />
            </button>

            {/* SSO Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', color: 'var(--text-subtle)', fontSize: '0.75rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
              <span style={{ padding: '0 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            </div>

            {/* Continue with SSO */}
            <button
              type="button"
              onClick={onLoginSuccess}
              className="btn btn-secondary"
              style={{ width: '100%', gap: '0.6rem' }}
            >
              <KeyRound size={16} color="var(--secondary)" /> Continue with Enterprise SSO (Okta / Azure)
            </button>
          </form>

          {/* Quick Demo Access Note */}
          <div style={{
            marginTop: '2rem',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px border-light',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            🔐 Demo mode pre-configured. Click <strong>Authenticate</strong> to access SecOps workspace instantly.
          </div>
        </div>
      </div>
    </div>
  );
};
