// src/pages/LojistaDashboard.jsx (AGORA É O LAYOUT)

import React from "react";
// 💡 ELEMENTOS CHAVE ADICIONADOS: Outlet e Link
import { Outlet, Link } from "react-router-dom";

// === DADOS DE NAVEGAÇÃO (MOCKADOS PARA O MENU LATERAL) ===
const menuItems = [
    { title: "🏠 Dashboard", rota: "/lojista" }, // Rota raiz /lojista
    { title: "📦 Produtos", rota: "/lojista/produtos" },
    { title: "👥 Usuários", rota: "/lojista/usuarios" },
    { title: "💼 Vendedores", rota: "/lojista/vendedores" },
    { title: "🏪 Filiais", rota: "/lojista/filiais" },
    { title: "🔳 QR Codes", rota: "/lojista/qrcodes" }, // CORRIGIDO: qrcode → qrcodes
    { title: "💳 Pagamentos", rota: "/lojista/pagamentos" },
    { title: "📊 Relatórios", rota: "/lojista/relatorios" },
    { title: "⚙️ Cadastro", rota: "/lojista/cadastro" },
];

// === COMPONENTE LAYOUT ===
const LojistaDashboardLayout = () => {
    return (
        <div style={styles.dashboardContainer}>
            
            {/* ⬅️  Menu Lateral */}
            <div style={styles.sidebar}>
                <h2 style={styles.logoTitle}>Agnes Lojista</h2>
                <nav>
                    {menuItems.map(item => (
                        // Usamos Link para navegação interna
                        <Link key={item.rota} to={item.rota} style={styles.menuItem}>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* ➡️ CONTEÚDO PRINCIPAL: AQUI AS PÁGINAS FILHAS SERÃO RENDERIZADAS */}
            <main style={styles.mainContent}>
                {/* 💡 ESTE É O ELEMENTO CRÍTICO QUE VAI MOSTRAR QR CODES E RELATÓRIOS! */}
                <Outlet />
            </main>
        </div>
    );
};

// === ESTILOS BÁSICOS DO LAYOUT ===
const styles = {
    dashboardContainer: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f7f9",
    },
    sidebar: {
        width: "250px", 
        backgroundColor: "#2c5aa0",
        color: "white",
        paddingTop: "20px",
        flexShrink: 0,
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    logoTitle: {
        fontSize: "1.5rem",
        padding: "10px 20px 30px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        fontWeight: "bold",
    },
    menuItem: {
        display: "block",
        padding: "15px 20px",
        color: "white",
        textDecoration: "none",
        transition: "background-color 0.2s",
    },
    mainContent: {
        flexGrow: 1,
        width: "calc(100% - 250px)", // Ocupa o restante da tela
        overflowY: 'auto', // Permite scroll no conteúdo
    },
};

// === EXPORTS ORIGINAIS ===
// Export principal (Layout)
export const LojistaDashboard = LojistaDashboardLayout;

// Export LojistaEscolha (Geralmente fora do Layout)
export const LojistaEscolha = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>✅ Lojista Escolha</h1>
    </div>
);

// Outros Exports (APENAS OS QUE NÃO TEM ARQUIVOS SEPARADOS)
export const LojistaProducts = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>📦 Produtos do Lojista</h1>
    </div>
);
export const LojistaUsuarios = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>👥 Usuários do Lojista</h1>
    </div>
);
export const LojistaVendedores = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>💼 Vendedores do Lojista</h1>
    </div>
);
export const LojistaFiliais = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>🏪 Filiais do Lojista</h1>
    </div>
);
export const LojistaCadastro = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>⚙️ Cadastro do Lojista</h1>
    </div>
);
export const LojistaPagamentos = () => (
    <div style={{ padding: "50px", textAlign: "center", color: '#333' }}>
        <h1>💳 Pagamentos do Lojista</h1>
    </div>
);

// ⚠️ REMOVIDOS: LojistaQRCode e LojistaRelatorios mockados
// Estes agora são importados de arquivos separados no App.jsx

// Se houver um export default, mantenha-o
// export default LojistaDashboardLayout;