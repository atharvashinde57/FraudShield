export interface Transaction {
  id: string;
  customerName: string;
  customerId: string;
  amount: number;
  currency: string;
  formattedAmount: string;
  location: string;
  country: string;
  paymentMethod: string;
  merchant: string;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'LEGITIMATE' | 'REVIEW' | 'SUSPICIOUS' | 'BLOCKED' | 'CONFIRMED FRAUD';
  timestamp: string;
  device: string;
  ipAddress: string;
  riskFactors: { factor: string; score: number }[];
  timeline: { time: string; event: string; iconType?: string }[];
}

export interface FraudAlert {
  id: string;
  alertCode: string;
  transactionId: string;
  customerName: string;
  customerId: string;
  amount: string;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reasons: string[];
  timestamp: string;
  status: 'Critical' | 'High Risk' | 'Under Investigation' | 'Resolved';
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  accountAgeMonths: number;
  totalTransactions: number;
  totalVolume: string;
  fraudAttempts: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  accountStatus: 'Active' | 'Flagged' | 'Frozen';
  devices: string[];
  knownLocations: string[];
  recentActivity: string;
}

export interface FraudRule {
  id: string;
  name: string;
  condition: string;
  action: 'BLOCK' | 'FLAG_REVIEW' | 'ALERT_CRITICAL' | 'REQUIRE_2FA';
  riskIncrement: number;
  status: 'ACTIVE' | 'PAUSED';
  triggeredCount: number;
}

export const INITIAL_KPI_DATA = {
  totalVolume: '₹24.8M',
  totalVolumeChange: '+8.2%',
  monitoredCount: '128,492',
  monitoredChange: '+14.5%',
  fraudDetected: '1,284',
  fraudDetectedChange: '+12.4%',
  fraudRate: '0.99%',
  fraudRateChange: '-0.15%',
  preventedLoss: '₹8.4M',
  preventedLossChange: '+18.9%',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-92831',
    customerName: 'Rahul Sharma',
    customerId: 'CUST-8831',
    amount: 84500,
    currency: 'INR',
    formattedAmount: '₹84,500',
    location: 'Mumbai, IN',
    country: 'India',
    paymentMethod: 'Credit Card',
    merchant: 'Luxury Clockwork Vault',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    status: 'SUSPICIOUS',
    timestamp: '2 min ago',
    device: 'Unknown Android (Tor Browser)',
    ipAddress: '185.220.101.4',
    riskFactors: [
      { factor: 'Unusual transaction amount', score: 28 },
      { factor: 'New device & browser fingerprint', score: 20 },
      { factor: 'Unusual geolocation shift (Mumbai vs last Pune login)', score: 18 },
      { factor: 'Multiple failed 2FA attempts', score: 14 },
      { factor: 'High transaction velocity (4 txns in 60s)', score: 12 },
    ],
    timeline: [
      { time: '10:42 AM', event: 'Login detected from IP 185.220.101.4' },
      { time: '10:44 AM', event: 'New unrecognized Android device registered' },
      { time: '10:45 AM', event: '2 consecutive failed OTP validation attempts' },
      { time: '10:47 AM', event: '₹84,500 transaction initiated at Luxury Clockwork Vault' },
      { time: '10:47 AM', event: 'Automated FraudShield engine flagged risk score 92 (CRITICAL)' },
      { time: '10:48 AM', event: 'Security analyst review session initialized' },
    ]
  },
  {
    id: 'TXN-92832',
    customerName: 'Priya Patel',
    customerId: 'CUST-4412',
    amount: 12450,
    currency: 'INR',
    formattedAmount: '₹12,450',
    location: 'Bengaluru, IN',
    country: 'India',
    paymentMethod: 'UPI',
    merchant: 'TechElectronics Outlet',
    riskScore: 78,
    riskLevel: 'HIGH',
    status: 'REVIEW',
    timestamp: '7 min ago',
    device: 'iPhone 15 Pro (Safari)',
    ipAddress: '49.207.195.12',
    riskFactors: [
      { factor: 'First-time merchant interaction', score: 30 },
      { factor: 'Velocity anomaly past midnight', score: 25 },
      { factor: 'Account age under 14 days', score: 23 },
    ],
    timeline: [
      { time: '10:35 AM', event: 'UPI Mandate request created' },
      { time: '10:38 AM', event: 'High risk score assigned by Model v2.4.1' },
      { time: '10:40 AM', event: 'Held in review queue for analyst authorization' }
    ]
  },
  {
    id: 'TXN-92833',
    customerName: 'Alexander Wright',
    customerId: 'CUST-1092',
    amount: 2430,
    currency: 'USD',
    formattedAmount: '$2,430',
    location: 'London, UK',
    country: 'United Kingdom',
    paymentMethod: 'Wire Transfer',
    merchant: 'Global FX Liquidity Corp',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'BLOCKED',
    timestamp: '12 min ago',
    device: 'Linux Workstation (Chrome)',
    ipAddress: '194.26.29.112',
    riskFactors: [
      { factor: 'Blacklisted IP address range (Known Proxy)', score: 40 },
      { factor: 'High-risk destination country transfer', score: 30 },
      { factor: 'Sudden high-value transfer anomaly', score: 26 },
    ],
    timeline: [
      { time: '10:30 AM', event: 'Wire transfer requested to offshore account' },
      { time: '10:31 AM', event: 'IP reputation system flagged blacklisted proxy' },
      { time: '10:31 AM', event: 'Automated rule RULE-001 executed: INSTANT BLOCK' },
    ]
  },
  {
    id: 'TXN-92834',
    customerName: 'Vikram Mehta',
    customerId: 'CUST-9921',
    amount: 4300,
    currency: 'INR',
    formattedAmount: '₹4,300',
    location: 'Pune, IN',
    country: 'India',
    paymentMethod: 'Credit Card',
    merchant: 'FreshBites Supermarket',
    riskScore: 12,
    riskLevel: 'LOW',
    status: 'LEGITIMATE',
    timestamp: '15 min ago',
    device: 'Samsung S24 (App)',
    ipAddress: '103.115.198.5',
    riskFactors: [
      { factor: 'Routine daily transaction pattern', score: 12 },
    ],
    timeline: [
      { time: '10:28 AM', event: 'Payment authorized successfully' }
    ]
  },
  {
    id: 'TXN-92835',
    customerName: 'Ananya Sen',
    customerId: 'CUST-3104',
    amount: 125000,
    currency: 'INR',
    formattedAmount: '₹1,25,000',
    location: 'Delhi, IN',
    country: 'India',
    paymentMethod: 'ACH / Net Banking',
    merchant: 'JewelCraft Fine Ornaments',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'SUSPICIOUS',
    timestamp: '22 min ago',
    device: 'Windows 11 (Edge)',
    ipAddress: '115.240.90.18',
    riskFactors: [
      { factor: 'Spike in transaction value (10x average)', score: 38 },
      { factor: 'Unverified high-value merchant category', score: 28 },
      { factor: 'Rapid sequence of account settings edits', score: 22 },
    ],
    timeline: [
      { time: '10:15 AM', event: 'Password updated' },
      { time: '10:18 AM', event: 'Beneficiary added without cool-off period' },
      { time: '10:20 AM', event: '₹1,25,000 transfer attempted' }
    ]
  },
  {
    id: 'TXN-92836',
    customerName: 'David Kim',
    customerId: 'CUST-7740',
    amount: 890,
    currency: 'USD',
    formattedAmount: '$890',
    location: 'New York, US',
    country: 'United States',
    paymentMethod: 'Credit Card',
    merchant: 'Digital Gaming Hub',
    riskScore: 65,
    riskLevel: 'MEDIUM',
    status: 'REVIEW',
    timestamp: '35 min ago',
    device: 'MacBook Pro (Chrome)',
    ipAddress: '68.195.220.9',
    riskFactors: [
      { factor: 'Digital goods high-refund merchant', score: 35 },
      { factor: 'Card CVV retries (2 attempts)', score: 30 },
    ],
    timeline: [
      { time: '10:02 AM', event: 'First payment declined due to CVV error' },
      { time: '10:04 AM', event: 'Second payment attempt passed' }
    ]
  },
  {
    id: 'TXN-92837',
    customerName: 'Rohan Verma',
    customerId: 'CUST-5510',
    amount: 35000,
    currency: 'INR',
    formattedAmount: '₹35,000',
    location: 'Singapore, SG',
    country: 'Singapore',
    paymentMethod: 'Crypto Swap',
    merchant: 'Decentralized Exchange X',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'CONFIRMED FRAUD',
    timestamp: '1 hour ago',
    device: 'Unknown Linux (Automated Bot)',
    ipAddress: '45.142.120.88',
    riskFactors: [
      { factor: 'Automated script request behavior', score: 40 },
      { factor: 'Non-custodial wallet instant drain pattern', score: 32 },
      { factor: 'Cross-border instant crypto conversion', score: 22 }
    ],
    timeline: [
      { time: '09:30 AM', event: 'Account takeover confirmed via session hijacking' },
      { time: '09:32 AM', event: 'Full funds drained to tumbler wallet' }
    ]
  }
];

export const MOCK_ALERTS: FraudAlert[] = [
  {
    id: 'ALT-1092',
    alertCode: 'RULE-CRIT-001',
    transactionId: 'TXN-92831',
    customerName: 'Rahul Sharma',
    customerId: 'CUST-8831',
    amount: '₹84,500',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    reasons: ['Unusual location shift', 'New unrecognized device', 'Abnormally high transaction amount', '2FA failed attempts'],
    timestamp: '2 min ago',
    status: 'Critical'
  },
  {
    id: 'ALT-1093',
    alertCode: 'RULE-HIGH-004',
    transactionId: 'TXN-92832',
    customerName: 'Priya Patel',
    customerId: 'CUST-4412',
    amount: '₹12,450',
    riskScore: 78,
    riskLevel: 'HIGH',
    reasons: ['First time merchant interaction', 'Midnight velocity anomaly', 'Account age under 14 days'],
    timestamp: '7 min ago',
    status: 'High Risk'
  },
  {
    id: 'ALT-1094',
    alertCode: 'RULE-BLOCK-009',
    transactionId: 'TXN-92833',
    customerName: 'Alexander Wright',
    customerId: 'CUST-1092',
    amount: '$2,430',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    reasons: ['Known malicious proxy IP range', 'Offshore wire transfer request', 'High risk jurisdiction'],
    timestamp: '12 min ago',
    status: 'Under Investigation'
  },
  {
    id: 'ALT-1095',
    alertCode: 'RULE-HIGH-012',
    transactionId: 'TXN-92835',
    customerName: 'Ananya Sen',
    customerId: 'CUST-3104',
    amount: '₹1,25,000',
    riskScore: 88,
    riskLevel: 'HIGH',
    reasons: ['10x average ticket size', 'Beneficiary added without cool-off', 'Password reset prior to transfer'],
    timestamp: '22 min ago',
    status: 'High Risk'
  },
  {
    id: 'ALT-1096',
    alertCode: 'RULE-CONF-003',
    transactionId: 'TXN-92837',
    customerName: 'Rohan Verma',
    customerId: 'CUST-5510',
    amount: '₹35,000',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    reasons: ['Bot request fingerprint', 'Instant crypto conversion attempt', 'Session hijack vector'],
    timestamp: '1 hour ago',
    status: 'Resolved'
  }
];

export const MOCK_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'CUST-8831',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    country: 'India',
    accountAgeMonths: 24,
    totalTransactions: 142,
    totalVolume: '₹14.2L',
    fraudAttempts: 2,
    riskLevel: 'CRITICAL',
    accountStatus: 'Flagged',
    devices: ['iPhone 14 Pro', 'MacBook Air M2', 'Unknown Tor Android'],
    knownLocations: ['Mumbai, IN', 'Pune, IN'],
    recentActivity: 'Flagged transaction TXN-92831 under security hold'
  },
  {
    id: 'CUST-4412',
    name: 'Priya Patel',
    email: 'priya.p@techcorp.in',
    country: 'India',
    accountAgeMonths: 1,
    totalTransactions: 8,
    totalVolume: '₹45,000',
    fraudAttempts: 1,
    riskLevel: 'HIGH',
    accountStatus: 'Active',
    devices: ['iPhone 15 Pro'],
    knownLocations: ['Bengaluru, IN'],
    recentActivity: 'High risk UPI transfer requiring 2FA re-auth'
  },
  {
    id: 'CUST-1092',
    name: 'Alexander Wright',
    email: 'awright@ukfinance.co.uk',
    country: 'United Kingdom',
    accountAgeMonths: 36,
    totalTransactions: 310,
    totalVolume: '$180,000',
    fraudAttempts: 3,
    riskLevel: 'CRITICAL',
    accountStatus: 'Frozen',
    devices: ['Dell XPS 15', 'Linux Proxy Node'],
    knownLocations: ['London, UK', 'Amsterdam, NL'],
    recentActivity: 'Blocked wire transfer $2,430 due to malicious IP'
  },
  {
    id: 'CUST-9921',
    name: 'Vikram Mehta',
    email: 'v.mehta@enterprise.in',
    country: 'India',
    accountAgeMonths: 48,
    totalTransactions: 890,
    totalVolume: '₹42.5L',
    fraudAttempts: 0,
    riskLevel: 'LOW',
    accountStatus: 'Active',
    devices: ['Samsung S24 Ultra', 'Windows PC'],
    knownLocations: ['Pune, IN', 'Mumbai, IN'],
    recentActivity: 'Clean transaction history'
  },
  {
    id: 'CUST-3104',
    name: 'Ananya Sen',
    email: 'ananya.sen@designstudio.io',
    country: 'India',
    accountAgeMonths: 18,
    totalTransactions: 95,
    totalVolume: '₹8.9L',
    fraudAttempts: 1,
    riskLevel: 'HIGH',
    accountStatus: 'Flagged',
    devices: ['MacBook Pro 16"', 'iPad Pro'],
    knownLocations: ['Delhi, IN', 'Gurugram, IN'],
    recentActivity: 'Password update followed by high-value transfer'
  }
];

export const MOCK_RULES: FraudRule[] = [
  {
    id: 'RULE-001',
    name: 'Malicious Proxy / Tor IP Block',
    condition: 'IP_REPUTATION == "BLACK_LISTED" OR IS_TOR_NODE == TRUE',
    action: 'BLOCK',
    riskIncrement: 40,
    status: 'ACTIVE',
    triggeredCount: 412
  },
  {
    id: 'RULE-002',
    name: 'High Ticket Value Anomaly',
    condition: 'AMOUNT > (AVG_AMOUNT * 5) AND ACCOUNT_AGE_DAYS < 30',
    action: 'FLAG_REVIEW',
    riskIncrement: 30,
    status: 'ACTIVE',
    triggeredCount: 128
  },
  {
    id: 'RULE-003',
    name: 'Rapid Geolocation Impossible Travel',
    condition: 'GEO_DISTANCE_KM > 500 AND TIME_DELTA_MIN < 30',
    action: 'ALERT_CRITICAL',
    riskIncrement: 35,
    status: 'ACTIVE',
    triggeredCount: 89
  },
  {
    id: 'RULE-004',
    name: 'Multiple Failed Authentication Spikes',
    condition: 'FAILED_OTP_COUNT >= 3 WITHIN 120 SECONDS',
    action: 'REQUIRE_2FA',
    riskIncrement: 20,
    status: 'ACTIVE',
    triggeredCount: 654
  }
];

export const TIME_SERIES_FRAUD_DATA = [
  { time: '00:00', legitimate: 4200, suspicious: 120, confirmedFraud: 14 },
  { time: '04:00', legitimate: 1800, suspicious: 95, confirmedFraud: 22 },
  { time: '08:00', legitimate: 7900, suspicious: 210, confirmedFraud: 18 },
  { time: '12:00', legitimate: 12400, suspicious: 340, confirmedFraud: 31 },
  { time: '16:00', legitimate: 11100, suspicious: 290, confirmedFraud: 28 },
  { time: '20:00', legitimate: 9500, suspicious: 180, confirmedFraud: 19 },
  { time: '23:59', legitimate: 6200, suspicious: 140, confirmedFraud: 15 },
];

export const GEO_FRAUD_DISTRIBUTION = [
  { city: 'Mumbai', code: 'IN', transactions: 42100, fraudCount: 312, rate: '0.74%' },
  { city: 'Bengaluru', code: 'IN', transactions: 38400, fraudCount: 289, rate: '0.75%' },
  { city: 'Delhi / NCR', code: 'IN', transactions: 29100, fraudCount: 260, rate: '0.89%' },
  { city: 'London', code: 'UK', transactions: 14200, fraudCount: 184, rate: '1.29%' },
  { city: 'New York', code: 'US', transactions: 11800, fraudCount: 142, rate: '1.20%' },
  { city: 'Singapore', code: 'SG', transactions: 9400, fraudCount: 97, rate: '1.03%' },
];

export const MODEL_METRICS = {
  version: 'v2.4.1 (Gradient Boosted FraudNet)',
  status: 'Active',
  lastTrained: '2 days ago',
  trainingSamples: '2,480,120 transactions',
  accuracy: 96.8,
  precision: 94.2,
  recall: 91.7,
  f1Score: 92.9,
  falsePositiveRate: 2.1,
  featureImportance: [
    { feature: 'Device Fingerprint Anomaly', weight: 34.2 },
    { feature: 'IP Reputation & Proxy Check', weight: 24.8 },
    { feature: 'Velocity & Ticket Size Deviation', weight: 18.5 },
    { feature: 'Historical User Behavior Match', weight: 12.3 },
    { feature: 'Merchant Category Risk Index', weight: 10.2 },
  ]
};
