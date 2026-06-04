import { createClient } from "@supabase/supabase-js";

// Created on first use (not at import time) so a missing env var during
// the build never crashes the deploy. On Vercel, set both variables under
// Project Settings > Environment Variables.
let client = null;

export function getSupabase() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  client = createClient(url, anonKey);
  return client;
}
