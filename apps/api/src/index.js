import express from 'express';
import cors from 'cors';
import { classifyRequest } from './classifier.js';
import { routeRequest } from './router.js';
import { createAuditEvent } from './audit.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const requests = [];
const auditEvents = [];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'trades-request-ai-triage-api' });
});

app.post('/requests', (req, res) => {
  const { customerName, phone, email, address, preferredTrade, message } = req.body;

  if (!customerName || !phone || !message) {
    return res.status(400).json({
      error: 'customerName, phone, and message are required.'
    });
  }

  const request = {
    id: crypto.randomUUID(),
    customerName,
    phone,
    email: email || null,
    address: address || null,
    preferredTrade: preferredTrade || 'general',
    message,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const classification = classifyRequest({ message, preferredTrade });
  const routing = routeRequest(classification);

  const enrichedRequest = {
    ...request,
    status: routing.humanReviewRequired ? 'review_required' : 'dispatch_ready',
    classification,
    routing
  };

  requests.push(enrichedRequest);

  auditEvents.push(
    createAuditEvent(request.id, 'request_created', { customerName, preferredTrade }),
    createAuditEvent(request.id, 'request_classified', classification),
    createAuditEvent(request.id, 'routing_decision_created', routing)
  );

  res.status(201).json(enrichedRequest);
});

app.get('/requests', (_req, res) => {
  res.json(requests);
});

app.get('/audit-events', (_req, res) => {
  res.json(auditEvents);
});

app.listen(port, () => {
  console.log(`Trades request triage API running on port ${port}`);
});
