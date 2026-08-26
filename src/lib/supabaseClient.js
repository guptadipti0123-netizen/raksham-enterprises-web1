import { createClient } from '@supabase/supabase-js';

// Default / fallback configuration
// In production on Vercel, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Environment Variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://raksham-enterprises-db.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummyKeyForOfflineFallback';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
