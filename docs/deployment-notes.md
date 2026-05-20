# Deployment Notes

## Purpose

This document describes how the trades request triage system could be deployed in a cloud-ready environment.

## Starter MVP Deployment

A simple deployment could use:

- Vercel for the React frontend
- Render, Railway, Azure App Service, or AWS App Runner for the API
- Supabase for PostgreSQL database and authentication
- GitHub Actions for CI checks

## Azure-Oriented Production Deployment

For an Azure architecture, use:

- Azure Static Web Apps or Azure App Service for the frontend
- Azure App Service or Azure Container Apps for the API
- Azure Database for PostgreSQL
- Azure OpenAI for classification
- Azure Key Vault for secrets
- Application Insights for logs and monitoring
- Azure Front Door and WAF for production hardening

## Environment Variables

The API should use environment variables for configuration:

```text
PORT=4000
DATABASE_URL=
AI_PROVIDER=mock
OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
```

## Deployment Stages

Recommended stages:

1. Local development
2. Development environment
3. QA/UAT/Staging environment
4. Production environment

## Production Readiness Checklist

Before production use:

- Replace mock classifier with tested AI or rules engine
- Add authentication and role-based access
- Connect persistent database
- Add structured logging
- Add monitoring and alerting
- Add notification integrations
- Validate emergency routing rules
- Add privacy and data retention policy
- Perform security review