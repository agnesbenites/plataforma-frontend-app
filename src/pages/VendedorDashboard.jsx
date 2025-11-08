// src/pages/VendedorDashboard.jsx
import React from "react";

const VendedorDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>💼 Dashboard do Vendedor</h1>
      <p>Página principal do vendedor - Versão simplificada</p>

      {/* Aqui virão os mesmos componentes do consultor, mas adaptados */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "5px",
        }}
      >
        <h3>Funcionalidades Disponíveis:</h3>
        <ul>
          <li>✅ Sistema de chamadas/vídeo</li>
          <li>✅ Sistema de mensagens</li>
          <li>✅ Atendimento ao cliente</li>
          <li>❌ Termos e condições (removido)</li>
          <li>❌ Algumas funções administrativas</li>
        </ul>
      </div>
    </div>
  );
};

export default VendedorDashboard;
