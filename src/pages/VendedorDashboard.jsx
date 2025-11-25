import React from "react";
// OBRIGATÓRIO: Importar Outlet e Link/useNavigate para rotas aninhadas
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"; 

// === DADOS DE NAVEGAÇÃO DO VENDEDOR (SIDEBAR) ===
const menuItems = [
    // Usando as rotas aninhadas definidas no App.js
    { title: "🏠 Dashboard", rota: "/vendedor/dashboard" }, 
    { title: "📊 Relatórios", rota: "/vendedor/dashboard/relatorio" },
    { title: "👥 Meus Clientes", rota: "/vendedor/dashboard/clientes" },
    { title: "📦 Catálogo", rota: "/vendedor/dashboard/produtos" },
];

// === DADOS MOCKADOS DE CAMPANHAS ===
const MOCK_CAMPAIGNS = [
    { id: 1, loja: "Loja Central - Shopping Ibirapuera", nome: "Black Friday Antecipada", validade: "Até 30/11", destaque: true, cor: "#007bff" },
    { id: 2, loja: "Loja Central - Shopping Ibirapuera", nome: "Cashback em Eletros", validade: "Até 15/12", destaque: false, cor: "#17a2b8" },
    { id: 3, loja: "Loja Zona Oeste", nome: "Desconto Mobília", validade: "Término em 48h", destaque: true, cor: "#dc3545" },
];

// === VENDEDOR HOME PANEL (CONTEÚDO PRINCIPAL DO USUÁRIO) ===
export const VendedorHomePanel = () => {
    const navigate = useNavigate();

    // Dados do vendedor (fictícios)
    const vendedorInfo = {
        nome: "Ana Vendedora",
        setores: ["Móveis", "Brinquedos", "Eletrodomésticos"],
        loja: "Loja Central - Shopping Ibirapuera",
        metaMensal: 50,
        vendasRealizadas: 32,
        clientesAtendidos: 15,
        performance: 85 // percentual
    };

    // Filtra campanhas pela loja do vendedor
    const campanhasAtivas = MOCK_CAMPAIGNS.filter(c => c.loja === vendedorInfo.loja);

    // CORREÇÃO: Atalhos agora apontam para as rotas ANINHADAS
    const atalhos = [
        {
            titulo: "📞 Atendimento",
            descricao: "Iniciar chamada com cliente",
            cor: "#28a745",
            rota: "/vendedor/dashboard/atendimento" 
        },
        {
            titulo: "📦 Produtos",
            descricao: "Ver catálogo dos meus setores",
            cor: "#17a2b8", 
            rota: "/vendedor/dashboard/produtos" 
        },
        {
            titulo: "👥 Clientes",
            descricao: "Meus clientes atendidos",
            cor: "#6f42c1",
            rota: "/vendedor/dashboard/clientes" 
        },
        {
            titulo: "📊 Relatório",
            descricao: "Relatório de vendas",
            cor: "#fd7e14",
            rota: "/vendedor/dashboard/relatorio" 
        }
    ];

    // O padding foi removido, pois o Layout (pai) já o define
    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Cabeçalho Pessoal */}
            <div style={{ 
                backgroundColor: "white", 
                padding: "25px", 
                borderRadius: "10px", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginBottom: "25px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                        <h1 style={{ color: "#2c5aa0", margin: "0 0 5px 0" }}>
                            🛍️ Olá, {vendedorInfo.nome}!
                        </h1>
                        <p style={{ color: "#666", margin: "0 0 15px 0" }}>
                            {vendedorInfo.loja}
                        </p>
                        
                        {/* Setores Alocados */}
                        <div style={{ marginBottom: "15px" }}>
                            <h3 style={{ color: "#2c5aa0", margin: "0 0 10px 0", fontSize: "16px" }}>
                                🎯 Setores Sob Minha Responsabilidade:
                            </h3>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                {vendedorInfo.setores.map((setor, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            backgroundColor: "#e3f2fd",
                                            color: "#1565c0",
                                            padding: "8px 15px",
                                            borderRadius: "20px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            border: "1px solid #bbdefb"
                                        }}
                                    >
                                        {setor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Performance */}
                    <div style={{ 
                        textAlign: "center",
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "10px",
                        minWidth: "120px"
                    }}>
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                            Performance
                        </div>
                        <div style={{ 
                            fontSize: "24px", 
                            fontWeight: "bold", 
                            color: vendedorInfo.performance >= 80 ? "#28a745" : "#ffc107"
                        }}>
                            {vendedorInfo.performance}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Campanhas Ativas (Nova Seção) */}
            <div style={{ marginBottom: "30px" }}>
                <h2 style={{ color: "#2c5aa0", marginBottom: "15px", fontSize: "1.5rem" }}>
                    📢 Campanhas Ativas em {vendedorInfo.loja.split(' - ')[0]}
                </h2>
                <div style={styles.campaignsGrid}>
                    {campanhasAtivas.map(campanha => (
                        <div 
                            key={campanha.id} 
                            style={{ ...styles.campaignCard, borderLeft: `4px solid ${campanha.cor}` }}
                        >
                            <h4 style={{ margin: 0, color: campanha.cor, fontSize: "1.1rem" }}>
                                {campanha.nome}
                            </h4>
                            <p style={{ margin: '5px 0 0 0', fontSize: "0.9rem", color: '#666' }}>
                                Válido: {campanha.validade}
                            </p>
                            {campanha.destaque && (
                                <span style={styles.campaignTag}>🔥 Destaque</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Métricas Rápidas */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
                marginBottom: "30px"
            }}>
                {/* Métrica 1: Vendas */}
                <div style={{
                    backgroundColor: "#e8f5e8",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    borderLeft: "4px solid #28a745"
                }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#155724", fontSize: "14px" }}>🤑 Vendas do Mês</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#155724", margin: 0 }}>
                        {vendedorInfo.vendasRealizadas}/{vendedorInfo.metaMensal}
                    </p>
                    <div style={{ 
                        marginTop: "8px",
                        height: "6px",
                        backgroundColor: "#c8e6c9",
                        borderRadius: "3px",
                        overflow: "hidden"
                    }}>
                        <div 
                            style={{
                                height: "100%",
                                backgroundColor: "#28a745",
                                width: `${(vendedorInfo.vendasRealizadas / vendedorInfo.metaMensal) * 100}%`,
                                borderRadius: "3px"
                            }}
                        />
                    </div>
                </div>

                {/* Métrica 2: Clientes */}
                <div style={{
                    backgroundColor: "#e3f2fd",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    borderLeft: "4px solid #2196f3"
                }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#0d47a1", fontSize: "14px" }}>👥 Clientes Atendidos</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#0d47a1", margin: 0 }}>
                        {vendedorInfo.clientesAtendidos}
                    </p>
                </div>

                {/* Métrica 3: Faltam para Meta */}
                <div style={{
                    backgroundColor: "#fff3cd",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    borderLeft: "4px solid #ffc107"
                }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#856404", fontSize: "14px" }}>📊 Faltam para Meta</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#856404", margin: 0 }}>
                        {vendedorInfo.metaMensal - vendedorInfo.vendasRealizadas}
                    </p>
                </div>
            </div>

            {/* Atalhos Rápidos */}
            <div style={{ marginBottom: "30px" }}>
                <h2 style={{ color: "#2c5aa0", marginBottom: "20px" }}>🚀 Acesso Rápido</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px"
                }}>
                    {atalhos.map((atalho, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(atalho.rota)}
                            style={{
                                backgroundColor: "white",
                                padding: "25px",
                                borderRadius: "10px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                borderLeft: `4px solid ${atalho.cor}`,
                                textAlign: "center"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                            }}
                        >
                            <h3 style={{ 
                                color: atalho.cor, 
                                margin: "0 0 10px 0",
                                fontSize: "20px"
                            }}>
                                {atalho.titulo}
                            </h3>
                            <p style={{ 
                                color: "#666", 
                                margin: 0,
                                fontSize: "14px"
                            }}>
                                {atalho.descricao}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ação Principal - Relatório */}
            <div style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #dee2e6",
                textAlign: "center"
            }}>
                <h3 style={{ color: "#2c5aa0", marginBottom: "15px" }}>📊 Relatório de Vendas</h3>
                {/* CORREÇÃO: Usando a rota aninhada correta */}
                <p style={{ color: "#666", marginBottom: "20px" }}>
                    Acesse o relatório completo de suas vendas e desempenho
                </p>
                <button 
                    onClick={() => navigate("/vendedor/dashboard/relatorio")}
                    style={{
                        padding: "12px 30px",
                        backgroundColor: "#fd7e14",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}
                >
                    📈 Ver Relatório Completo
                </button>
            </div>
        </div>
    );
};


// === COMPONENTE LAYOUT DO VENDEDOR (WRAPER COM SIDEBAR E OUTLET) ===
const VendedorDashboardLayout = () => {
    // Implemente a lógica de estado/usuário aqui se necessário
    const userId = "Vendedor-1234";

    return (
        <div style={styles.dashboardContainer}>
            
            {/* Sidebar do Vendedor */}
            <div style={styles.sidebar}>
                <h2 style={styles.logoTitle}>Vendedor ID: {userId}</h2>
                <nav>
                    {menuItems.map(item => (
                        <Link 
                            key={item.rota} 
                            to={item.rota} 
                            style={styles.menuItem}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* CONTEÚDO PRINCIPAL: OBRIGATÓRIO PARA ROTAS ANINHADAS */}
            <main style={styles.mainContent}>
                {/* O Outlet renderiza o VendedorHomePanel, RelatorioPageVendedor, etc. */}
                <Outlet />
            </main>
        </div>
    );
};

// Estilos (Mantidos do meu código anterior para o layout)
const styles = {
    dashboardContainer: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f7f9",
    },
    sidebar: {
        width: "200px", 
        backgroundColor: "#1f3a93", // Azul escuro
        color: "white", 
        paddingTop: "30px",
        flexShrink: 0,
        boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
    },
    logoTitle: {
        fontSize: "1.2rem",
        padding: "10px 20px 30px",
        textAlign: "center",
        borderBottom: "1px solid #2e4d9b", 
        fontWeight: "bold",
        marginBottom: '20px',
    },
    menuItem: {
        display: "block",
        padding: "12px 20px",
        color: "#ffffff", 
        textDecoration: "none",
        transition: "background-color 0.2s",
        fontSize: '14px',
        ":hover": { backgroundColor: "#2e4d9b" }
    },
    mainContent: {
        flexGrow: 1,
        width: "calc(100% - 200px)", 
        overflowY: 'auto', 
        padding: '20px', 
    },
    // NOVO: Estilos para Campanhas
    campaignsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "15px",
    },
    campaignCard: {
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        position: 'relative',
    },
    campaignTag: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#ffc107',
        color: '#333',
        fontSize: '0.7rem',
        padding: '2px 8px',
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '8px',
        fontWeight: 'bold',
    }
};

export default VendedorDashboardLayout;