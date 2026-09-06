import React, { useState } from 'react';
import { 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  Percent, 
  ShieldCheck, 
  ArrowUpRight, 
  Filter, 
  Eye, 
  SearchCode, 
  Ban,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { KPICard } from './KPICard';
import { RiskBadge } from './RiskBadge';
import { Transaction, INITIAL_KPI_DATA, TIME_SERIES_FRAUD_DATA } from '../data/mockData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface DashboardViewProps {
  transactions: Transaction[];
  onNavigate: (view: string) => void;
  onSelectTransaction: (txn: Transaction) => void;
  onBlockTransaction: (txn: Transaction) => void;
  searchQuery?: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  transactions,
  onNavigate,
  onSelectTransaction,
  onBlockTransaction,
  searchQuery
}) => {
  const [timeFilter, setTimeFilter] = useState<'24H' | '7D' | '30D' | '90D'>('24H');

  // Filter suspicious/critical recent transactions by search query
  const query = searchQuery?.toLowerCase().trim();
  const recentSuspicious = transactions.filter(t => {
    if (!query) return true;
    return (
      t.id.toLowerCase().includes(query) ||
      t.customerName.toLowerCase().includes(query) ||
      t.customerId.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.merchant.toLowerCase().includes(query) ||
      t.paymentMethod.toLowerCase().includes(query) ||
      t.formattedAmount.toLowerCase().includes(query)
    );
  }).slice(0, 6);

  // Donut distribution data
  const riskDistributionData = [
    { name: 'LOW (0-30)', value: 104200, color: '#10b981' },
    { name: 'MEDIUM (31-60)', value: 18500, color: '#f59e0b' },
    { name: 'HIGH (61-80)', value: 4500, color: '#f97316' },
    { name: 'CRITICAL (81-100)', value: 1284, color: '#ef4444' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity color="var(--primary)" size={28} /> Fraud Detection Overview
          </h1>
          <p className="page-subtitle">
            Real-time monitoring of transaction risk, anomaly detection, and suspicious activity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => onNavigate('transactions')} className="btn btn-secondary btn-sm">
            View All Transactions
          </button>
          <button onClick={() => onNavigate('alerts')} className="btn btn-danger btn-sm">
            <AlertTriangle size={14} /> Critical Alerts Queue
          </button>
        </div>
      </div>

      {/* KPI Cards Row (5 Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem'
      }}>
        <KPICard
          title="Total Transactions"
          value={INITIAL_KPI_DATA.totalVolume}
          change={INITIAL_KPI_DATA.totalVolumeChange}
          icon={DollarSign}
          accentColor="var(--primary)"
        />
        <KPICard
          title="Transactions Monitored"
          value={INITIAL_KPI_DATA.monitoredCount}
          change={INITIAL_KPI_DATA.monitoredChange}
          icon={Activity}
          accentColor="var(--secondary)"
        />
        <KPICard
          title="Fraud Detected"
          value={INITIAL_KPI_DATA.fraudDetected}
          change={INITIAL_KPI_DATA.fraudDetectedChange}
          isPositiveTrend={false}
          icon={AlertTriangle}
          accentColor="var(--critical)"
        />
        <KPICard
          title="Fraud Rate"
          value={INITIAL_KPI_DATA.fraudRate}
          change={INITIAL_KPI_DATA.fraudRateChange}
          isPositiveTrend={true}
          icon={Percent}
          accentColor="var(--warning)"
        />
        <KPICard
          title="Prevented Loss"
          value={INITIAL_KPI_DATA.preventedLoss}
          change={INITIAL_KPI_DATA.preventedLossChange}
          icon={ShieldCheck}
          accentColor="var(--success)"
        />
      </div>

      {/* Main Charts Section (Fraud Activity + Risk Distribution) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.2fr 1fr',
        gap: '1.25rem'
      }} className="dashboard-charts-grid">
        
        {/* Fraud Activity Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Fraud Activity Stream
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Comparison of Legitimate vs Suspicious vs Confirmed Fraud volume
              </p>
            </div>

            {/* Time filters 24H | 7D | 30D | 90D */}
            <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '0.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              {(['24H', '7D', '30D', '90D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: timeFilter === tf ? 'var(--primary)' : 'transparent',
                    color: timeFilter === tf ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SERIES_FRAUD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="legitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="suspGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}
                />
                <Area type="monotone" dataKey="legitimate" stroke="#3b82f6" fillOpacity={1} fill="url(#legitGrad)" name="Legitimate" />
                <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fillOpacity={1} fill="url(#suspGrad)" name="Suspicious" />
                <Area type="monotone" dataKey="confirmedFraud" stroke="#ef4444" fillOpacity={1} fill="url(#critGrad)" name="Confirmed Fraud" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Radial/Donut */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Risk Score Distribution
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Transaction volume by threat severity bracket
            </p>

            <div style={{ height: '200px', position: 'relative', marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }} className="font-mono">128.4K</div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>TOTAL EVAL</div>
              </div>
            </div>
          </div>

          {/* Legend Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
            {riskDistributionData.map((item) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color }} />
                <span>{item.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Suspicious Transactions Table */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Recent Suspicious Transactions
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Transactions with Risk Score &gt; 60 requiring security analyst action
            </p>
          </div>
          <button onClick={() => onNavigate('transactions')} className="btn btn-outline btn-sm">
            View Full Table <ChevronRight size={14} />
          </button>
        </div>

        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Location</th>
                <th>Payment Method</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentSuspicious.map((txn) => (
                <tr key={txn.id}>
                  <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {txn.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{txn.customerName}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>{txn.customerId}</div>
                  </td>
                  <td className="font-mono" style={{ fontWeight: 700 }}>
                    {txn.formattedAmount}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.825rem' }}>
                      <MapPin size={13} color="var(--text-subtle)" /> {txn.location}
                    </div>
                  </td>
                  <td>{txn.paymentMethod}</td>
                  <td>
                    <RiskBadge score={txn.riskScore} level={txn.riskLevel} />
                  </td>
                  <td>
                    <span className={`status-pill status-${txn.status.toLowerCase().replace(' ', '-')}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} /> {txn.timestamp}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => { onSelectTransaction(txn); onNavigate('transaction-detail'); }}
                        className="btn-icon"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => { onSelectTransaction(txn); onNavigate('investigate'); }}
                        className="btn-icon"
                        style={{ color: 'var(--secondary)' }}
                        title="Open Investigation Workspace"
                      >
                        <SearchCode size={15} />
                      </button>
                      <button
                        onClick={() => onBlockTransaction(txn)}
                        className="btn-icon"
                        style={{ color: 'var(--critical)' }}
                        title="Block Transaction"
                      >
                        <Ban size={15} />
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
  );
};
