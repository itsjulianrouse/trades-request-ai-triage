import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { sampleRequests } from './sampleRequests.js';

const tradeLabels = {
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  roofing: 'Roofing'
};

function App() {
  const [tradeFilter, setTradeFilter] = useState('all');

  const filteredRequests = useMemo(() => {
    if (tradeFilter === 'all') return sampleRequests;
    return sampleRequests.filter((request) => request.trade === tradeFilter);
  }, [tradeFilter]);

  const emergencyCount = sampleRequests.filter((request) => request.urgency === 'emergency').length;
  const reviewCount = sampleRequests.filter((request) => request.status === 'review_required').length;
  const avgRisk = Math.round(
    sampleRequests.reduce((total, request) => total + request.riskScore, 0) / sampleRequests.length
  );

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '32px', background: '#f7f7f7', minHeight: '100vh' }}>
      <section style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px', color: '#555' }}>
            AI-Assisted Trades Intake
          </p>
          <h1 style={{ fontSize: '40px', margin: '8px 0' }}>Trades Service Request Triage Dashboard</h1>
          <p style={{ fontSize: '18px', maxWidth: '760px', color: '#444' }}>
            A reference dashboard for classifying and routing electrical, plumbing, and roofing service requests with human oversight.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <MetricCard label="Emergency Requests" value={emergencyCount} />
          <MetricCard label="Human Review Queue" value={reviewCount} />
          <MetricCard label="Average Risk Score" value={avgRisk} />
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {['all', 'electrical', 'plumbing', 'roofing'].map((trade) => (
            <button
              key={trade}
              onClick={() => setTradeFilter(trade)}
              style={{
                border: '1px solid #222',
                borderRadius: '999px',
                padding: '10px 14px',
                background: tradeFilter === trade ? '#222' : '#fff',
                color: tradeFilter === trade ? '#fff' : '#222',
                cursor: 'pointer'
              }}
            >
              {trade === 'all' ? 'All Trades' : tradeLabels[trade]}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '14px' }}>
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
      <p style={{ color: '#555', margin: 0 }}>{label}</p>
      <strong style={{ fontSize: '32px' }}>{value}</strong>
    </div>
  );
}

function RequestCard({ request }) {
  return (
    <article style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <strong>{request.id} · {request.customerName}</strong>
          <p style={{ margin: '6px 0', color: '#555' }}>{request.message}</p>
        </div>
        <span style={{ alignSelf: 'flex-start', border: '1px solid #ddd', borderRadius: '999px', padding: '6px 10px' }}>
          {tradeLabels[request.trade]}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px', marginTop: '16px' }}>
        <SmallDetail label="Urgency" value={request.urgency} />
        <SmallDetail label="Risk Score" value={request.riskScore} />
        <SmallDetail label="Queue" value={request.queue} />
        <SmallDetail label="Status" value={request.status} />
      </div>
    </article>
  );
}

function SmallDetail({ label, value }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{label}</p>
      <strong style={{ fontSize: '14px' }}>{value}</strong>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
