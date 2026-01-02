import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = 'https://ikvknwofsdlnyoiobgeu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrdmtud29mc2RsbnlvaW9iZ2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNDgwMTgsImV4cCI6MjA4MjkyNDAxOH0.OIBOcq0EQReyGykuSOTAVS9zww_FRMvDxdQ7_arIQxk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);