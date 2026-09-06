import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  variant?: 'danger' | 'primary' | 'success';
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  variant = 'danger',
  confirmText = 'Confirm',
  onConfirm,
  onClose
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return { bg: 'var(--danger-glow)', btnBg: 'var(--danger)', iconColor: 'var(--danger)' };
      case 'success':
        return { bg: 'var(--success-glow)', btnBg: 'var(--success)', iconColor: 'var(--success)' };
      default:
        return { bg: 'var(--primary-glow)', btnBg: 'var(--primary)', iconColor: 'var(--primary)' };
    }
  };

  const style = getVariantStyles();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle style={{ color: style.iconColor, width: 22, height: 22 }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5 }}>
          {message}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          background: 'var(--bg-subtle)',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn"
            style={{
              background: style.btnBg,
              color: '#ffffff',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
