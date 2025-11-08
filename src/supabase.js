// web-consultor/src/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vluxffbornrlxcepqmzr.supabase.co'; 

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsdXhmZmJvcm5ybHhjZXBxbXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NjMwNjYsImV4cCI6MjA3NzMyMzA2Nn0.7IgS0b1O6evLN7QMvWu4BhI6awxNs_Eb0yuTAEmJHas'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const fetchAnalytics = async (consultantId) => {
    const { count: totalMessages, error: countError } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('user_type', 'consultant'); 

    if (countError) {
        console.error('Erro ao buscar analytics:', countError);
        return {};
    }
    const dailyCount = Math.floor(totalMessages / 5); 

    // Item 1: Tempo Médio de Atendimento (Simulação)
    const avgTime = dailyCount > 0 ? `${(45 / dailyCount).toFixed(1)} min` : '0 min';

    // Item 3: Valor de Comissão (Simulação baseada na contagem)
    const commissionValue = `R$ ${(dailyCount * 12.50).toFixed(2)}`; // R$ 12,50 por atendimento

    // --- DADOS REAIS MOCKADOS (Sem busca de DB por enquanto) ---
    return {
        dailyCount: dailyCount,
        avgTime: avgTime,
        commissionValue: commissionValue,
        // Mantemos os mocks para as outras 10 métricas
        closedSales: 8,             
        qrCodesSent: 25,            
        indicatedConsultants: 3,    
        rating: 4.8,                
        associatedStores: ['Magazine X', 'Loja Y'], 
        associatedSegments: ['Eletrônicos', 'Decoração']
    };
};