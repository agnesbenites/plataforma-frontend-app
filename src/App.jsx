import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// === PÁGINAS PRINCIPAIS ===
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// === LOJISTA ===
import { LojistaDashboard } from "./pages/LojistaDashboard/pages/LojistaDashboard.jsx";
import LojistaHomePanel from "./pages/LojistaDashboard/pages/LojistaHomePanel.jsx";
import LojistaProducts from "./pages/LojistaDashboard/pages/LojistaProducts.jsx";
import LojistaUsuarios from "./pages/LojistaDashboard/pages/LojistaUsuarios.jsx";
import LojistaVendedores from "./pages/LojistaDashboard/pages/LojistaVendedores.jsx";
import LojistaFiliais from "./pages/LojistaDashboard/pages/LojistaFiliais.jsx";
import LojistaQRCode from "./pages/LojistaDashboard/pages/LojistaQRCode.jsx";
import LojistaPagamentos from "./pages/LojistaDashboard/pages/LojistaPagamentos.jsx";
import LojistaRelatorios from "./pages/LojistaDashboard/pages/LojistaRelatorios.jsx";

// === VENDEDOR ===
import VendedorDashboard from "./pages/VendedorDashboard/pages/VendedorDashboard.jsx";

function App() {
  // Função para detectar o tipo de usuário baseado na rota
  const getNavigationMenu = () => {
    const path = window.location.pathname;
    
    if (path.includes('/vendedor')) {
      // MENU VENDEDOR (BÁSICO)
      return (
        <>
          <a href="/vendedor/dashboard" style={{ color: "white", margin: "0 10px" }}>🏠 Home</a>
          <a href="/lojista" style={{ color: "white", margin: "0 10px" }}>🏪 Lojista</a>
          <a href="/" style={{ color: "white", margin: "0 10px" }}>🔍 Consultor</a>
        </>
      );
    } else if (path.includes('/lojista')) {
      // MENU LOJISTA
      return (
        <>
          <a href="/lojista" style={{ color: "white", margin: "0 10px" }}>🏠 Home</a>
          <a href="/vendedor/dashboard" style={{ color: "white", margin: "0 10px" }}>💼 Vendedor</a>
          <a href="/" style={{ color: "white", margin: "0 10px" }}>🔍 Consultor</a>
        </>
      );
    } else {
      // MENU CONSULTOR (COMPLETO)
      return (
        <>
          <a href="/" style={{ color: "white", margin: "0 10px" }}>🏠 Home</a>
          <a href="/login" style={{ color: "white", margin: "0 10px" }}>🔐 Login</a>
          <a href="/lojista" style={{ color: "white", margin: "0 10px" }}>🏪 Lojista</a>
          <a href="/vendedor/dashboard" style={{ color: "white", margin: "0 10px" }}>💼 Vendedor</a>
        </>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <nav style={{ padding: "10px", backgroundColor: "#2c5aa0", color: "white", marginBottom: "20px" }}>
          <strong>🧭 NAVEGAÇÃO:</strong>
          {getNavigationMenu()}
        </nav>

        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* LOJISTA - ROTAS ANINHADAS */}
          <Route path="/lojista" element={<LojistaDashboard />}>
            <Route index element={<LojistaHomePanel />} />
            <Route path="produtos" element={<LojistaProducts />} />
            <Route path="usuarios" element={<LojistaUsuarios />} />
            <Route path="vendedores" element={<LojistaVendedores />} />
            <Route path="filiais" element={<LojistaFiliais />} />
            <Route path="qrcode" element={<LojistaQRCode />} />
            <Route path="pagamentos" element={<LojistaPagamentos />} />
            <Route path="relatorios" element={<LojistaRelatorios />} />
            <Route path="home" element={<LojistaHomePanel />} />
          </Route>

          {/* VENDEDOR - ROTA DIRETA */}
          <Route path="/vendedor/dashboard" element={<VendedorDashboard />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ padding: "50px", textAlign: "center" }}>
              <h1>❌ 404 - Página Não Encontrada</h1>
              <a href="/" style={{ color: "#2c5aa0" }}>Voltar para Home</a>
            </div>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;