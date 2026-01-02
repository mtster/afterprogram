import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export function useSupabaseTable<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tableName) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { data: result, error: fetchError } = await supabase
          .from(tableName)
          .select('*');
        
        if (fetchError) throw fetchError;
        // Ensure result is an array
        setData(Array.isArray(result) ? result : []);
      } catch (e: any) {
        console.error(`Error fetching from ${tableName}:`, e.message);
        setError(e.message);
        setData([]); 
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}