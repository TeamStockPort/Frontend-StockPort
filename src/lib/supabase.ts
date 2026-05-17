import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export class SupabaseConfigError extends Error {
  constructor() {
    super("인증 서비스 설정이 누락되었습니다. 잠시 후 다시 시도해주세요.");
    this.name = "SupabaseConfigError";
  }
}

function createUnconfiguredClient(): SupabaseClient {
  const handler: ProxyHandler<object> = {
    get() {
      throw new SupabaseConfigError();
    },
  };
  return new Proxy({}, handler) as SupabaseClient;
}

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createUnconfiguredClient();
