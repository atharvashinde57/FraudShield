import React, { useState } from 'react';
import { Cpu, RefreshCw, CheckCircle2, Sliders, Play, Database, Layers } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

interface ModelPerformanceViewProps {
  onShowToast: (title: string, message?: string, type?: 'success' | 'danger' | 'warning' | 'info') => void;
}

export const ModelPerformanceView: React.FC<ModelPerformanceViewProps> = ({ onShowToast }) => {
  const [isRetraining, setIsRetraining] = useState(false);

  // Precision-Recall Curve dummy points
  const prCurveData = [
    { recall: '0.1', precision: 0.99 },
    { recall: '0.3', precision: 0.98 },
    { recall: '0.5', precision: 0.96 },
    { recall: '0.7', precision: 0.94 },
    { recall: '0.9', precision: 0.91 },
    { recall: '1.0', precision: 0.84 },
  ];

  // Model performance history
  const performanceHistory = [
    { epoch: 'v2.1', accuracy: 94.2, precision: 90.1, recall: 88.4 },
    { epoch: 'v2.2', accuracy: 95.1, precision: 91.8, recall: 89.2 },
    { epoch: 'v2.3', accuracy: 96.0, precision: 93.1, recall: 90.5 },
    { epoch: 'v2.4.1 (Current)', accuracy: 96.8, precision: 94.2, recall: 91.7 },
  ];

  const handleRetrain = () => {
    setIsRetraining(true);
    onShowToast('Retraining Initialized', 'Job queued on Distributed Spark Cluster', 'info');
    setTimeout(() => {
      setIsRetraining(false);
      onShowToast('Retraining Complete', 'Model v2.4.2 compiled with 97.1% accuracy', 'success');
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Cpu color="var(--primary)" size={28} /> Fraud Detection Model (ML Engine)
          </h1>
          <p className="page-subtitle">
            Gradient boosted neural ensemble model evaluation metrics, drift diagnostics, and retraining controls.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span className="status-pill status-legitimate" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
            <CheckCircle2 size={14} /> MODEL STATUS: ACTIVE
          </span>
          <button
            onClick={handleRetrain}
            disabled={isRetraining}
            className="btn btn-primary btn-sm"
          >
            <RefreshCw size={14} className={isRetraining ? 'animate-spin' : ''} />
            {isRetraining ? 'Training Pipeline Running...' : 'Retrain Model v2.4.2'}
          </button>
        </div>
      </div>

      {/* Model Overview Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>MODEL VERSION</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }} className="font-mono">
              {MODEL_METRICS.version}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Last trained: {MODEL_METRICS.lastTrained}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>TRAINING SAMPLE SIZE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }} className="font-mono">
              2.48M
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Transactions labeled
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>ACCURACY</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }} className="font-mono">
              {MODEL_METRICS.accuracy}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>PRECISION / RECALL</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)', marginTop: '0.2rem' }} className="font-mono">
              {MODEL_METRICS.precision}% / {MODEL_METRICS.recall}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>F1 SCORE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }} className="font-mono">
              {MODEL_METRICS.f1Score}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>FALSE POSITIVE RATE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning)', marginTop: '0.2rem' }} className="font-mono">
              {MODEL_METRICS.falsePositiveRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Precision vs Recall + Feature Importance Weight */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem'
      }} className="model-grid-row">

        {/* Precision vs Recall Curve */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Precision vs Recall Tradeoff Curve
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Model threshold trade-off curve (AUC: 0.974)
          </p>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prCurveData}>
                <XAxis dataKey="recall" stroke="#64748b" fontSize={11} label={{ value: 'Recall', position: 'bottom', offset: -5 }} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0.7, 1]} label={{ value: 'Precision', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="precision" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5 }} name="Precision" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Feature Weight Importance
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Shapley feature contribution values
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {MODEL_METRICS.featureImportance.map((feat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{feat.feature}</span>
                  <span style={{ color: 'var(--secondary)', fontWeight: 700 }} className="font-mono">{feat.weight}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${feat.weight * 2.5}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
