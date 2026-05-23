create extension if not exists "uuid-ossp";

create table if not exists service_requests (
    id uuid primary key default uuid_generate_v4(),
    customer_name text not null,
    phone text not null,
    email text,
    address text,
    preferred_trade text check (preferred_trade in ('electrical', 'plumbing', 'roofing', 'general')),
    message text not null,
    status text not null default 'new',
    created_at timestamptz not null default now()
);

create table if not exists classification_results (
    id uuid primary key default uuid_generate_v4(),
    request_id uuid not null references service_requests(id) on delete cascade,
    trade text not null check (trade in ('electrical', 'plumbing', 'roofing', 'general')),
    service_type text not null,
    urgency text not null check (urgency in ('routine', 'priority', 'urgent', 'emergency')),
    risk_score int not null check (risk_score >= 0 and risk_score <= 100),
    confidence numeric(3,2) not null check (confidence >= 0 and confidence <= 1),
    reason text not null,
    created_at timestamptz not null default now()
);

create table if not exists routing_decisions (
    id uuid primary key default uuid_generate_v4(),
    request_id uuid not null references service_requests(id) on delete cascade,
    recommended_queue text not null,
    human_review_required boolean not null default true,
    routing_reason text not null,
    created_at timestamptz not null default now()
);

create table if not exists audit_events (
    id uuid primary key default uuid_generate_v4(),
    request_id uuid references service_requests(id) on delete cascade,
    event_type text not null,
    event_payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_service_requests_status on service_requests(status);
create index if not exists idx_classification_trade on classification_results(trade);
create index if not exists idx_routing_queue on routing_decisions(recommended_queue);
create index if not exists idx_audit_request_id on audit_events(request_id);
