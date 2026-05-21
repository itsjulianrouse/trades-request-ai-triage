# ADR-004: Use Cloud-Ready Configuration

## Status

Accepted

## Context

The project should be simple enough to run locally but structured so it can be deployed to cloud platforms.

## Decision

The project will use environment variables, separate frontend/API folders, and database schema files.

## Consequences

This makes the project easier to deploy, test, and expand. It avoids hardcoded secrets and keeps the architecture portable.
