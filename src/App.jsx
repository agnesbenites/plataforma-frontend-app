import React from "react";
// Importamos o Outlet para renderizar subpáginas dentro dos Dashboards
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom"; 

// IMPORTAÇÃO DO PROVIDER DE NOTIFICAÇÕES
import { NotificationProvider } from "./contexts/NotificationContext";

// === PÁGINAS PRINCIPAIS ===
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// NOVO: Importando a página de Atendimento
import VendedorAtendimentoPage from "./pages/VendedorAtendimentoPage.jsx"; 

// === ADMIN ===
import AdminDashboard from "./pages/AdminDashboard/pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminDashboard/pages/AdminLogin.jsx";
import AdminAprovacao from "./pages/AdminDashboard/pages/AdminAprovacao.jsx";
import AdminCadastroVendedor from "./pages/AdminDashboard/pages/AdminCadastroVendedor.jsx";

// === CONSULTOR ===
// Importado como Layout
import ConsultorDashboardLayout, { ConsultorHomePanel } from "./pages/ConsultorDashboard/pages/ConsultorDashboard.jsx";
import ConsultantDashboardPage from "./pages/ConsultorDashboard/pages/Consultant/Dashboard.jsx";
import ConsultorRegister from "./pages/ConsultorDashboard/pages/ConsultorRegister.jsx";
import ConsultantLoginPage from "./pages/ConsultorDashboard/pages/Consultant/LoginPage.jsx";

// === LOJISTA ===
// CORREÇÃO: Importa o Layout (default) E os subcomponentes mockados (named exports) do mesmo arquivo.
import LojistaDashboard, {
    LojistaProducts, LojistaUsuarios, LojistaVendedores,
    LojistaFiliais, LojistaPagamentos, LojistaCadastro 
} from "./pages/LojistaDashboard/pages/LojistaDashboard.jsx"; 

// Estes continuam sendo importados de arquivos separados (conforme estrutura anterior)
import LojistaHomePanel from "./pages/LojistaDashboard/pages/LojistaHomePanel.jsx";
import LojistaQRCode from "./pages/LojistaDashboard/pages/LojistaQRCode.jsx";
import LojistaRelatorios from "./pages/LojistaDashboard/pages/LojistaRelatorios.jsx";
import IntegracaoVenda from "./pages/LojistaDashboard/pages/IntegracaoVenda.jsx";
import LojistaEscolha from "./pages/LojistaDashboard/pages/LojistaEscolha.jsx";

// === VENDEDOR ===
// Importado como Layout e Painel (corrigido)
import VendedorDashboardLayout, { VendedorHomePanel } from "./pages/VendedorDashboard.jsx";
import VendedorLogin from "./pages/VendedorLogin.jsx";
import VendedorRegisterPage from "./pages/VendedorRegisterPage.jsx";

// === OUTRAS PÁGINAS ===
import AplicativoConfirmacao from "./pages/AplicativoConfirmacao.jsx";
import ApprovalsPage from "./pages/ApprovalsPage.jsx";
import AwaitingApproval from "./pages/AwaitingApproval.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RelatorioPageVendedor from "./pages/RelatorioPageVendedor.jsx";
import TermsPage from "./pages/TermsPage.jsx";


// Componente de navegação simplificado (Mantido o código original)
const Navigation = () => {
    const location = useLocation();
    const path = location.pathname;

    const linkStyle = { color: "#555", textDecoration: "none", fontWeight: "500", padding: "8px 16px", borderRadius: "8px", transition: "all 0.3s ease", fontSize: "14px", };
    const linksStyle = { display: "flex", gap: "25px", alignItems: "center", };
    const logoStyle = { fontSize: "24px", fontWeight: "bold", color: "#2c5aa0", };
    const navContentStyle = { maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", };
    const navStyle = { background: "white", padding: "15px 30px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)", borderBottom: "1px solid #eaeaea", marginBottom: "0", position: "sticky", top: 0, zIndex: 1000, };
    
    const noMenuPages = [
        '/',
        '/login',
        '/admin/login',
        '/consultor/login', 
        '/consultor/register',
        '/vendedor/login',
        '/vendedor/register',
        '/lojista/escolha',
        '/lojista/login',
        '/lojista/integracao'
    ];

    if (noMenuPages.some(page => path === page || path.includes(page))) {
        return null;
    }

    const getNavigationMenu = () => {
        if (path.includes('/admin')) {
            return (
                <>
                    <a href="/admin/dashboard" style={linkStyle}>🏠 Admin</a>
                    <a href="/lojista/dashboard" style={linkStyle}>🏪 Lojista</a>
                    <a href="/vendedor/dashboard" style={linkStyle}>💼 Vendedor</a>
                </>
            );
        } else if (path.includes('/vendedor')) {
            return (
                <>
                    <a href="/vendedor/dashboard" style={linkStyle}>🏠 Vendedor</a>
                    <a href="/lojista/dashboard" style={linkStyle}>🏪 Lojista</a>
                    <a href="/consultor/dashboard" style={linkStyle}>🔍 Consultor</a>
                </>
            );
        } else if (path.includes('/lojista')) {
            return (
                <>
                    <a href="/lojista/dashboard" style={linkStyle}>🏠 Lojista</a>
                    <a href="/vendedor/dashboard" style={linkStyle}>💼 Vendedor</a>
                    <a href="/consultor/dashboard" style={linkStyle}>🔍 Consultor</a>
                </>
            );
        } else if (path.includes('/consultor')) {
            return (
                <>
                    <a href="/consultor/dashboard" style={linkStyle}>🏠 Consultor</a>
                    <a href="/lojista/dashboard" style={linkStyle}>🏪 Lojista</a>
                    <a href="/vendedor/dashboard" style={linkStyle}>💼 Vendedor</a>
                </>
            );
        } else {
            return (
                <>
                    <a href="/" style={linkStyle}>🏠 Home</a>
                    <a href="/login" style={linkStyle}>🔐 Login</a>
                    <a href="/lojista/escolha" style={linkStyle}>🏪 Lojista</a>
                    <a href="/vendedor/dashboard" style={linkStyle}>💼 Vendedor</a>
                    <a href="/consultor/dashboard" style={linkStyle}>🔍 Consultor</a>
                </>
            );
        }
    };

    return (
        <nav style={navStyle}>
            <div style={navContentStyle}>
                <div style={logoStyle}>🧭 Compra Smart</div>
                <div style={linksStyle}>
                    {getNavigationMenu()}
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                    a:hover {
                        background-color: #f0f0f0;
                        color: #2c5aa0;
                    }
                `}} />
            </div>
        </nav>
    );
};


function App() {
    return (
        <Router>
            <NotificationProvider>
                <div className="App">
                    <Navigation />

                    <Routes>
                        {/* === PÁGINAS PÚBLICAS === */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        
                        {/* ATALHO CORRIGIDO: Redireciona /dashboard para a área do lojista */}
                        <Route path="/dashboard" element={<Navigate to="/lojista/dashboard" replace />} />
                        
                        {/* === ADMIN === */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/aprovacao" element={<AdminAprovacao />} />
                        <Route path="/admin/cadastro-vendedor" element={<AdminCadastroVendedor />} />
                        
                        {/* === CONSULTOR (ROTAS ANINHADAS CORRIGIDAS) === */}
                        <Route path="/consultor/login" element={<ConsultantLoginPage />} />
                        <Route path="/consultor/register" element={<ConsultorRegister />} />
                        <Route path="/consultor/dashboard" element={<ConsultorDashboardLayout />}>
                            {/* Rota padrão: /consultor/dashboard */}
                            <Route index element={<ConsultorHomePanel />} /> 
                            {/* Rota padrão antiga (mantida por precaução) */}
                            <Route path="home-old" element={<ConsultantDashboardPage />} /> 
                            {/* Exemplo de subpáginas */}
                            <Route path="chat" element={<div>Chat Panel</div>} />
                            <Route path="analytics" element={<div>Analytics Panel</div>} />
                            <Route path="profile" element={<div>Profile Panel</div>} />
                            <Route path="detalhe-alerta/:id" element={<div>Detalhe do Alerta</div>} />
                        </Route>
                        
                        {/* === LOJISTA === */}
                        <Route path="/lojista/escolha" element={<LojistaEscolha />} />
                        <Route path="/lojista/login" element={<LoginPage />} /> 
                        <Route path="/lojista/cadastro" element={<LojistaCadastro />} />
                        
                        {/* Dashboard do lojista (Rotas Aninhadas) */}
                        <Route path="/lojista/dashboard" element={<LojistaDashboard />}>
                            <Route index element={<LojistaHomePanel />} /> 
                            <Route path="home" element={<LojistaHomePanel />} />
                            <Route path="produtos" element={<LojistaProducts />} />
                            <Route path="usuarios" element={<LojistaUsuarios />} />
                            <Route path="vendedores" element={<LojistaVendedores />} />
                            <Route path="filiais" element={<LojistaFiliais />} />
                            <Route path="qrcode" element={<LojistaQRCode />} />
                            <Route path="pagamentos" element={<LojistaPagamentos />} />
                            <Route path="relatorios" element={<LojistaRelatorios />} />
                            <Route path="integracao" element={<IntegracaoVenda />} />
                        </Route>
                        
                        {/* === VENDEDOR (ROTAS ANINHADAS CORRIGIDAS) === */}
                        <Route path="/vendedor/login" element={<VendedorLogin />} />
                        <Route path="/vendedor/register" element={<VendedorRegisterPage />} />

                        {/* Dashboard do Vendedor (Layout Principal) */}
                        <Route path="/vendedor/dashboard" element={<VendedorDashboardLayout />}>
                            {/* Rota Padrão: /vendedor/dashboard */}
                            <Route index element={<VendedorHomePanel />} /> 
                            
                            {/* Subpáginas do Vendedor */}
                            <Route path="relatorio" element={<RelatorioPageVendedor />} />
                            <Route path="clientes" element={<ClientsPage />} /> 
                            <Route path="produtos" element={<ProductsPage />} /> 
                            {/* ROTA CORRIGIDA: Usa o componente real VendedorAtendimentoPage */}
                            <Route path="atendimento" element={<VendedorAtendimentoPage />} />
                        </Route>
                        
                        {/* === OUTRAS ROTAS SOLTAS (MANTIDAS) === */}
                        <Route path="/aplicativo-confirmacao" element={<AplicativoConfirmacao />} />
                        <Route path="/approvals" element={<ApprovalsPage />} />
                        <Route path="/awaiting-approval" element={<AwaitingApproval />} />
                        
                        {/* === 404 (MANTIDO) === */}
                        <Route path="*" element={
                            <div style={{ padding: "50px", textAlign: "center" }}>
                                <h1>❌ 404 - Página Não Encontrada</h1>
                                <a href="/" style={{ color: "#2c5aa0" }}>Voltar para Home</a>
                            </div>
                        }/>
                    </Routes>
                </div>
            </NotificationProvider>
        </Router>
    );
}

export default App;