-- =============================================================================
-- Bankroll Brotherhood — Supabase Schema & Database Setup
-- =============================================================================
-- This script creates a dedicated PostgreSQL schema named "bankroll" so your
-- Bankroll Brotherhood project can safely share this Supabase database with
-- your other projects without any naming collisions or table conflicts.
--
-- INSTRUCTIONS TO RUN:
-- 1. Open your Supabase Dashboard:
--    https://supabase.com/dashboard/project/cecggsnvrfnxlpfhoyip
-- 2. Click on "SQL Editor" in the left sidebar navigation.
-- 3. Click "New query", paste the entire contents of this file, and click "Run".
-- 4. Expose the schema to the PostgREST API:
--    - Go to "Project Settings" (the gear icon on the left menu)
--    - Click "API" (or "Data API") under Configuration
--    - Scroll down to "Exposed schemas"
--    - Add "bankroll" to the list alongside "public" (e.g. "public, bankroll")
--    - Click "Save"
-- =============================================================================

-- 1. Create the dedicated schema
CREATE SCHEMA IF NOT EXISTS bankroll;

-- 2. Grant permissions on the bankroll schema to Supabase API roles
GRANT USAGE ON SCHEMA bankroll TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA bankroll TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA bankroll TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA bankroll TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA bankroll GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA bankroll GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA bankroll GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 3. Settings table
CREATE TABLE IF NOT EXISTS bankroll.settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    group_name TEXT NOT NULL DEFAULT 'Bankroll Brotherhood',
    founded TEXT NOT NULL DEFAULT '',
    default_weekly_amount NUMERIC NOT NULL DEFAULT 250,
    penalty_rule TEXT NOT NULL DEFAULT 'KES 50 late fee for each missed Saturday contribution.',
    last_updated BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Members table
CREATE TABLE IF NOT EXISTS bankroll.members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    weekly_amount NUMERIC NOT NULL DEFAULT 250,
    penalty_owed NUMERIC NOT NULL DEFAULT 0,
    joined TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Transactions table (includes M-Pesa code, date, amount, type, member_id)
CREATE TABLE IF NOT EXISTS bankroll.transactions (
    id TEXT PRIMARY KEY,
    member_id TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'contribution',
    amount NUMERIC NOT NULL DEFAULT 0,
    date TEXT NOT NULL,
    mpesa_code TEXT DEFAULT '',
    note TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Investments table
CREATE TABLE IF NOT EXISTS bankroll.investments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    invested NUMERIC NOT NULL DEFAULT 0,
    current NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Meetings table
CREATE TABLE IF NOT EXISTS bankroll.meetings (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    topic TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Full snapshot backup table (for atomic real-time cross-device sync)
CREATE TABLE IF NOT EXISTS bankroll.app_data (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    data JSONB NOT NULL,
    last_updated BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Row Level Security (RLS) setup
ALTER TABLE bankroll.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankroll.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankroll.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankroll.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankroll.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bankroll.app_data ENABLE ROW LEVEL SECURITY;

-- 10. Open policies for anon & authenticated roles so client SPA can read & write
DROP POLICY IF EXISTS "Public access to settings" ON bankroll.settings;
CREATE POLICY "Public access to settings" ON bankroll.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to members" ON bankroll.members;
CREATE POLICY "Public access to members" ON bankroll.members FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to transactions" ON bankroll.transactions;
CREATE POLICY "Public access to transactions" ON bankroll.transactions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to investments" ON bankroll.investments;
CREATE POLICY "Public access to investments" ON bankroll.investments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to meetings" ON bankroll.meetings;
CREATE POLICY "Public access to meetings" ON bankroll.meetings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to app_data" ON bankroll.app_data;
CREATE POLICY "Public access to app_data" ON bankroll.app_data FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 11. Initial default records (only inserted if table is empty)
INSERT INTO bankroll.settings (id, group_name, founded, default_weekly_amount, penalty_rule, last_updated)
VALUES ('default', 'Bankroll Brotherhood', CURRENT_DATE::text, 250, 'KES 50 late fee for each missed Saturday contribution.', 0)
ON CONFLICT (id) DO NOTHING;
