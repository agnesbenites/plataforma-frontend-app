import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📧 Login consultor:", formData);
    // Aqui você integrará com a API depois
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title="Login do Consultor" showHeader={true}>
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
            🔐 Login Consultor
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
                E-mail:
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
                placeholder="seu.email@exemplo.com"
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
                backgroundColor: "#007bff",
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

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ margin: 0, color: "#666" }}>
              Não tem uma conta?{" "}
              <a
                href="/register"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Cadastre-se
              </a>
            </p>
          </div>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <a
              href="/"
              style={{
                color: "#2c5aa0",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              ← Voltar para Home
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
