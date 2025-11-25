import React, { useState, useEffect, useMemo } from 'react';

// ** CHAVE PÚBLICA DO STRIPE **
// Em um ambiente de produção real, esta chave seria carregada por uma variável de ambiente.
const STRIPE_PUBLIC_KEY = 'pk_test_51SSn4VC0uDNlEzVIDhiWJ4cvdVqqmCDhuLLJZtw1hCHTpZEKFrlqIZ7HSUWrmm0pyPwOKvB9iSM9OpQ8kLBG8V65006ujiuHoM'; 

// ** IDs DE PREÇO DO STRIPE (MOCKS) **
const PLAN_PRICE_IDS = {
  basico: 'price_1SSnHlC0uDNlEzVIS6g6lhwb',
  premium: 'price_1SSnKCC0uDNlEzVIx0BXe0h9',
  empresarial: 'price_1SSnKdC0uDNlEzVIqMhLxUXv',
};

// ** LIMITES POR PLANO **
const PLAN_LIMITS = {
  basico: {
    lojas: 3, // 1 matriz + 2 filiais
    vendedores: 5,
    consultores: 3,
    produtos: 100,
    campanhas: 5,
    relatorios: 'básicos',
    suporte: 'email',
    integracaoERP: false
  },
  premium: {
    lojas: Infinity,
    vendedores: 20,
    consultores: 10,
    produtos: Infinity,
    campanhas: Infinity,
    relatorios: 'avançados',
    suporte: 'prioritário',
    integracaoERP: true
  },
  empresarial: {
    lojas: Infinity,
    vendedores: Infinity,
    consultores: Infinity,
    produtos: Infinity,
    campanhas: Infinity,
    relatorios: 'em tempo real',
    suporte: 'dedicado 24/7',
    integracaoERP: true
  }
};

// Função para carregar o Stripe.js
const loadStripeFromCDN = (publicKey) => {
  return new Promise((resolve, reject) => {
    if (window.Stripe) {
      resolve(window.Stripe(publicKey));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;

    script.onload = () => {
      if (window.Stripe) {
        resolve(window.Stripe(publicKey));
      } else {
        reject(new Error("Stripe.js loaded but Stripe object not found."));
      }
    };
    
    script.onerror = () => {
        reject(new Error("Falha ao carregar o script do Stripe.js."));
    };

    document.head.appendChild(script);
  });
};

const LojistaPagamentos = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState("premium");
  const [planoAtual, setPlanoAtual] = useState("premium"); // Plano atual do usuário (mock)
  const [mostrarModalCheckout, setMostrarModalCheckout] = useState(false);
  const [stripeInstance, setStripeInstance] = useState(null);
  const [loadingStripe, setLoadingStripe] = useState(true);
  const [message, setMessage] = useState(null);
  const [loadingFaturas, setLoadingFaturas] = useState(false);

  // Carregar Stripe.js
  useEffect(() => {
    const loadStripeClient = async () => {
      try {
        const stripe = await loadStripeFromCDN(STRIPE_PUBLIC_KEY);
        setStripeInstance(stripe);
        setLoadingStripe(false);
      } catch (error) {
        console.error("Erro ao carregar Stripe.js:", error);
        setMessage("Não foi possível carregar o serviço de pagamento. Tente novamente.");
        setLoadingStripe(false);
      }
    };
    loadStripeClient();
  }, []);

  // Planos com limites específicos
  const planos = useMemo(() => ([
    {
      id: "basico",
      nome: "Plano Básico",
      valor: 99.90,
      ciclo: "mensal",
      popular: false,
      limites: PLAN_LIMITS.basico,
      beneficios: [
        `🏪 ${PLAN_LIMITS.basico.lojas} Lojas (1 + 2 filiais)`,
        `👥 ${PLAN_LIMITS.basico.vendedores} Vendedores`,
        `🔍 ${PLAN_LIMITS.basico.consultores} Consultores`,
        `📦 ${PLAN_LIMITS.basico.produtos} Produtos`,
        `📊 Relatórios ${PLAN_LIMITS.basico.relatorios}`,
        `📧 Suporte ${PLAN_LIMITS.basico.suporte}`,
        `🎯 ${PLAN_LIMITS.basico.campanhas} campanhas/mês`
      ]
    },
    {
      id: "premium",
      nome: "Plano Premium",
      valor: 299.90,
      ciclo: "mensal",
      popular: true,
      limites: PLAN_LIMITS.premium,
      beneficios: [
        `🏪 Lojas Ilimitadas`,
        `👥 ${PLAN_LIMITS.premium.vendedores} Vendedores`,
        `🔍 ${PLAN_LIMITS.premium.consultores} Consultores`,
        `📦 Produtos Ilimitados`,
        `📊 Relatórios ${PLAN_LIMITS.premium.relatorios}`,
        `🚀 Suporte ${PLAN_LIMITS.premium.suporte}`,
        `🎯 Campanhas Ilimitadas`,
        `🔌 API de Integração`
      ]
    },
    {
      id: "empresarial",
      nome: "Plano Empresarial",
      valor: 599.90,
      ciclo: "mensal",
      popular: false,
      limites: PLAN_LIMITS.empresarial,
      beneficios: [
        `🏪 Lojas Ilimitadas`,
        `👥 Vendedores Ilimitados`,
        `🔍 Consultores Ilimitados`,
        `📦 Produtos Ilimitados`,
        `📊 ${PLAN_LIMITS.empresarial.relatorios}`,
        `🎯 Campanhas Ilimitadas`,
        `🔌 Integração Completa`,
        `🏢 ERP Odoo Integrado`,
        `🛡️ ${PLAN_LIMITS.empresarial.suporte}`
      ]
    }
  ]), []);

  // Estado para faturas (inicialmente vazio, carrega da API)
  const [faturas, setFaturas] = useState([]);

  // Carregar faturas da API
  useEffect(() => {
    const carregarFaturas = async () => {
      setLoadingFaturas(true);
      try {
        // SIMULAÇÃO: Esta rota /api/faturas não existe neste contexto. 
        // Em produção, ela buscaria dados do Stripe ou do seu backend.
        const response = await fetch('/api/faturas');
        
        if (response.ok) {
          const faturasData = await response.json();
          setFaturas(faturasData);
        } else {
          // Fallback para dados mockados se a API falhar ou não existir
          setFaturas([
            { id: 'in_1A0B1C', mes: "Novembro 2024", valor: planos.find(p => p.id === planoAtual)?.valor || 299.90, status: "paga", data: "15/11/2024", downloadUrl: "#" },
            { id: 'in_2B1C2D', mes: "Outubro 2024", valor: planos.find(p => p.id === planoAtual)?.valor || 299.90, status: "paga", data: "15/10/2024", downloadUrl: "#" },
            { id: 'in_3C2D3E', mes: "Setembro 2024", valor: planos.find(p => p.id === planoAtual)?.valor || 299.90, status: "paga", data: "15/09/2024", downloadUrl: "#" },
            { id: 'in_4D3E4F', mes: "Dezembro 2024", valor: planos.find(p => p.id === planoAtual)?.valor || 299.90, status: "pendente", data: "15/12/2024", downloadUrl: "#" }
          ]);
        }
      } catch (error) {
        console.error('Erro ao carregar faturas:', error);
        setMessage('Erro ao carregar histórico de faturas');
      } finally {
        setLoadingFaturas(false);
      }
    };

    carregarFaturas();
  }, [planoAtual, planos]);

  // Simulação de forma de pagamento atual
  const cartaoAtual = {
    final: '1234',
    validade: '12/25',
    tipo: 'Visa'
  };

  // Função para verificar se pode fazer upgrade/downgrade (simplificado)
  const podeMudarPlano = (novoPlano) => {
    // Implementar lógica de validação de limites (Ex: não permitir downgrade se houver 5 filiais no plano básico)
    return true;
  };

  const handleDownloadFatura = async (fatura) => {
    if (fatura.status !== 'paga') {
      setMessage("A fatura não está paga e o download não está disponível.");
      return;
    }

    try {
      setMessage("Preparando download da fatura...");
      
      // 🛑 Esta rota precisa ser implementada no seu backend para gerar o PDF real
      const response = await fetch('/api/gerar-fatura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faturaId: fatura.id })
      });

      if (response.ok) {
        // Simulação de download de Blob (o backend retornaria um PDF)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `fatura-${fatura.mes.replace(/\s/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage("Download iniciado com sucesso!");
      } else {
        // Mock: Se a API falhar, simula que o download não está pronto
        const errorData = await response.json().catch(() => ({ message: 'A fatura (PDF) não está disponível no mock de API.' }));
        setMessage(`Erro ao baixar: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro de rede/API ao tentar baixar. Verifique o console.");
    }
  };
  
  const initiateStripeCheckout = async () => {
    if (!stripeInstance) {
      setMessage("Serviço de pagamento não carregado.");
      return;
    }
    
    if (!podeMudarPlano(planoSelecionado)) {
      setMessage("Não é possível alterar para este plano devido a restrições atuais.");
      return;
    }

    setMostrarModalCheckout(false);
    setMessage("Redirecionando para o checkout seguro...");

    const priceId = PLAN_PRICE_IDS[planoSelecionado];

    try {
      // Este é o fluxo de pagamento real via Stripe Checkout
      const { error } = await stripeInstance.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        // URLs de sucesso e cancelamento devem apontar para suas rotas
        successUrl: `${window.location.origin}/lojista/pagamentos/sucesso?plano=${planoSelecionado}`,
        cancelUrl: `${window.location.origin}/lojista/dashboard/pagamentos`,
        // Opcional: Adicionar Customer Email para pré-preenchimento
        // customerEmail: 'lojista@exemplo.com.br' 
      });

      if (error) {
        console.error('Erro ao redirecionar para o checkout:', error.message);
        setMessage(`Falha no checkout: ${error.message}`);
      }
    } catch (e) {
      console.error('Erro de Stripe:', e);
      setMessage("Ocorreu um erro inesperado ao processar o pagamento.");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'paga': return 'bg-green-100 text-green-700';
      case 'pendente': return 'bg-yellow-100 text-yellow-700';
      case 'vencida': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Função auxiliar para exibir limites
  const renderLimite = (valor) => {
    return valor === Infinity ? 'Ilimitado' : valor;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold text-[#2c5aa0] border-b pb-2">
          💳 Gestão de Pagamentos e Planos
        </h1>
        
        {message && (
          <div className={`p-4 rounded-lg border shadow-sm font-medium ${message.includes('Erro') || message.includes('Falha') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
            {message}
          </div>
        )}

        {/* Plano Atual e Limites */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-[#2c5aa0] mb-4">📊 Seu Plano Atual: <span className="text-blue-600 capitalize">{planoAtual}</span></h2>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-800">Plano</div>
              <div className="text-lg font-bold">{planos.find(p => p.id === planoAtual)?.nome}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-800">Lojas</div>
              <div className="text-lg font-bold">{renderLimite(PLAN_LIMITS[planoAtual].lojas)}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-800">Vendedores</div>
              <div className="text-lg font-bold">{renderLimite(PLAN_LIMITS[planoAtual].vendedores)}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="font-semibold text-orange-800">Consultores</div>
              <div className="text-lg font-bold">{renderLimite(PLAN_LIMITS[planoAtual].consultores)}</div>
            </div>
          </div>
        </section>

        {/* Seleção de Plano */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-[#2c5aa0] mb-6">📋 Alterar Plano</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {planos.map(plano => (
              <div
                key={plano.id}
                onClick={() => setPlanoSelecionado(plano.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 relative ${
                  planoSelecionado === plano.id 
                    ? 'border-[#2c5aa0] bg-[#f0f7ff] shadow-xl scale-[1.02]' 
                    : 'border-gray-200 hover:border-blue-300'
                } ${plano.popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {plano.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    MAIS POPULAR
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-[#2c5aa0] mb-2">{plano.nome}</h3>
                <p className="text-3xl font-extrabold text-[#2c5aa0] mb-4">
                  R$ {plano.valor.toFixed(2)}
                  <span className="text-base text-gray-500 font-normal">/mês</span>
                </p>
                
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {plano.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {beneficio}
                    </li>
                  ))}
                </ul>
                
                {/* Botão de Ação do Plano */}
                <button
                  onClick={() => plano.id === planoAtual ? null : setMostrarModalCheckout(true)}
                  disabled={loadingStripe || plano.id === planoAtual}
                  className={`w-full py-3 px-4 rounded-lg font-bold transition-colors shadow-md 
                    ${loadingStripe 
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                        : plano.id === planoAtual
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-[#2c5aa0] text-white hover:bg-[#1a407a]'
                    }`}
                >
                  {loadingStripe ? 'Carregando...' : 
                   plano.id === planoAtual ? 'Plano Atual' : 
                   (plano.id === 'empresarial' && planoAtual === 'premium') || (plano.id === 'premium' && planoAtual === 'basico') ? '✨ Fazer Upgrade' :
                   (plano.id === 'basico' && planoAtual === 'premium') ? '⬇️ Fazer Downgrade' :
                   '🚀 Assinar Agora'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Informações de Pagamento Atual */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-[#2c5aa0] mb-6">🔒 Método de Pagamento Atual</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex justify-between items-center">
            <div>
              <div className="text-lg font-bold text-gray-800">
                {cartaoAtual.tipo} **** **** **** {cartaoAtual.final}
              </div>
              <div className="text-sm text-gray-500">
                Vencimento: {cartaoAtual.validade}
              </div>
            </div>
            
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              ATIVO
            </span>
          </div>

          <button
            className="px-4 py-2 text-sm font-medium rounded-lg text-[#2c5aa0] border border-[#2c5aa0] hover:bg-blue-50 transition-colors"
            onClick={() => {
                setPlanoSelecionado(planoAtual); // Altera o plano selecionado para o atual
                setMostrarModalCheckout(true)
            }}
          >
            ✏️ Atualizar Dados do Cartão
          </button>
        </section>

        {/* Histórico de Faturas */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-[#2c5aa0] mb-6">📄 Histórico de Faturas</h2>
          
          {loadingFaturas ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c5aa0] mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando faturas...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês/Ano</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {faturas.map(fatura => (
                      <tr key={fatura.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {fatura.mes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                          R$ {fatura.valor.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(fatura.status)}`}>
                            {fatura.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {fatura.data}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => handleDownloadFatura(fatura)}
                            disabled={fatura.status !== 'paga'}
                            className={`inline-flex items-center px-3 py-1 border text-xs font-medium rounded-lg transition-colors
                              ${fatura.status === 'paga' 
                                ? 'border-[#2c5aa0] bg-[#2c5aa0] text-white hover:bg-[#1a407a] shadow-sm' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                              }`}
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {faturas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma fatura encontrada.
                </div>
              )}
            </>
          )}
        </section>

      </div>
      
      {/* Modal de Checkout */}
      {mostrarModalCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full space-y-4">
            <h3 className="text-xl font-bold text-[#2c5aa0]">
              🔒 {planoSelecionado === planoAtual ? 'Atualizar Pagamento' : 'Checkout Seguro'}
            </h3>
            <p className="text-gray-700">
              Você será redirecionado para o ambiente seguro do Stripe para 
              {planoSelecionado === planoAtual ? ' atualizar suas informações de cartão.' : ` finalizar a assinatura do ${planos.find(p => p.id === planoSelecionado)?.nome}.`}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setMostrarModalCheckout(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={initiateStripeCheckout}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Continuar para Pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LojistaPagamentos;