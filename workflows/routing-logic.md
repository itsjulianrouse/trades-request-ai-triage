# Routing Logic

## Purpose

This document defines sample routing rules for electrician, plumber, and roofer service requests.

## Urgency Levels

### Emergency

Immediate response or dispatcher review required.

Examples:

- Active water leak or flooding
- Burning smell from electrical panel
- Sparks or exposed wires
- Sewer backup
- Water entering the home from the roof
- Storm damage creating immediate safety risk

### Urgent

Same-day or next-business-day review recommended.

Examples:

- No hot water
- Breaker repeatedly tripping
- Roof leak stopped but damage visible
- Sump pump failure before expected rain
- Partial power loss

### Priority

Important but not immediate.

Examples:

- Small plumbing leak
- Damaged shingles
- Electrical outlet not working
- Eavestrough issue
- Fixture replacement

### Routine

Quote or scheduled work.

Examples:

- EV charger installation
- Panel upgrade quote
- Bathroom renovation plumbing
- Full roof replacement quote
- Lighting upgrade

## Queue Mapping

| Trade | Condition | Queue |
|---|---|---|
| Electrical | Sparks, burning smell, exposed wires | `electrical_emergency_dispatch` |
| Electrical | Panel upgrade, EV charger, lighting quote | `electrical_estimator_follow_up` |
| Plumbing | Burst pipe, flooding, sewer backup | `plumbing_emergency_dispatch` |
| Plumbing | No hot water, sump pump issue | `plumbing_urgent_service` |
| Roofing | Active leak, storm damage | `roofing_leak_response` |
| Roofing | Replacement quote, inspection | `roofing_estimator_follow_up` |
| Any | Low confidence or unclear request | `dispatcher_review` |

## Human Review Rules

Human review is required when:

- Risk score is 75 or higher
- Confidence is below 0.70
- The request is marked emergency
- The message includes possible safety terms
- The trade is unknown or unclear

## Example

Customer message:

> There is water dripping through the ceiling after last night's storm.

Classification:

```json
{
  "trade": "roofing",
  "service_type": "active_roof_leak",
  "urgency": "emergency",
  "risk_score": 90,
  "confidence": 0.88,
  "recommended_queue": "roofing_leak_response",
  "human_review_required": true
}
```
