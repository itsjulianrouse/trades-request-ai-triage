const rules = [
  {
    trade: 'plumbing',
    serviceType: 'burst_pipe_or_active_leak',
    urgency: 'emergency',
    riskScore: 95,
    confidence: 0.92,
    keywords: ['burst pipe', 'flooding', 'water everywhere', 'active leak', 'ceiling leak', 'sewer backup']
  },
  {
    trade: 'plumbing',
    serviceType: 'hot_water_or_sump_pump',
    urgency: 'urgent',
    riskScore: 76,
    confidence: 0.84,
    keywords: ['no hot water', 'water heater', 'sump pump', 'backed up drain', 'clogged drain']
  },
  {
    trade: 'electrical',
    serviceType: 'electrical_safety_risk',
    urgency: 'emergency',
    riskScore: 96,
    confidence: 0.9,
    keywords: ['sparks', 'burning smell', 'exposed wire', 'exposed wires', 'smoke', 'panel is hot']
  },
  {
    trade: 'electrical',
    serviceType: 'electrical_service_or_install',
    urgency: 'priority',
    riskScore: 55,
    confidence: 0.82,
    keywords: ['breaker', 'outlet', 'ev charger', 'panel upgrade', 'light fixture', 'lighting']
  },
  {
    trade: 'roofing',
    serviceType: 'active_roof_leak_or_storm_damage',
    urgency: 'emergency',
    riskScore: 90,
    confidence: 0.88,
    keywords: ['roof leak', 'leaking roof', 'water coming through roof', 'storm damage', 'missing shingles', 'wind damage']
  },
  {
    trade: 'roofing',
    serviceType: 'roof_quote_or_inspection',
    urgency: 'routine',
    riskScore: 30,
    confidence: 0.8,
    keywords: ['roof replacement', 'roof inspection', 'eavestrough', 'gutter', 'shingle quote']
  }
];

export function classifyRequest({ message = '', preferredTrade = 'general' }) {
  const normalizedMessage = message.toLowerCase();

  const match = rules.find((rule) =>
    rule.keywords.some((keyword) => normalizedMessage.includes(keyword))
  );

  if (match) {
    return {
      trade: match.trade,
      serviceType: match.serviceType,
      urgency: match.urgency,
      riskScore: match.riskScore,
      confidence: match.confidence,
      reason: `Matched trade-specific keywords for ${match.trade}: ${match.serviceType}.`
    };
  }

  return {
    trade: preferredTrade || 'general',
    serviceType: 'unclear_request',
    urgency: 'priority',
    riskScore: 60,
    confidence: 0.45,
    reason: 'The request did not match a clear trade-specific pattern and should be reviewed by dispatch.'
  };
}
