import React, { useState } from "react";

const LojistaRelatorios = () => {
  const [periodo, setPeriodo] = useState("mensal");
  const [lojaSelecionada, setLojaSelecionada] = useState("todas");

  // Dados mockados melhorados
  const consultores = [
    { id: "CONS-001", nome: "Ana Silva", loja: "Loja Centro", clientesAtendidos: 45, vendasGeradas: 28900, comissao: 2890 },
    { id: "CONS-002", nome: "Carlos Santos", loja: "Loja Shopping", clientesAtendidos: 32, vendasGeradas: 15600, comissao: 1560 },
    { id: "CONS-003", nome: "Marina Oliveira", loja: "Loja Centro", clientesAtendidos: 58, vendasGeradas: 34200, comissao: 3420 },
    { id: "CONS-004", nome: "Ricardo Lima", loja: "Loja Shopping", clientesAtendidos: 41, vendasGeradas: 19800, comissao: 1980 },
  ];

  const campanhas = [
    { 
      id: 1, 
      nome: "Black Friday 2024", 
      periodo: "Nov 2024", 
      investimento: 5000, 
      vendasCampanha: 125000, 
      lucro: 37500,
      roi: 650,
      status: "concluída"
    },
    { 
      id: 2, 
      nome: "Dia das Mães", 
      periodo: "Mai 2024", 
      investimento: 2500, 
      vendasCampanha: 78000, 
      lucro: 23400,
      roi: 836,
      status: "concluída"
    },
    { 
      id: 3, 
      nome: "Volta às Aulas", 
      periodo: "Jan 2024", 
      investimento: 1800, 
      vendasCampanha: 45000, 
      lucro: 13500,
      roi: 650,
      status: "concluída"
    },
    { 
      id: 4, 
      nome: "Natal 2024", 
      periodo: "Dez 2024", 
      investimento: 3500, 
      vendasCampanha: 0, 
      lucro: 0,
      roi: 0,
      status: "planejada"
    }
  ];

  const metricasPlataforma = {
    clientesNovos: 167,
    aumentoVendas: 42, // %
    vendasAtribuidasPlataforma: 98500,
    taxaConversao: 28, // %
    tempoMedioAtendimento: "12 min",
    satisfacaoClientes: 4.7 // /5
  };

  const produtosMaisVendidos = [
    { id: 1, nome: "Smartphone XYZ", vendas: 45, estoque: 12, valor: 899.99 },
    { id: 2, nome: "Notebook ABC", vendas: 28, estoque: 5, valor: 2499.99 },
    { id: 3, nome: "Tablet 10''", vendas: 22, estoque: 8, valor: 599.99 },
    { id: 4, nome: "Fone Bluetooth", vendas: 18, estoque: 15, valor: 199.99 },
  ];

  const [novaCampanha, setNovaCampanha] = useState({
    nome: "",
    investimento: "",
    dataInicio: "",
    dataFim: "",
    desconto: 15
  });

  const handleCriarCampanha = () => {
    if (novaCampanha.nome && novaCampanha.investimento && novaCampanha.dataInicio && novaCampanha.dataFim) {
      alert(`Campanha "${novaCampanha.nome}" criada com sucesso!`);
      setNovaCampanha({
        nome: "",
        investimento: "",
        dataInicio: "",
        dataFim: "",
        desconto: 15
      });
    } else {
      alert("Preencha todos os campos da campanha!");
    }
  };

  // Cálculos
  const totalVendasConsultores = consultores.reduce((sum, c) => sum + c.vendasGeradas, 0);
  const totalComissao = consultores.reduce((sum, c) => sum + c.comissao, 0);
  const totalClientesAtendidos = consultores.reduce((sum, c) => sum + c.clientesAtendidos, 0);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ color: "#2c5aa0", marginBottom: "10px" }}>📊 Relatórios de Performance</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Acompanhe o retorno do seu investimento na plataforma</p>
      
      {/* Filtros */}
      <div style={{ 
        marginBottom: "30px", 
        display: "flex", 
        gap: "20px", 
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px"
      }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Período:</label>
          <select 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd" }}
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
          </select>
        </div>
      </div>

      {/* Métricas da Plataforma */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "20px", 
        marginBottom: "40px" 
      }}>
        <div style={{ padding: "25px", backgroundColor: "#e8f5e8", borderRadius: "8px", textAlign: "center" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>👥 Novos Clientes</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0, color: "#2e7d32" }}>
            +{metricasPlataforma.clientesNovos}
          </p>
          <p style={{ margin: "5px 0 0 0", color: "#2e7d32" }}>via plataforma</p>
        </div>
        
        <div style={{ padding: "25px", backgroundColor: "#e3f2fd", borderRadius: "8px", textAlign: "center" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#1565c0" }}>📈 Aumento nas Vendas</h3>
          <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0, color: "#1565c0" }}>
            +{metricasPlataforma.aumentoVendas}%
          </p>
          <p style={{ margin: "5px 0 0 0", color: "#1565c0" }}>com consultores</p>
        </div>
        
        <div style={{ padding: "25px", backgroundColor: "#fff3e0", borderRadius: "8px", textAlign: "center" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#ef6c00" }}>💰 Vendas Plataforma</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#ef6c00" }}>
            R$ {metricasPlataforma.vendasAtribuidasPlataforma.toLocaleString('pt-BR')}
          </p>
          <p style={{ margin: "5px 0 0 0", color: "#ef6c00" }}>atribuídas aos consultores</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
        {/* Consultores e Performance */}
        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2c5aa0", marginBottom: "20px" }}>👨‍💼 Consultores - Performance</h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Consultor (ID)</th>
                  <th style={{ padding: "12px", textAlign: "center", borderBottom: "2px solid #ddd" }}>Clientes</th>
                  <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Vendas</th>
                  <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Comissão</th>
                </tr>
              </thead>
              <tbody>
                {consultores.map(consultor => (
                  <tr key={consultor.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>
                      <div>
                        <strong>{consultor.nome}</strong>
                        <div style={{ fontSize: "12px", color: "#666", fontFamily: "monospace" }}>
                          ID: {consultor.id}
                        </div>
                        <div style={{ fontSize: "11px", color: "#999" }}>{consultor.loja}</div>
                      </div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#1565c0" }}>
                      {consultor.clientesAtendidos}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "bold" }}>
                      R$ {consultor.vendasGeradas.toLocaleString('pt-BR')}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#c2185b", fontWeight: "bold" }}>
                      R$ {consultor.comissao.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
                {/* Total */}
                <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
                  <td style={{ padding: "12px" }}>TOTAL</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#1565c0" }}>
                    {totalClientesAtendidos}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    R$ {totalVendasConsultores.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#c2185b" }}>
                    R$ {totalComissao.toLocaleString('pt-BR')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Campanhas Realizadas */}
        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#2c5aa0", marginBottom: "20px" }}>🎯 Performance das Campanhas</h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Campanha</th>
                  <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Investimento</th>
                  <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Vendas</th>
                  <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>ROI</th>
                </tr>
              </thead>
              <tbody>
                {campanhas.map(campanha => (
                  <tr key={campanha.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>
                      <div>
                        <strong>{campanha.nome}</strong>
                        <div style={{ fontSize: "11px", color: "#999" }}>{campanha.periodo}</div>
                        <span style={{ 
                          fontSize: "10px", 
                          padding: "2px 6px", 
                          borderRadius: "10px", 
                          backgroundColor: campanha.status === 'concluída' ? '#e8f5e8' : '#fff3e0',
                          color: campanha.status === 'concluída' ? '#2e7d32' : '#ef6c00'
                        }}>
                          {campanha.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      R$ {campanha.investimento.toLocaleString('pt-BR')}
                    </td>
                    <td style={{ 
                      padding: "12px", 
                      textAlign: "right", 
                      fontWeight: "bold",
                      color: campanha.vendasCampanha > 0 ? "#2e7d32" : "#666"
                    }}>
                      {campanha.vendasCampanha > 0 ? `R$ ${campanha.vendasCampanha.toLocaleString('pt-BR')}` : '-'}
                    </td>
                    <td style={{ 
                      padding: "12px", 
                      textAlign: "right", 
                      fontWeight: "bold",
                      color: campanha.roi > 0 ? "#c2185b" : "#666"
                    }}>
                      {campanha.roi > 0 ? `+${campanha.roi}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Criar Nova Campanha */}
      <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#2c5aa0", marginBottom: "25px" }}>🚀 Criar Nova Campanha</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Nome da Campanha:</label>
            <input
              type="text"
              value={novaCampanha.nome}
              onChange={(e) => setNovaCampanha({...novaCampanha, nome: e.target.value})}
              placeholder="Ex: Dia dos Pais 2024"
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Investimento (R$):</label>
            <input
              type="number"
              value={novaCampanha.investimento}
              onChange={(e) => setNovaCampanha({...novaCampanha, investimento: e.target.value})}
              placeholder="5000"
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "25px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Data Início:</label>
            <input
              type="date"
              value={novaCampanha.dataInicio}
              onChange={(e) => setNovaCampanha({...novaCampanha, dataInicio: e.target.value})}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Data Fim:</label>
            <input
              type="date"
              value={novaCampanha.dataFim}
              onChange={(e) => setNovaCampanha({...novaCampanha, dataFim: e.target.value})}
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Desconto (%):</label>
            <input
              type="number"
              value={novaCampanha.desconto}
              onChange={(e) => setNovaCampanha({...novaCampanha, desconto: parseInt(e.target.value)})}
              min="1"
              max="90"
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px solid #ddd", 
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
        </div>

        <button
          onClick={handleCriarCampanha}
          style={{
            backgroundColor: "#2c5aa0",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          📅 Agendar Campanha
        </button>
      </div>

      {/* Resumo do Valor da Plataforma */}
      <div style={{ 
        backgroundColor: "#e8f5e8", 
        padding: "25px", 
        borderRadius: "8px", 
        marginTop: "30px",
        border: "2px solid #2e7d32"
      }}>
        <h2 style={{ color: "#2e7d32", marginBottom: "15px" }}>💎 Valor da Plataforma</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
          <div>
            <strong>Clientes novos via plataforma:</strong> {metricasPlataforma.clientesNovos}
          </div>
          <div>
            <strong>Aumento nas vendas:</strong> +{metricasPlataforma.aumentoVendas}%
          </div>
          <div>
            <strong>Vendas atribuídas aos consultores:</strong> R$ {metricasPlataforma.vendasAtribuidasPlataforma.toLocaleString('pt-BR')}
          </div>
          <div>
            <strong>Taxa de conversão:</strong> {metricasPlataforma.taxaConversao}%
          </div>
          <div>
            <strong>Satisfação dos clientes:</strong> ⭐ {metricasPlataforma.satisfacaoClientes}/5
          </div>
          <div>
            <strong>Tempo médio de atendimento:</strong> {metricasPlataforma.tempoMedioAtendimento}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LojistaRelatorios;