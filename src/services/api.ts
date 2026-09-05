import { Transaction, FraudAlert, FraudRule } from '../data/mockData';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper for JWT Authorization header
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('fraudshield_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const ApiService = {
  // Login / Authenticate JWT
  async login(email: string, password: string): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Authentication failed');
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('fraudshield_jwt_token', data.token);
      }
      return data;
    } catch (err) {
      console.warn('Backend offline or auth failed, using simulated auth');
      return { token: 'simulated_jwt_token', user: { name: 'Senior Analyst', role: 'SecOps Tier-3' } };
    }
  },

  // Fetch Transactions
  async getTransactions(): Promise<Transaction[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Evaluate / Create New Transaction via Fraud Detection Engine
  async createTransaction(txnData: Partial<Transaction>): Promise<Transaction | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(txnData)
      });
      if (!res.ok) throw new Error('Failed to evaluate transaction');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Block Transaction
  async blockTransaction(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions/${id}/block`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  },

  // Approve Transaction
  async approveTransaction(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/transactions/${id}/approve`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  },

  // Fetch Alerts
  async getAlerts(): Promise<FraudAlert[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch alerts');
      const rawData = await res.json();
      return rawData.map((a: any) => ({
        ...a,
        reasons: a.reasonsCsv ? a.reasonsCsv.split('; ') : ['Fraud engine anomaly trigger']
      }));
    } catch (err) {
      return [];
    }
  },

  // Resolve Alert
  async resolveAlert(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/${id}/resolve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return res.ok;
    } catch (err) {
      return false;
    }
  },

  // Fetch Fraud Rules
  async getRules(): Promise<FraudRule[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/settings/rules`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch rules');
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  // Add Custom Fraud Rule
  async createRule(rule: Partial<FraudRule>): Promise<FraudRule | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/settings/rules`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(rule)
      });
      if (!res.ok) throw new Error('Failed to create rule');
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};
