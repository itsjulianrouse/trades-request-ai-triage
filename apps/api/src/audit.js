export function createAuditEvent(requestId, eventType, payload = {}) {
  return {
    id: crypto.randomUUID(),
    requestId,
    eventType,
    payload,
    createdAt: new Date().toISOString()
  };
}
