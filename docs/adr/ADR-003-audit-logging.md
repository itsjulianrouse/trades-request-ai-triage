# ADR-003: Maintain Audit Logs for Intake and Routing

## Status

Accepted

## Context

Trade businesses need to understand how requests were classified, routed, reviewed, and assigned.

## Decision

The system will create audit events for request creation, classification, routing, review, and assignment.

## Consequences

This improves accountability, troubleshooting, and reporting. It adds database complexity, but the value is high for operations and governance.
