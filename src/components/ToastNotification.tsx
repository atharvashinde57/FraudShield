import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '380px',
      width: '100%',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getToastIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 size={18} color="var(--success)" />;
      case 'danger': return <XCircle size={18} color="var(--critical)" />;
      case 'warning': return <AlertTriangle size={18} color="var(--warning)" />;
      case 'info': default: return <Info size={18} color="var(--primary)" />;
    }
  };

  const getToastBorder = () => {
    switch (toast.type) {
      case 'success': return 'var(--success-border)';
      case 'danger': return 'var(--critical-border)';
      case 'warning': return 'var(--warning-border)';
      case 'info': default: return 'var(--border-active)';
    }
  };

  return (
    <div
      style={{
        pointerEvents: 'auto',
        background: '#0f172a',
        border: `1px solid ${getToastBorder()}`,
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        animation: 'slideIn 0.25s ease-out'
      }}
    >
      <div style={{ marginTop: '0.1rem' }}>{getToastIcon()}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>{toast.title}</div>
        {toast.message && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{toast.message}</div>
        )}
      </div>
      <button onClick={() => onDismiss(toast.id)} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', padding: '0.1rem' }}>
        <X size={14} />
      </button>
    </div>
  );
};
