// src/hooks/useLojistaId.js

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useLojistaId = () => {
  const [lojistaId, setLojistaId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLojistaId = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setLojistaId(user.id);
        }
      } catch (error) {
        console.error('Erro ao buscar ID do lojista:', error);
      } finally {
        setLoading(false);
      }
    };

    getLojistaId();
  }, []);

  return { lojistaId, loading };
};