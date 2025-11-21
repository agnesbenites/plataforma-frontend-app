// src/pages/LojistaDashboard/pages/LojistaPagamentos.jsx
import React, { useState } from "react";

const LojistaPagamentos = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState("pro");
  const [metodoPagamento, setMetodoPagamento] = useState("google_pay");

  const planos = [
    {
      id: "basico",
      nome: "Básico",
      preco: 97,
      periodo: "mês",
      recursos: ["5 consultores", "100 produtos", "Relatórios básicos"]
    },
    {
      id: "pro", 
      nome: "Profissional",
      preco: 197,
      periodo: "mês",
      recursos: ["Consultores ilimitados", "Produtos ilimitados", "Relatórios avançados", "Suporte prioritário"]
    },
    {
      id: "empresa",
      nome: "Empresa", 
      preco: 397,
      periodo: "mês",
      recursos: ["Todos os recursos Pro", "API exclusiva", "Consultoria personalizada"]
    }
  ];

  const metodosPagamento = [
    {
      id: "google_pay",
      nome: "Google Pay",
      icone: "🔵",
      descricao: "Pagamento rápido e seguro"
    },
    {
      id: "pix", 
      nome: "PIX",
      icone: "💜",
      descricao: "Pagamento instantâneo"
    },
    {
      id: "cartao",
      nome: "Cartão de Crédito",
      icone: "💳",
      descricao: "Múltiplas bandeiras"
    }
  ];

  const handleAssinatura = async () => {
    // Aqui vai a integração com a API de pagamento
    if (metodoPagamento === "google_pay") {
      await processarGooglePay();
    } else if (metodoPagamento === "pix") {
      await gerarPix();
    } else {
      await processarCartao();
    }
  };

  const processarGooglePay = async () => {
    // Integração com Google Pay API
    try {
      // Código de integração com Google Pay
      alert("Redirecionando para Google Pay...");
      // window.location.href = "https://pay.google.com/...";
    } catch (error) {
      alert("Erro no Google Pay: " + error.message);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ color: "#2c5aa0", marginBottom: "10px" }}>💳 Assinatura e Pagamentos</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Escolha seu plano e forma de pagamento</p>

      {/* Seleção de Plano */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>📦 Escolha seu Plano</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {planos.map(plano => (
            <div 
              key={plano.id}
              style={{
                padding: "25px",
                border: planoSelecionado === plano.id ? "2px solid #2c5aa0" : "1px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "white",
                cursor: "pointer",
                textAlign: "center"
              }}
              onClick={() => setPlanoSelecionado(plano.id)}
            >
              <h3 style={{ color: "#2c5aa0" }}>{plano.nome}</h3>
              <div style={{ fontSize: "2rem", fontWeight: "bold", margin: "15px 0" }}>
                R$ {plano.preco}
                <span style={{ fontSize: "1rem", color: "#666" }}>/{plano.periodo}</span>
              </div>
              <ul style={{ textAlign: "left", marginBottom: "20px" }}>
                {plano.recursos.map((recurso, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>✅ {recurso}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Métodos de Pagamento */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>🔗 Forma de Pagamento</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          {metodosPagamento.map(metodo => (
            <div
              key={metodo.id}
              style={{
                padding: "20px",
                border: metodoPagamento === metodo.id ? "2px solid #2c5aa0" : "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "white",
                cursor: "pointer",
                textAlign: "center"
              }}
              onClick={() => setMetodoPagamento(metodo.id)}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{metodo.icone}</div>
              <h4 style={{ margin: "0 0 5px 0" }}>{metodo.nome}</h4>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{metodo.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo e Botão de Pagamento */}
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "25px", 
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <h3>📋 Resumo da Assinatura</h3>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
          <span>Plano {planos.find(p => p.id === planoSelecionado)?.nome}:</span>
          <span style={{ fontWeight: "bold" }}>
            R$ {planos.find(p => p.id === planoSelecionado)?.preco}/mês
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
          <span>Forma de pagamento:</span>
          <span style={{ fontWeight: "bold" }}>
            {metodosPagamento.find(m => m.id === metodoPagamento)?.nome}
          </span>
        </div>
        
        <button
          onClick={handleAssinatura}
          style={{
            backgroundColor: "#2c5aa0",
            color: "white",
            border: "none",
            padding: "15px 40px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          💰 Assinar Agora
        </button>
      </div>
    </div>
  );
};

export default LojistaPagamentos;