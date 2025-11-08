import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Corrige o body quando o componente monta
  React.useEffect(() => {
    const originalBodyStyle = {
      display: document.body.style.display,
      placeItems: document.body.style.placeItems,
      alignItems: document.body.style.alignItems,
      justifyContent: document.body.style.justifyContent,
    };

    // Remove os estilos problemáticos do body
    document.body.style.display = "block";
    document.body.style.placeItems = "normal";
    document.body.style.alignItems = "normal";
    document.body.style.justifyContent = "normal";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.minHeight = "100vh";

    return () => {
      // Restaura os estilos originais se necessário
      document.body.style.display = originalBodyStyle.display;
      document.body.style.placeItems = originalBodyStyle.placeItems;
      document.body.style.alignItems = originalBodyStyle.alignItems;
      document.body.style.justifyContent = originalBodyStyle.justifyContent;
    };
  }, []);

  // --- ESTILOS ---
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    margin: 0,
    fontFamily: "Arial, sans-serif",
    width: "100%",
    overflowX: "hidden",
  };

  const contentWrapperStyle = {
    textAlign: "center",
    width: "95%",
    maxWidth: "1000px",
    padding: "50px",
    borderRadius: "15px",
    backgroundColor: "white",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  };

  const titleSectionStyle = {
    marginBottom: "50px",
  };

  const logoStyle = {
    width: "150px",
    height: "auto",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const titleStyle = {
    color: "#2c5aa0",
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "10px 0 0 0",
  };

  const subtitleStyle = {
    color: "#666",
    fontSize: "1.2rem",
    marginTop: "10px",
  };

  const cardsContainerStyle = {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
  };

  const cardBaseStyle = {
    padding: "40px 30px",
    backgroundColor: "#f8f9fa",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
    flex: "1 1 350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    border: "4px solid transparent",
  };

  const cardIconStyle = {
    fontSize: "60px",
    marginBottom: "20px",
  };

  const cardTitleStyle = {
    marginBottom: "15px",
    fontSize: "1.8rem",
    fontWeight: "bold",
  };

  const cardDescriptionStyle = {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "1rem",
    textAlign: "center",
  };

  // --- HANDLERS ---
  const handleConsultorEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,123,255,0.2)";
    e.currentTarget.style.border = "4px solid #007bff";
  };

  const handleConsultorLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    e.currentTarget.style.border = "4px solid transparent";
  };

  const handleLojistaEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 15px 30px rgba(40,167,69,0.2)";
    e.currentTarget.style.border = "4px solid #28a745";
  };

  const handleLojistaLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    e.currentTarget.style.border = "4px solid transparent";
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        {/* Logo e Título */}
        <div style={titleSectionStyle}>
          <img src="/img/logo.png" alt="Compra Smart" style={logoStyle} />
          <h1 style={titleStyle}>Compra Smart</h1>
          <p style={subtitleStyle}>Sistema Inteligente de Consultoria</p>
        </div>

        <div style={cardsContainerStyle}>
          {/* Card Consultor */}
          <div
            style={cardBaseStyle}
            onClick={() => navigate("/login")}
            onMouseEnter={handleConsultorEnter}
            onMouseLeave={handleConsultorLeave}
          >
            <div style={cardIconStyle}>👨‍💼</div>
            <h2 style={{ ...cardTitleStyle, color: "#007bff" }}>Consultor</h2>
            <p style={cardDescriptionStyle}>
              Acesso ao sistema de consultoria de compras
            </p>
          </div>

          {/* Card Lojista */}
          <div
            style={cardBaseStyle}
            onClick={() => navigate("/lojista/escolha")}
            onMouseEnter={handleLojistaEnter}
            onMouseLeave={handleLojistaLeave}
          >
            <div style={cardIconStyle}>🏪</div>
            <h2 style={{ ...cardTitleStyle, color: "#28a745" }}>Lojista</h2>
            <p style={cardDescriptionStyle}>Área administrativa e de vendas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
