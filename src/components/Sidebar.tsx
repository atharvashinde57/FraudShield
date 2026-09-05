import React from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  AlertTriangle, 
  SearchCode, 
  Users, 
  BarChart3, 
  Cpu, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  criticalAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  criticalAlertCount
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { id: 'alerts', label: 'Fraud Alerts', icon: AlertTriangle, badge: criticalAlertCount },
    { id: 'investigate', label: 'Investigations', icon: SearchCode },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'model-performance', label: 'Model Performance', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: collapsed ? '72px' : '250px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s ease',
      zIndex: 90,
      position: 'relative',
      flexShrink: 0
    }}>
      {/* Collapse button */}
      <button
        onClick={onToggleCollapse}
        style={{
          position: 'absolute',
          right: '-12px',
          top: '20px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-light)',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav List */}
      <nav style={{ padding: '1.25rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || (currentView === 'transaction-detail' && item.id === 'transactions');
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.7rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.05) 100%)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                border: 'none',
                borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
              className="sidebar-item"
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} color={isActive ? 'var(--primary)' : 'var(--text-subtle)'} />
              {!collapsed && (
                <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
              {item.badge !== undefined && item.badge > 0 && (
                <span style={{
                  background: 'var(--critical)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.1rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 0 6px var(--critical-glow)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Banner */}
      {!collapsed && (
        <div style={{
          padding: '1rem',
          margin: '0.75rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(16, 185, 129, 0.06)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', fontWeight: 700, color: 'var(--success)' }}>
            <span className="pulse-dot pulse-dot-green"></span> FraudEngine v2.4 Active
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Latency: 14ms | TPS: 2,410
          </div>
        </div>
      )}
    </aside>
  );
};
