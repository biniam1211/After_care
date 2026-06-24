// Provide dummy env so env-coupled modules import cleanly in tests.
// No real keys: the Claude client falls back to its fake responder, and any
// Supabase calls are mocked per-test.
process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL ??= 'https://test.supabase.co';
process.env.SUPABASE_ANON_KEY ??= 'test-anon';
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'test-service-role';
// ANTHROPIC_API_KEY intentionally left unset → fake Claude responder.
