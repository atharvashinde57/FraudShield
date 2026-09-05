import React, { useState } from 'react';
import { BarChart3, Filter, Calendar, Globe, CreditCard, Store, PieChart as PieIcon } from 'lucide-react';
import { GEO_FRAUD_DISTRIBUTION, TIME_SERIES_FRAUD_DATA } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsView: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedCountry, setSelectedCountry] = useState('ALL');

  const paymentMethodData = [
    { name: 'Credit Card', value: 45, color: '#3b82f6' },
    { name: 'UPI / Realtime', value: 28, color: '#06b6d4' },
    { name: 'Wire Transfer', value: 15, color: '#f59e0b' },
    { name: 'Crypto Swap', value: 8, color: '#ef4444' },
    { name: 'ACH', value: 4, color: '#10b981' },
  ];

  const suspiciousMerchants = [
    { name: 'Luxury Clockwork Vault', category: 'High Value Luxury', incidents: 42, volume: '₹48.2L', risk: '98%' },
    { name: 'Decentralized Exchange X', category: 'Crypto Tumbler', incidents: 38, volume: '₹35.0L', risk: '94%' },
    { name: 'Global FX Liquidity Corp', category: 'Offshore FX', incidents: 29, volume: '$120.4K', risk: '91%' },
    { name: 'TechElectronics Outlet', category: 'Consumer Tech', incidents: 18, volume: '₹12.8L', risk: '76%' },
    { name: 'Digital Gaming Hub', category: 'Digital Goods', incidents: 14, volume: '$18.2K', risk: '68%' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <BarChart3 color="var(--secondary)" size={28} /> Advanced Fraud Analytics
          </h1>
          <p className="page-subtitle">
            Macro risk metrics, geographical threat vectors, and merchant vulnerability intelligence.
          </p>
        </div>

        {/* Global Analytics Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field select-field"
            style={{ width: '160px', height: '36px', fontSize: '0.8rem' }}
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="input-field select-field"
            style={{ width: '160px', height: '36px', fontSize: '0.8rem' }}
          >
            <option value="ALL">All Regions</option>
            <option value="IN">India</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
            <option value="SG">Singapore</option>
          </select>
        </div>
      </div>

      {/* Row 1: Fraud Rate Over Time + Fraud by Payment Method */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.25rem'
      }} className="analytics-grid-row1">

        {/* Fraud Rate Over Time */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Fraud Rate Trajectory
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Hourly breakdown of flagged vs confirmed fraud percentage
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>
              -0.15% vs prior window
            </span>
          </div>

          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SERIES_FRAUD_DATA}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="suspicious" stroke="#f59e0b" fill="rgba(245, 158, 11, 0.2)" name="Suspicious" />
                <Area type="monotone" dataKey="confirmedFraud" stroke="#ef4444" fill="rgba(239, 68, 68, 0.3)" name="Confirmed Fraud" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fraud by Payment Method */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Fraud by Payment Channel
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Percentage contribution by payment rail
          </p>

          <div style={{ height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.5rem' }}>
            {paymentMethodData.map((item) => (
              <div key={item.name} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
                {item.name} ({item.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Fraud by Geo Location (Bar Chart) + Top Suspicious Merchants */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.5fr',
        gap: '1.25rem'
      }} className="analytics-grid-row2">
        
        {/* Fraud by Geo Location */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Threat Velocity by Geo Hub
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Incidents per major metropolitan financial node
          </p>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GEO_FRAUD_DISTRIBUTION}>
                <XAxis dataKey="city" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Bar dataKey="fraudCount" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Fraud Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Suspicious Merchants Table */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            High Risk Merchant Index
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Merchants with elevated chargeback & fraud velocity scores
          </p>

          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Merchant Name</th>
                  <th>Category</th>
                  <th>Incidents</th>
                  <th>Volume</th>
                  <th>Risk Index</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousMerchants.map((m, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{m.name}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>{m.category}</td>
                    <td className="font-mono">{m.incidents}</td>
                    <td className="font-mono" style={{ fontWeight: 600 }}>{m.volume}</td>
                    <td>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: parseInt(m.risk) > 85 ? 'var(--critical)' : 'var(--warning)',
                        background: parseInt(m.risk) > 85 ? 'var(--critical-bg)' : 'var(--warning-bg)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {m.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
