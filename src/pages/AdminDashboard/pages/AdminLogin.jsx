// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [step, setStep] = useState("cnpj"); // 'cnpj' ou 'login'
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lojaInfo, setLojaInfo] = useState(null);
  const navigate = useNavigate();

  // Simulação de busca de loja por CNPJ
  const handleCnpjSearch = (e) => {
    e.preventDefault();

    // Simulação de dados da loja (depois virá da API)
    const lojasSimuladas = {
      12345678000195: {
        nome: "Loja Central - Matriz",
        tipo: "matriz",
        gerentes: ["admin@comprasmart.com", "gerente@comprasmart.com"],
      },
      12345678000196: {
        nome: "Loja Shopping Norte - Filial",
        tipo: "filial",
        gerentes: ["filial1@comprasmart.com"],
      },
      12345678000197: {
        nome: "Loja Centro - Filial",
        tipo: "filial",
        gerentes: ["filial2@comprasmart.com"],
      },
    };

    const loja = lojasSimuladas[cnpj];
    if (loja) {
      setLojaInfo(loja);
      setStep("login");
    } else {
      alert("CNPJ não encontrado. Verifique o número digitado.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Lógica de login admin aqui
    console.log("Admin login:", { cnpj, email, password, loja: lojaInfo.nome });

    // Redireciona para o dashboard do admin
    navigate("/lojista/dashboard");
  };

  const resetCnpj = () => {
    setStep("cnpj");
    setLojaInfo(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>👑</div>
          <h1
            style={{
              color: "#dc3545",
              fontSize: "2rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Compra Smart
          </h1>
          <p style={{ color: "#666", marginTop: "5px" }}>Área Administrativa</p>
        </div>

        {/* PASSO 1: Pesquisa por CNPJ */}
        {step === "cnpj" && (
          <div>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "25px",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "#dc3545", margin: "0 0 10px 0" }}>
                🔍 Identificação da Loja
              </h3>
              <p
                style={{
                  color: "#666",
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                Digite o CNPJ da <strong>Matriz ou Filial</strong> para acessar
                o painel administrativo.
              </p>
            </div>

            <form onSubmit={handleCnpjSearch}>
              <div style={{ marginBottom: "25px", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  CNPJ da Loja
                </label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => {
                    // Formatação básica do CNPJ
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 14) {
                      setCnpj(value);
                    }
                  }}
                  placeholder="00.000.000/0000-00"
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "border-color 0.3s",
                  }}
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#dc3545")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
                <small
                  style={{ color: "#666", marginTop: "5px", display: "block" }}
                >
                  Digite apenas números (14 dígitos)
                </small>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#c82333")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
              >
                Buscar Loja
              </button>
            </form>
          </div>
        )}

        {/* PASSO 2: Login com e-mail e senha */}
        {step === "login" && lojaInfo && (
          <div>
            <div
              style={{
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "25px",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  color: "#155724",
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                }}
              >
                ✅ Loja Encontrada
              </h3>
              <p style={{ color: "#155724", margin: 0, fontSize: "14px" }}>
                <strong>{lojaInfo.nome}</strong>
                <br />
                Tipo: {lojaInfo.tipo === "matriz" ? "Matriz" : "Filial"}
              </p>
              <button
                onClick={resetCnpj}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "transparent",
                  border: "1px solid #155724",
                  borderRadius: "5px",
                  color: "#155724",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                🔄 Alterar CNPJ
              </button>
            </div>

            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  E-mail de Acesso
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@empresa.com"
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "border-color 0.3s",
                  }}
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#dc3545")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
                <small
                  style={{ color: "#666", marginTop: "5px", display: "block" }}
                >
                  Use o e-mail cadastrado para esta loja
                </small>
              </div>

              <div style={{ marginBottom: "25px", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    fontSize: "16px",
                    transition: "border-color 0.3s",
                  }}
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#dc3545")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#c82333")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
              >
                Acessar Painel Admin
              </button>
            </form>
          </div>
        )}

        <div
          style={{
            marginTop: "25px",
            paddingTop: "25px",
            borderTop: "1px solid #eee",
          }}
        >
          <Link
            to="/lojista/escolha"
            style={{
              color: "#666",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Voltar para escolha de acesso
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
