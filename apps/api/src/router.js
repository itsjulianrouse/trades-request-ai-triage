export function routeRequest(classification) {
  const { trade, serviceType, urgency, riskScore, confidence } = classification;

  if (confidence < 0.7) {
    return {
      recommendedQueue: 'dispatcher_review',
      humanReviewRequired: true,
      routingReason: 'Low-confidence classification requires dispatcher review.'
    };
  }

  if (urgency === 'emergency' || riskScore >= 75) {
    const emergencyQueues = {
      electrical: 'electrical_emergency_dispatch',
      plumbing: 'plumbing_emergency_dispatch',
      roofing: 'roofing_leak_response',
      general: 'dispatcher_review'
    };

    return {
      recommendedQueue: emergencyQueues[trade] || 'dispatcher_review',
      humanReviewRequired: true,
      routingReason: 'High-risk or emergency request requires human dispatcher confirmation.'
    };
  }

  if (serviceType.includes('quote') || serviceType.includes('install') || serviceType.includes('inspection')) {
    return {
      recommendedQueue: `${trade}_estimator_follow_up`,
      humanReviewRequired: false,
      routingReason: 'Request appears to be quote, inspection, or installation related.'
    };
  }

  return {
    recommendedQueue: `${trade}_routine_service_queue`,
    humanReviewRequired: false,
    routingReason: 'Request can be handled through normal service scheduling.'
  };
}
