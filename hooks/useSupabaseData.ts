import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export function useSupabaseTable<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: result, error: fetchError } = await supabase
          .from(tableName)
          .select('*');
        
        if (fetchError) throw fetchError;
        setData(result || []);
      } catch (e: any) {
        console.error(`Error fetching from ${tableName}:`, e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}