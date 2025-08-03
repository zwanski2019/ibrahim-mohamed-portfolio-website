import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_ANON_KEY as string
);
