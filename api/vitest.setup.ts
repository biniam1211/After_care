// Provide dummy env so env-coupled modules import cleanly in tests.
// No real keys: the Claude client falls back to its fake responder, and any
// Supabase calls are mocked per-test.
process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL ??= 'https://test.supabase.co';
process.env.SUPABASE_ANON_KEY ??= 'test-anon';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'test-service-role';
// Force fake providers even when a developer's local .env has real keys —
// the suite must be hermetic (no network) everywhere, not just in CI.
// Set to '' (not delete): dotenv, loaded later by lib/env.ts, does not override
// keys already present in process.env, and '' is falsy so fake mode engages.
process.env.ANTHROPIC_API_KEY = '';
process.env.OPENAI_API_KEY = '';
process.env.VOYAGE_API_KEY = '';
process.env.TWILIO_ACCOUNT_SID = '';
process.env.TWILIO_AUTH_TOKEN = '';
