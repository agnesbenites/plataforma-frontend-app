import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const VendedorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📧 Login vendedor:", formData);
    // Aqui você integrará com a API depois
    navigate("/vendedor/dashboard");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title="Login do Vendedor" showHeader={true}>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2c5aa0",
              marginBottom: "30px",
            }}
          >
            🔐 Login Vendedor
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                E-mail Corporativo:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                placeholder="seu.email@empresa.com"
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Senha:
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                placeholder="Sua senha"
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Entrar
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
              💡 Use o e-mail e senha fornecidos pelo administrador da loja
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="/lojista/escolha"
              style={{ color: "#2c5aa0", textDecoration: "none" }}
            >
              ← Voltar para escolha de acesso
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendedorLogin;
