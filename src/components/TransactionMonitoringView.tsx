import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Download, 
  Eye, 
  SearchCode, 
  Ban, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { Transaction } from '../data/mockData';
import { RiskBadge } from './RiskBadge';

interface TransactionMonitoringViewProps {
  transactions: Transaction[];
  onNavigate: (view: string) => void;
  onSelectTransaction: (txn: Transaction) => void;
  onBlockTransaction: (txn: Transaction) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TransactionMonitoringView: React.FC<TransactionMonitoringViewProps> = ({
  transactions,
  onNavigate,
  onSelectTransaction,
  onBlockTransaction,
  searchQuery,
  onSearchChange
}) => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'timestamp' | 'amount' | 'riskScore'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Reset page to 1 when search or filter options change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRiskFilter, selectedStatusFilter, selectedPaymentFilter]);

  // Comprehensive filtering logic
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return transactions.filter(t => {
      const matchesSearch = !query ||
        t.id.toLowerCase().includes(query) ||
        t.customerName.toLowerCase().includes(query) ||
        t.customerId.toLowerCase().includes(query) ||
        t.location.toLowerCase().includes(query) ||
        t.merchant.toLowerCase().includes(query) ||
        t.paymentMethod.toLowerCase().includes(query) ||
        t.status.toLowerCase().includes(query) ||
        (t.ipAddress && t.ipAddress.toLowerCase().includes(query)) ||
        (t.device && t.device.toLowerCase().includes(query)) ||
        t.formattedAmount.toLowerCase().includes(query);

      const matchesRisk = selectedRiskFilter === 'ALL' || t.riskLevel === selectedRiskFilter;
      const matchesStatus = selectedStatusFilter === 'ALL' || t.status === selectedStatusFilter;
      const matchesPayment = selectedPaymentFilter === 'ALL' || t.paymentMethod === selectedPaymentFilter;

      return matchesSearch && matchesRisk && matchesStatus && matchesPayment;
    }).sort((a, b) => {
      let compA = a[sortBy];
      let compB = b[sortBy];
      if (typeof compA === 'string') {
        return sortOrder === 'asc' 
          ? (compA as string).localeCompare(compB as string) 
          : (compB as string).localeCompare(compA as string);
      }
      return sortOrder === 'asc' 
        ? (compA as number) - (compB as number) 
        : (compB as number) - (compA as number);
    });
  }, [transactions, searchQuery, selectedRiskFilter, selectedStatusFilter, selectedPaymentFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'timestamp' | 'amount' | 'riskScore') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Title */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <ArrowRightLeft color="var(--primary)" size={28} /> Transaction Monitoring
          </h1>
          <p className="page-subtitle">
            Inspect, filter, and audit live transactional traffic across global networks.
          </p>
        </div>

        <button 
          onClick={() => alert("Exporting transaction report CSV...")}
          className="btn btn-secondary btn-sm"
        >
          <Download size={14} /> Export CSV Report
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          
          {/* Search Box */}
          <div className="input-group">
            <label className="input-label">Search Query</label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="ID, customer, merchant..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.3rem' }}
              />
            </div>
          </div>

          {/* Risk Level Filter */}
          <div className="input-group">
            <label className="input-label">Risk Severity</label>
            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="input-field select-field"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical (81–100)</option>
              <option value="HIGH">High (61–80)</option>
              <option value="MEDIUM">Medium (31–60)</option>
              <option value="LOW">Low (0–30)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="input-group">
            <label className="input-label">Transaction Status</label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="input-field select-field"
            >
              <option value="ALL">All Statuses</option>
              <option value="LEGITIMATE">LEGITIMATE</option>
              <option value="REVIEW">REVIEW</option>
              <option value="SUSPICIOUS">SUSPICIOUS</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="CONFIRMED FRAUD">CONFIRMED FRAUD</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div className="input-group">
            <label className="input-label">Payment Method</label>
            <select
              value={selectedPaymentFilter}
              onChange={(e) => setSelectedPaymentFilter(e.target.value)}
              className="input-field select-field"
            >
              <option value="ALL">All Payment Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="ACH / Net Banking">ACH / Net Banking</option>
              <option value="Crypto Swap">Crypto Swap</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Showing <strong>{paginatedTransactions.length}</strong> of <strong>{filteredTransactions.length}</strong> filtered records
          </div>

          {/* Quick Sort Options */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Sort by:</span>
            <button
              onClick={() => toggleSort('riskScore')}
              className={`btn btn-sm ${sortBy === 'riskScore' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Risk Score {sortBy === 'riskScore' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => toggleSort('amount')}
              className={`btn btn-sm ${sortBy === 'amount' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>Customer</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Location</th>
                <th>Method</th>
                <th onClick={() => toggleSort('riskScore')} style={{ cursor: 'pointer' }}>
                  Risk Score <ArrowUpDown size={12} />
                </th>
                <th>Status</th>
                <th>Timestamp</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    No transactions match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {txn.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{txn.customerName}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>{txn.customerId}</div>
                    </td>
                    <td>{txn.merchant}</td>
                    <td className="font-mono" style={{ fontWeight: 700 }}>
                      {txn.formattedAmount}
                    </td>
                    <td>{txn.location}</td>
                    <td>{txn.paymentMethod}</td>
                    <td>
                      <RiskBadge score={txn.riskScore} level={txn.riskLevel} />
                    </td>
                    <td>
                      <span className={`status-pill status-${txn.status.toLowerCase().replace(' ', '-')}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {txn.timestamp}
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
                          title="Investigate"
                        >
                          <SearchCode size={15} />
                        </button>
                        <button
                          onClick={() => onBlockTransaction(txn)}
                          className="btn-icon"
                          style={{ color: 'var(--critical)' }}
                          title="Block"
                        >
                          <Ban size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Page {currentPage} of {totalPages}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="btn btn-secondary btn-sm"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
