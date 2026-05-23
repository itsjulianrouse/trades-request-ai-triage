export const sampleRequests = [
  {
    id: 'REQ-001',
    customerName: 'Maya Singh',
    trade: 'plumbing',
    message: 'There is water leaking through the ceiling under the upstairs bathroom.',
    urgency: 'emergency',
    riskScore: 95,
    queue: 'plumbing_emergency_dispatch',
    status: 'review_required'
  },
  {
    id: 'REQ-002',
    customerName: 'David Chen',
    trade: 'electrical',
    message: 'I smell burning near the electrical panel and one breaker keeps tripping.',
    urgency: 'emergency',
    riskScore: 96,
    queue: 'electrical_emergency_dispatch',
    status: 'review_required'
  },
  {
    id: 'REQ-003',
    customerName: 'Olivia Brown',
    trade: 'roofing',
    message: 'After the wind storm, several shingles are missing and water is coming in.',
    urgency: 'emergency',
    riskScore: 90,
    queue: 'roofing_leak_response',
    status: 'review_required'
  },
  {
    id: 'REQ-004',
    customerName: 'Noah Wilson',
    trade: 'electrical',
    message: 'Looking for a quote to install an EV charger in my garage.',
    urgency: 'priority',
    riskScore: 55,
    queue: 'electrical_estimator_follow_up',
    status: 'dispatch_ready'
  },
  {
    id: 'REQ-005',
    customerName: 'Ava Johnson',
    trade: 'roofing',
    message: 'I need a roof inspection and quote for replacement this summer.',
    urgency: 'routine',
    riskScore: 30,
    queue: 'roofing_estimator_follow_up',
    status: 'dispatch_ready'
  }
];
