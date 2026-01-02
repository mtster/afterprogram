import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Safely access environment variables
const getEnv = (key: string) => {
  try {
    return (window as any).process?.env?.[key] || '';
  } catch {
    return '';
  }
};

const supabaseUrl = getEnv('SUPABASE_PUBLIC_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// In development, you might need to handle these if they aren't injected exactly as expected
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);