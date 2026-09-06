import React, { useState } from 'react';
import { Users, Search, Globe, ShieldAlert, Smartphone, MapPin, Eye, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { CustomerProfile, MOCK_CUSTOMERS } from '../data/mockData';
import { RiskBadge } from './RiskBadge';

interface CustomersViewProps {
  onNavigate: (view: string) => void;
  globalSearchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ 
  onNavigate, 
  globalSearchQuery, 
  onSearchChange 
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  const activeQuery = (globalSearchQuery !== undefined && globalSearchQuery !== '' 
    ? globalSearchQuery 
    : localSearchQuery
  ).toLowerCase().trim();

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    !activeQuery ||
    c.name.toLowerCase().includes(activeQuery) ||
    c.email.toLowerCase().includes(activeQuery) ||
    c.id.toLowerCase().includes(activeQuery) ||
    c.country.toLowerCase().includes(activeQuery) ||
    c.accountStatus.toLowerCase().includes(activeQuery)
  );

  const handleQueryChange = (val: string) => {
    setLocalSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Users color="var(--primary)" size={28} /> Customer Risk Profiling
          </h1>
          <p className="page-subtitle">
            Manage customer accounts, audit behavioral footprints, and review historic threat attempts.
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by customer name, email, ID or country..."
            value={globalSearchQuery !== undefined && globalSearchQuery !== '' ? globalSearchQuery : localSearchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.3rem' }}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="glass-card">
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name & Email</th>
                <th>Country</th>
                <th>Tenure</th>
                <th>Total Volume</th>
                <th>Fraud Attempts</th>
                <th>Risk Severity</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Profile Audit</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {cust.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{cust.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{cust.email}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Globe size={13} color="var(--text-subtle)" /> {cust.country}
                    </div>
                  </td>
                  <td>{cust.accountAgeMonths} months</td>
                  <td className="font-mono" style={{ fontWeight: 700 }}>{cust.totalVolume}</td>
                  <td className="font-mono" style={{ fontWeight: 800, color: cust.fraudAttempts > 0 ? 'var(--critical)' : 'var(--success)' }}>
                    {cust.fraudAttempts}
                  </td>
                  <td>
                    <RiskBadge score={cust.riskLevel === 'CRITICAL' ? 94 : cust.riskLevel === 'HIGH' ? 78 : 20} level={cust.riskLevel} />
                  </td>
                  <td>
                    <span className={`status-pill ${cust.accountStatus === 'Active' ? 'status-legitimate' : 'status-blocked'}`}>
                      {cust.accountStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedCustomer(cust)}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '0.3rem' }}
                    >
                      <Eye size={14} /> Profile Deep-Dive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Detail Modal */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedCustomer.name}
                </h2>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }} className="font-mono">
                  {selectedCustomer.id} • {selectedCustomer.email}
                </p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', fontWeight: 700 }}>ACCOUNT TENURE</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>{selectedCustomer.accountAgeMonths} Months</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', fontWeight: 700 }}>TOTAL VOLUME</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }} className="font-mono">{selectedCustomer.totalVolume}</div>
              </div>
            </div>

            {/* Devices & Geolocation History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Smartphone size={15} color="var(--primary)" /> Registered Hardware Fingerprints
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selectedCustomer.devices.map((dev, i) => (
                    <span key={i} style={{ fontSize: '0.775rem', background: 'var(--bg-elevated)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      {dev}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={15} color="var(--secondary)" /> Known Login Locations
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selectedCustomer.knownLocations.map((loc, i) => (
                    <span key={i} style={{ fontSize: '0.775rem', background: 'var(--bg-elevated)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button onClick={() => setSelectedCustomer(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
              <button onClick={() => { setSelectedCustomer(null); onNavigate('investigate'); }} className="btn btn-primary btn-sm">
                Launch Investigation Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
