import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { TransactionMonitoringView } from './components/TransactionMonitoringView';
import { TransactionDetailsView } from './components/TransactionDetailsView';
import { FraudAlertsView } from './components/FraudAlertsView';
import { FraudInvestigationView } from './components/FraudInvestigationView';
import { CustomersView } from './components/CustomersView';
import { AnalyticsView } from './components/AnalyticsView';
import { ModelPerformanceView } from './components/ModelPerformanceView';
import { SettingsView } from './components/SettingsView';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ToastContainer, ToastMessage } from './components/ToastNotification';
import { MOCK_TRANSACTIONS, MOCK_ALERTS, Transaction, FraudAlert } from './data/mockData';
import { ApiService } from './services/api';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Data state
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(MOCK_TRANSACTIONS[0]);
  const [alerts, setAlerts] = useState<FraudAlert[]>(MOCK_ALERTS);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: 'danger' | 'primary' | 'success';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Apply theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch initial data from Spring Boot API backend
  useEffect(() => {
    const initBackendData = async () => {
      // Login to obtain JWT
      await ApiService.login('analyst@fraudshield.ai', 'secops2026');
      
      const apiTxns = await ApiService.getTransactions();
      if (apiTxns && apiTxns.length > 0) {
        setTransactions(apiTxns);
        setSelectedTransaction(apiTxns[0]);
        setIsBackendConnected(true);
      }

      const apiAlerts = await ApiService.getAlerts();
      if (apiAlerts && apiAlerts.length > 0) {
        setAlerts(apiAlerts);
      }
    };
    initBackendData();
  }, []);

  // Live transaction simulation stream effect (posted to Spring Boot backend)
  useEffect(() => {
    if (!isLiveStreaming || !isAuthenticated) return;

    const interval = setInterval(async () => {
      const randomNames = ['Amit Kumar', 'Sarah Jenkins', 'Karan Patel', 'Meera Nair', 'Carlos Rossi'];
      const randomCities = ['Moscow, RU (Tor Exit Node)', 'Mumbai, IN', 'Delhi, IN', 'London, UK', 'Singapore, SG'];
      const randomPayment = ['UPI', 'Credit Card', 'Wire Transfer', 'ACH / Net Banking'];
      const randomAmount = Math.floor(Math.random() * 90000) + 1200;

      const newTxnPayload = {
        customerName: randomNames[Math.floor(Math.random() * randomNames.length)],
        customerId: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        amount: randomAmount,
        currency: 'INR',
        formattedAmount: `₹${randomAmount.toLocaleString()}`,
        location: randomCities[Math.floor(Math.random() * randomCities.length)],
        country: 'India',
        paymentMethod: randomPayment[Math.floor(Math.random() * randomPayment.length)],
        merchant: 'Fintech Merchant Node',
        riskScore: Math.floor(Math.random() * 50) + 10,
        riskLevel: 'LOW' as const,
        status: 'LEGITIMATE' as const,
        timestamp: 'Just now',
        device: Math.random() > 0.6 ? 'Tor Proxy Linux Node' : 'Mobile Fingerprint v2',
        ipAddress: `103.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.12`
      };

      // Call Spring Boot FraudDetectionService engine API
      const evaluatedTxn = await ApiService.createTransaction(newTxnPayload);

      if (evaluatedTxn) {
        setIsBackendConnected(true);
        setTransactions(prev => [evaluatedTxn, ...prev.slice(0, 19)]);

        if (evaluatedTxn.riskScore >= 80) {
          const freshAlerts = await ApiService.getAlerts();
          if (freshAlerts.length > 0) setAlerts(freshAlerts);
          showToast('CRITICAL FRAUD ALERT (Spring FraudEngine)', `Txn ${evaluatedTxn.id} scored ${evaluatedTxn.riskScore}`, 'danger');
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, isAuthenticated]);

  const showToast = (title: string, message?: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Block transaction flow with modal confirmation & Spring Boot API sync
  const triggerBlockTransaction = (txn: Transaction) => {
    setConfirmModal({
      isOpen: true,
      title: `Block Transaction ${txn.id}?`,
      message: `Are you sure you want to immediately block ${txn.formattedAmount} for customer ${txn.customerName}? This will trigger Spring FraudEngine block in MySQL database.`,
      variant: 'danger',
      onConfirm: async () => {
        await ApiService.blockTransaction(txn.id);
        setTransactions(prev => prev.map(t => t.id === txn.id ? { ...t, status: 'BLOCKED' } : t));
        showToast('Transaction Blocked', `${txn.id} blocked in MySQL Database via Spring Boot API.`, 'danger');
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Approve transaction flow with Spring Boot API sync
  const triggerApproveTransaction = async (txn: Transaction) => {
    await ApiService.approveTransaction(txn.id);
    setTransactions(prev => prev.map(t => t.id === txn.id ? { ...t, status: 'LEGITIMATE', riskScore: 10, riskLevel: 'LOW' } : t));
    showToast('Transaction Approved', `${txn.id} approved in MySQL Database.`, 'success');
  };

  // Resolve alert flow with Spring Boot API sync
  const handleResolveAlert = async (alertId: string) => {
    await ApiService.resolveAlert(alertId);
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
    showToast('Alert Resolved', `Alert ${alertId} marked resolved in Spring Boot API.`, 'success');
  };

  if (!isAuthenticated || currentView === 'login') {
    return (
      <LoginView
        onLoginSuccess={async () => {
          await ApiService.login('analyst@fraudshield.ai', 'secops2026');
          setIsAuthenticated(true);
          setCurrentView('dashboard');
          showToast('Authenticated (JWT Bearer)', 'Connected to Spring Security API', 'success');
        }}
      />
    );
  }

  const criticalAlertCount = alerts.filter(a => a.status === 'Critical').length;

  return (
    <div className="app-layout">
      {/* Top Navbar Header */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        isLiveStreaming={isLiveStreaming}
        onToggleLiveStream={() => {
          setIsLiveStreaming(!isLiveStreaming);
          showToast(isLiveStreaming ? 'Live Stream Paused' : 'Live Stream Resumed', undefined, 'info');
        }}
        alerts={alerts}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim().length > 0 && ['analytics', 'model-performance', 'settings'].includes(currentView)) {
            setCurrentView('transactions');
          }
        }}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Left Sidebar Navigation */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          criticalAlertCount={criticalAlertCount}
        />

        {/* Main Content Area */}
        <main className="main-wrapper">
          <div className="content-body">
            {currentView === 'dashboard' && (
              <DashboardView
                transactions={transactions}
                onNavigate={setCurrentView}
                onSelectTransaction={setSelectedTransaction}
                onBlockTransaction={triggerBlockTransaction}
                searchQuery={searchQuery}
              />
            )}

            {currentView === 'transactions' && (
              <TransactionMonitoringView
                transactions={transactions}
                onNavigate={setCurrentView}
                onSelectTransaction={setSelectedTransaction}
                onBlockTransaction={triggerBlockTransaction}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {currentView === 'transaction-detail' && (
              <TransactionDetailsView
                transaction={selectedTransaction}
                onNavigate={setCurrentView}
                onBlockTransaction={triggerBlockTransaction}
                onApproveTransaction={triggerApproveTransaction}
              />
            )}

            {currentView === 'alerts' && (
              <FraudAlertsView
                alerts={alerts}
                transactions={transactions}
                onNavigate={setCurrentView}
                onSelectTransaction={setSelectedTransaction}
                onBlockTransaction={triggerBlockTransaction}
                onResolveAlert={handleResolveAlert}
                searchQuery={searchQuery}
              />
            )}

            {currentView === 'investigate' && (
              <FraudInvestigationView
                transaction={selectedTransaction}
                onNavigate={setCurrentView}
                onBlockTransaction={triggerBlockTransaction}
                onApproveTransaction={triggerApproveTransaction}
                onShowToast={showToast}
              />
            )}

            {currentView === 'customers' && (
              <CustomersView
                onNavigate={setCurrentView}
                globalSearchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {currentView === 'analytics' && (
              <AnalyticsView />
            )}

            {currentView === 'model-performance' && (
              <ModelPerformanceView onShowToast={showToast} />
            )}

            {currentView === 'settings' && (
              <SettingsView onShowToast={showToast} />
            )}
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        confirmText="Confirm Action"
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
