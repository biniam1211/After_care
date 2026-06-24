import 'dotenv/config';

/**
 * Small typed accessor for environment variables.
 * `required` throws at boot so misconfiguration fails fast and loud.
 */
function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

function optional(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: optional('NODE_ENV', 'development'),

  supabaseUrl: required('SUPABASE_URL'),
  supabaseAnonKey: required('SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: required('SUPABASE_SERVICE_ROLE_KEY'),

  anthropicApiKey: required('ANTHROPIC_API_KEY'),
  claudeModel: optional('CLAUDE_MODEL', 'claude-sonnet-4-6'),

  voyageApiKey: optional('VOYAGE_API_KEY'),
  embeddingDim: Number(process.env.EMBEDDING_DIM ?? 1536),

  twilioAccountSid: optional('TWILIO_ACCOUNT_SID'),
  twilioAuthToken: optional('TWILIO_AUTH_TOKEN'),
  twilioFromNumber: optional('TWILIO_FROM_NUMBER'),
};
