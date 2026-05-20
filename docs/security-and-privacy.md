# Security and Privacy Notes

## Purpose

This document outlines security and privacy considerations for an AI-assisted trades intake and dispatch system.

## Data Collected

The system may collect:

- Customer name
- Phone number
- Email address
- Service address
- Request description
- Uploaded photos or documents in future versions
- Classification and routing metadata

## Privacy Principles

### Data Minimization

Only collect the information required to assess and respond to the service request.

### Purpose Limitation

Use customer data only for intake, triage, dispatch, follow-up, reporting, and service improvement.

### Human Oversight

High-risk requests should not be fully automated. Emergency, safety-related, and low-confidence requests should be reviewed by a dispatcher or operations manager.

### Retention

Production systems should define how long customer requests, audit events, and uploaded media are retained.

## Security Controls

Recommended controls include:

- HTTPS in production
- Environment variables for secrets
- Role-based access control
- Multi-factor authentication for admin users
- Input validation
- Secure API rate limiting
- Audit logging for classification and routing decisions
- Database backups
- Encrypted storage where supported

## AI Risk Controls

The AI layer should be treated as a decision-support system, not an autonomous dispatcher.

Recommended controls:

- Human review for emergency and safety categories
- Confidence thresholds
- Clear explanations for classifications
- Logging of AI output and routing decisions
- Ability for dispatchers to override recommendations
- Regular review of misclassified requests

## Example High-Risk Categories

Electrical:

- Burning smell
- Sparks
- Exposed wires
- Partial or full power loss
- Breaker repeatedly tripping

Plumbing:

- Burst pipe
- Sewer backup
- Active flooding
- No water
- Sump pump failure during rain

Roofing:

- Active leak
- Storm damage
- Large missing roof section
- Water entering home
- Safety concern around loose materials

## Production Notes

This demo uses a mock classifier. For production use, additional controls would be required, including:

- Vendor risk review for AI provider
- Privacy impact assessment
- Logging and monitoring strategy
- Incident response procedure
- Access review process
- Secure deployment pipeline