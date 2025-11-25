import React, { useState } from 'react';

// --- DADOS MOCKADOS DE ATENDIMENTO E VENDAS ---
const MOCK_CLIENT_SALES = [
  {
    clientId: 'CLI-A123',
    saleValue: 4899.00,
    qrCodeLink: '/lojista/dashboard/qrcode?id=A123',
    dateTime: '2025-11-23 14:30',
    duration: '25 min',
    channel: 'Chat',
    status: 'Concluído',
  },
  {
    clientId: 'CLI-B456',
    saleValue: 349.90,
    qrCodeLink: '/lojista/dashboard/qrcode?id=B456',
    dateTime: '2025-11-22 10:15',
    duration: '40 min',
    channel: 'Vídeo Chamada',
    status: 'Concluído',
  },
  {
    clientId: 'CLI-C789',
    saleValue: 0.00,
    qrCodeLink: null,
    dateTime: '2025-11-21 17:50',
    duration: '15 min',
    channel: 'Chat',
    status: 'Perdido',
  },
  {
    clientId: 'CLI-D012',
    saleValue: 8200.00,
    qrCodeLink: '/lojista/dashboard/qrcode?id=D012',
    dateTime: '2025-11-20 09:00',
    duration: '55 min',
    channel: 'Áudio Chamada',
    status: 'Concluído',
  },
  {
    clientId: 'CLI-E345',
    saleValue: 0.00,
    qrCodeLink: null,
    dateTime: '2025-11-19 12:45',
    duration: '12 min',
    channel: 'Chat',
    status: 'Em Negociação',
  },
];

// --- Componente de Tabela de Vendas de Clientes ---
const ClientsPage = () => {
  // Estado para controlar o modal de QR Code
  const [modalData, setModalData] = useState(null); // {clientId, qrCodeLink}

  // --- Funções do Modal ---
  const handleViewQR = (clientId, qrCodeLink) => {
    setModalData({ clientId, qrCodeLink });
  };

  const closeModal = () => {
    setModalData(null);
  };
  
  const handleCopyLink = () => {
    if (modalData?.qrCodeLink) {
        // Usando document.execCommand('copy') como fallback seguro em iframes
        const tempInput = document.createElement('input');
        tempInput.value = window.location.origin + modalData.qrCodeLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Em vez de alert(), usamos console.log ou um feedback visual
        console.log('Link do QR Code copiado para a área de transferência.');
        closeModal();
    }
  };

  // Estilos básicos para o container
  const styles = {
    // ... (Estilos mantidos e atualizados para o modal)
    container: {
      padding: '30px',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      minHeight: '80vh',
      position: 'relative', // Necessário para o modal
    },
    title: {
      color: '#2c5aa0',
      fontSize: '2rem',
      marginBottom: '20px',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px'
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '800px',
    },
    th: {
      backgroundColor: '#f8f9fa',
      borderBottom: '2px solid #ddd',
      padding: '12px 15px',
      textAlign: 'left',
      color: '#495057',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    td: {
      borderBottom: '1px solid #eee',
      padding: '12px 15px',
      fontSize: '0.9rem',
      color: '#333',
    },
    qrButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
    },
    statusBadge: {
      padding: '4px 10px',
      borderRadius: '15px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      display: 'inline-block',
    },
    // Estilos do Modal
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
    linkDisplay: {
        wordBreak: 'break-all',
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        fontSize: '0.9rem',
        textAlign: 'left',
    },
    copyButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '15px',
        transition: 'background-color 0.2s',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
        marginLeft: '10px',
        transition: 'background-color 0.2s',
    }
  };

  // Lógica para definir a cor do status
  const getStatusStyle = (status) => {
    switch (status) {
        case 'Concluído':
            return { backgroundColor: '#d4edda', color: '#155724' }; // Verde
        case 'Perdido':
            return { backgroundColor: '#f8d7da', color: '#721c24' }; // Vermelho
        case 'Em Negociação':
            return { backgroundColor: '#fff3cd', color: '#856404' }; // Amarelo
        default:
            return { backgroundColor: '#f0f0f0', color: '#6c757d' };
    }
  };

  const QRCodeModal = () => {
    if (!modalData) return null;

    // Constrói a URL completa para ser exibida e copiada
    const fullUrl = window.location.origin + modalData.qrCodeLink;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={{color: styles.title.color, marginBottom: '20px'}}>
                    🔗 Link do QR Code (Venda {modalData.clientId})
                </h2>
                
                <div style={styles.linkDisplay}>
                    {fullUrl}
                </div>

                {/* QR Code Simulado (Visual) */}
                <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginBottom: '15px' }}>
                    <p style={{ margin: 0, color: '#495057', fontWeight: 'bold' }}>[Simulação de QR Code]</p>
                    <img 
                        src={`https://placehold.co/100x100/007bff/ffffff?text=${modalData.clientId}`} 
                        alt="QR Code Simulado" 
                        style={{marginTop: '10px', borderRadius: '5px'}}
                    />
                </div>

                <button 
                    onClick={handleCopyLink}
                    style={styles.copyButton}
                >
                    📋 Copiar Link para Compartilhamento
                </button>
                <button 
                    onClick={closeModal}
                    style={styles.closeButton}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 Gestão de Clientes e Histórico de Vendas</h1>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID do Cliente</th>
              <th style={styles.th}>Data e Hora</th>
              <th style={styles.th}>Duração</th>
              <th style={styles.th}>Canal</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Valor da Venda</th>
              <th style={styles.th}>Ação (QR Code)</th> {/* Coluna renomeada */}
            </tr>
          </thead>
          <tbody>
            {MOCK_CLIENT_SALES.map((sale, index) => (
              <tr key={index}>
                <td style={styles.td}>
                    <strong style={{color: '#2c5aa0'}}>{sale.clientId}</strong>
                </td>
                <td style={styles.td}>{sale.dateTime}</td>
                <td style={styles.td}>{sale.duration}</td>
                <td style={styles.td}>{sale.channel}</td>
                <td style={styles.td}>
                    <span style={{...styles.statusBadge, ...getStatusStyle(sale.status)}}>
                        {sale.status}
                    </span>
                </td>
                <td style={{...styles.td, fontWeight: 'bold', color: sale.saleValue > 0 ? '#28a745' : '#dc3545'}}>
                    R$ {sale.saleValue.toFixed(2).replace('.', ',')}
                </td>
                <td style={styles.td}>
                    {sale.qrCodeLink ? (
                        <button 
                            style={styles.qrButton}
                            onClick={() => handleViewQR(sale.clientId, sale.qrCodeLink)} // Usa a nova função
                            title={`Link para ${sale.qrCodeLink}`}
                        >
                            Ver QR
                        </button>
                    ) : (
                        <span style={{color: '#999'}}>N/A</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{marginTop: '30px', fontSize: '0.9rem', color: '#6c757d', textAlign: 'left'}}>
          * Os dados acima são fictícios e demonstram o histórico de interações do vendedor. A duração é aproximada.
      </p>

      {/* Renderiza o Modal */}
      <QRCodeModal />
    </div>
  );
};

export default ClientsPage;