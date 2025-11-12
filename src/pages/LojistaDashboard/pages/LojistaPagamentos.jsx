import React, { useState } from "react";

const LojistaPagamentos = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState("premium");
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

  const planos = [
    {
      id: "basico",
      nome: "Plano Básico",
      valor: 99.90,
      ciclo: "mensal",
      beneficios: [
        "Até 3 consultores",
        "Relatórios básicos",
        "5 campanhas/mês",
        "Suporte por email"
      ]
    },
    {
      id: "premium",
      nome: "Plano Premium",
      valor: 299.90,
      ciclo: "mensal",
      beneficios: [
        "Até 10 consultores",
        "Relatórios avançados",
        "Campanhas ilimitadas",
        "Suporte prioritário",
        "API de integração"
      ]
    },
    {
      id: "empresarial",
      nome: "Plano Empresarial",
      valor: 599.90,
      ciclo: "mensal",
      beneficios: [
        "Consultores ilimitados",
        "Dashboard personalizado",
        "Analytics em tempo real",
        "Suporte dedicado",
        "Integração completa"
      ]
    }
  ];

  const faturas = [
    { id: 1, mes: "Novembro 2024", valor: 299.90, status: "paga", data: "15/11/2024", downloadUrl: "#" },
    { id: 2, mes: "Outubro 2024", valor: 299.90, status: "paga", data: "15/10/2024", downloadUrl: "#" },
    { id: 3, mes: "Setembro 2024", valor: 299.90, status: "paga", data: "15/09/2024", downloadUrl: "#" },
    { id: 4, mes: "Dezembro 2024", valor: 299.90, status: "pendente", data: "15/12/2024", downloadUrl: "#" }
  ];

  const handleDownloadFatura = async (fatura) => {
    try {
      // Simulação de geração de PDF
      const response = await fetch('/api/gerar-fatura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faturaId: fatura.id })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fatura-${fatura.mes.toLowerCase().replace(' ', '-')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      // Fallback: Abrir em nova aba
      window.open(fatura.downloadUrl, '_blank');
    }
  };

  const handleCheckout = () => {
    // Integração com gateway de pagamento
    setMostrarCheckout(true);
    
    // Exemplo com Stripe
    // const stripe = await loadStripe('pk_test_seu_token');
    // const { error } = await stripe.redirectToCheckout({
    //   lineItems: [{ price: 'price_xxx', quantity: 1 }],
    //   mode: 'subscription',
    //   successUrl: `${window.location.origin}/lojista/pagamento/sucesso`,
    //   cancelUrl: `${window.location.origin}/lojista/pagamentos`
    // });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ color: "#2c5aa0", marginBottom: "30px" }}>💳 Gestão de Pagamentos</h1>

      {/* Seleção de Plano */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        <h2 style={{ color: "#2c5aa0", marginBottom: "25px" }}>📋 Escolha seu Plano</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
          {planos.map(plano => (
            <div 
              key={plano.id}
              style={{ 
                border: planoSelecionado === plano.id ? "2px solid #2c5aa0" : "1px solid #ddd",
                borderRadius: "8px",
                padding: "25px",
                backgroundColor: planoSelecionado === plano.id ? "#f0f7ff" : "white",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onClick={() => setPlanoSelecionado(plano.id)}
            >
              <h3 style={{ color: "#2c5aa0", marginBottom: "10px" }}>{plano.nome}</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2c5aa0", margin: "0 0 15px 0" }}>
                R$ {plano.valor.toFixed(2)}
                <span style={{ fontSize: "14px", color: "#666", fontWeight: "normal" }}>/mês</span>
              </p>
              
              <ul style={{ paddingLeft: "20px", margin: "0 0 20px 0" }}>
                {plano.beneficios.map((beneficio, index) => (
                  <li key={index} style={{ marginBottom: "8px", fontSize: "14px", color: "#555" }}>
                    ✅ {beneficio}
                  </li>
                ))}
              </ul>
              
              {planoSelecionado === plano.id && (
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={handleCheckout}
                    style={{
                      backgroundColor: "#2c5aa0",
                      color: "white",
                      padding: "12px 30px",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    🚀 Assinar Agora
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: "#fff3e0", 
          padding: "15px", 
          borderRadius: "6px",
          border: "1px solid #ffb74d"
        }}>
          <strong>💡 Dica de Segurança:</strong> Recomendamos o uso de cartões virtuais para assinaturas recorrentes. 
          É mais seguro e você pode controlar melhor seus gastos!
        </div>
      </div>

      {/* Informações de Pagamento Atual */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        <h2 style={{ color: "#2c5aa0", marginBottom: "25px" }}>🔒 Método de Pagamento</h2>
        
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "20px", 
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                **** **** **** 1234
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                Válido até: 12/25
              </div>
            </div>
            
            <div>
              <span style={{ 
                padding: "6px 12px", 
                backgroundColor: "#e8f5e8",
                color: "#2e7d32",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                ATIVO
              </span>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "#e3f2fd", 
          padding: "15px", 
          borderRadius: "6px",
          border: "1px solid #2196f3"
        }}>
          <strong>🔐 Segurança:</strong> Seus dados de cartão são processados de forma segura pelo nosso parceiro de pagamento. 
          Nós não temos acesso aos números completos do seu cartão.
        </div>

        <button
          style={{
            backgroundColor: "transparent",
            color: "#2c5aa0",
            border: "1px solid #2c5aa0",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "15px"
          }}
          onClick={() => setMostrarCheckout(true)}
        >
          ✏️ Alterar Método de Pagamento
        </button>
      </div>

      {/* Histórico de Faturas */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#2c5aa0", marginBottom: "25px" }}>📄 Faturas e Notas Fiscais</h2>
        
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Mês/Ano</th>
                <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Valor</th>
                <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Data</th>
                <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {faturas.map(fatura => (
                <tr key={fatura.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>
                    <strong>{fatura.mes}</strong>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "bold" }}>
                    R$ {fatura.valor.toFixed(2)}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: fatura.status === 'paga' ? "#e8f5e8" : "#fff3e0",
                      color: fatura.status === 'paga' ? "#2e7d32" : "#ef6c00"
                    }}>
                      {fatura.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#666" }}>
                    {fatura.data}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => handleDownloadFatura(fatura)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#2c5aa0",
                        border: "1px solid #2c5aa0",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      📥 PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <strong>📧 Envio Automático:</strong> Faturas e notas fiscais são enviadas para seu e-mail cadastrado em cada cobrança.
        </div>
      </div>

      {/* Checkout Modal (Simulação) */}
      {mostrarCheckout && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "90%"
          }}>
            <h3 style={{ color: "#2c5aa0", marginBottom: "20px" }}>🔒 Redirecionando para Pagamento Seguro</h3>
            <p style={{ marginBottom: "20px" }}>
              Você será redirecionado para nosso parceiro de pagamento para inserir os dados do cartão de forma segura.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setMostrarCheckout(false)}
                style={{
                  backgroundColor: "transparent",
                  color: "#666",
                  border: "1px solid #ddd",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: "#2c5aa0",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LojistaPagamentos;