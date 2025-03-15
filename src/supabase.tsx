import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://quaobmjerksaujqlspoz.supabase.co';
const VITE_ANON_KEY = process.env.VITE_ANON_KEY ?? "";

export const supabase = createClient(SUPABASE_URL, VITE_ANON_KEY);