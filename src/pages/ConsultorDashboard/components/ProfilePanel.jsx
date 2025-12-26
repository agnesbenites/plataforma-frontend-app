// src/pages/ConsultorDashboard/components/ProfilePanel.jsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const CONSULTOR_PRIMARY = '#2c5aa0';

const ProfilePanel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [uploadingCurriculo, setUploadingCurriculo] = useState(false);

  const [perfil, setPerfil] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    dataNascimento: '15/03/1990',
    endereco: 'Rua Exemplo, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    bio: 'Consultor de vendas com 5 anos de experiência em eletrônicos e informática. Especializado em atendimento personalizado e fidelização de clientes.',
    curriculoUrl: null,
    curriculoNome: null,
    dataUploadCurriculo: null,
  });

  const [editedPerfil, setEditedPerfil] = useState({...perfil});

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPerfil({...perfil});
  };

  const handleSave = () => {
    setPerfil({...editedPerfil});
    setIsEditing(false);
    alert('✅ Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPerfil({...perfil});
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.clear();
      navigate('/consultor/login');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('❌ Formato inválido. Use PDF, DOC ou DOCX.');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ Arquivo muito grande. Máximo 5MB.');
      return;
    }

    setUploadingCurriculo(true);

    try {
      // Aqui você faria o upload real para o servidor/Supabase
      // Por enquanto, simulando:
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPerfil({
        ...perfil,
        curriculoUrl: URL.createObjectURL(file),
        curriculoNome: file.name,
        dataUploadCurriculo: new Date().toISOString(),
      });

      alert('✅ Currículo enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar currículo:', error);
      alert('❌ Erro ao enviar currículo. Tente novamente.');
    } finally {
      setUploadingCurriculo(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.avatar}>
            {perfil.nome.charAt(0)}
          </div>
          <div>
            <h1 style={styles.nome}>{perfil.nome}</h1>
            <p style={styles.email}>{perfil.email}</p>
          </div>
        </div>

        <div style={styles.headerActions}>
          {!isEditing ? (
            <>
              <button onClick={handleEdit} style={styles.editButton}>
                <FaEdit /> Editar Perfil
              </button>
              <button onClick={handleLogout} style={styles.logoutButton}>
                🚪 Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} style={styles.saveButton}>
                <FaSave /> Salvar
              </button>
              <button onClick={handleCancel} style={styles.cancelButton}>
                <FaTimes /> Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div style={styles.content}>
        {/* Coluna Esquerda - Dados Pessoais */}
        <div style={styles.leftColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📋 Dados Pessoais</h3>
            <div style={styles.infoGrid}>
              <InfoField
                label="Nome Completo"
                value={isEditing ? editedPerfil.nome : perfil.nome}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, nome: value})}
              />
              <InfoField
                label="Email"
                value={isEditing ? editedPerfil.email : perfil.email}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, email: value})}
              />
              <InfoField
                label="Telefone"
                value={isEditing ? editedPerfil.telefone : perfil.telefone}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, telefone: value})}
              />
              <InfoField
                label="CPF"
                value={isEditing ? editedPerfil.cpf : perfil.cpf}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, cpf: value})}
              />
              <InfoField
                label="Data de Nascimento"
                value={isEditing ? editedPerfil.dataNascimento : perfil.dataNascimento}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, dataNascimento: value})}
              />
              <InfoField
                label="CEP"
                value={isEditing ? editedPerfil.cep : perfil.cep}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, cep: value})}
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📍 Endereço</h3>
            <div style={styles.infoGrid}>
              <InfoField
                label="Rua"
                value={isEditing ? editedPerfil.endereco : perfil.endereco}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, endereco: value})}
              />
              <InfoField
                label="Bairro"
                value={isEditing ? editedPerfil.bairro : perfil.bairro}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, bairro: value})}
              />
              <InfoField
                label="Cidade"
                value={isEditing ? editedPerfil.cidade : perfil.cidade}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, cidade: value})}
              />
              <InfoField
                label="Estado"
                value={isEditing ? editedPerfil.estado : perfil.estado}
                isEditing={isEditing}
                onChange={(value) => setEditedPerfil({...editedPerfil, estado: value})}
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💬 Biografia</h3>
            {isEditing ? (
              <textarea
                value={editedPerfil.bio}
                onChange={(e) => setEditedPerfil({...editedPerfil, bio: e.target.value})}
                style={styles.bioTextarea}
                rows={4}
              />
            ) : (
              <p style={styles.bioText}>{perfil.bio}</p>
            )}
          </div>
        </div>

        {/* Coluna Direita - Currículo e Estatísticas */}
        <div style={styles.rightColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📄 Currículo</h3>
            
            {perfil.curriculoUrl ? (
              <div style={styles.curriculoCard}>
                <div style={styles.curriculoIcon}>
                  <FaFileAlt size={40} color={CONSULTOR_PRIMARY} />
                </div>
                <div style={styles.curriculoInfo}>
                  <p style={styles.curriculoNome}>{perfil.curriculoNome}</p>
                  <p style={styles.curriculoData}>
                    Enviado em: {new Date(perfil.dataUploadCurriculo).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <a 
                  href={perfil.curriculoUrl} 
                  download 
                  style={styles.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📥 Baixar
                </a>
              </div>
            ) : (
              <div style={styles.noCurriculoCard}>
                <FaFileAlt size={40} color="#ccc" />
                <p style={styles.noCurriculoText}>Nenhum currículo enviado</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={styles.fileInput}
            />

            <button
              onClick={() => fileInputRef.current.click()}
              disabled={uploadingCurriculo}
              style={styles.uploadButton}
            >
              <FaUpload />
              {uploadingCurriculo ? 'Enviando...' : 'Substituir Currículo'}
            </button>

            <p style={styles.uploadHint}>
              Formatos aceitos: PDF, DOC, DOCX (máx. 5MB)
            </p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📊 Estatísticas Rápidas</h3>
            <div style={styles.statsGrid}>
              <StatCard icon="🛒" label="Vendas no Mês" value="156" />
              <StatCard icon="💰" label="Comissão Acumulada" value="R$ 6.240" />
              <StatCard icon="⭐" label="Avaliação Média" value="4.8" />
              <StatCard icon="🏪" label="Lojas Ativas" value="3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para campos de informação
const InfoField = ({ label, value, isEditing, onChange }) => (
  <div style={styles.infoField}>
    <label style={styles.infoLabel}>{label}</label>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={styles.infoInput}
      />
    ) : (
      <p style={styles.infoValue}>{value}</p>
    )}
  </div>
);

// Componente auxiliar para cards de estatística
const StatCard = ({ icon, label, value }) => (
  <div style={styles.statCard}>
    <span style={styles.statIcon}>{icon}</span>
    <p style={styles.statLabel}>{label}</p>
    <p style={styles.statValue}>{value}</p>
  </div>
);

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '25px',
  },
  header: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: CONSULTOR_PRIMARY,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  nome: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
  },
  email: {
    fontSize: '1rem',
    color: '#666',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: CONSULTOR_PRIMARY,
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  infoField: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '5px',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '1rem',
    color: '#333',
    margin: 0,
  },
  infoInput: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  bioTextarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  bioText: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    margin: 0,
  },
  curriculoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  curriculoIcon: {
    flexShrink: 0,
  },
  curriculoInfo: {
    flex: 1,
  },
  curriculoNome: {
    margin: '0 0 5px 0',
    fontWeight: '600',
    color: '#333',
  },
  curriculoData: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#666',
  },
  downloadLink: {
    padding: '8px 16px',
    backgroundColor: CONSULTOR_PRIMARY,
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  noCurriculoCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  noCurriculoText: {
    marginTop: '15px',
    color: '#999',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: CONSULTOR_PRIMARY,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  uploadHint: {
    fontSize: '0.85rem',
    color: '#666',
    textAlign: 'center',
    margin: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  statCard: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: '10px',
    display: 'block',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#666',
    margin: '0 0 8px 0',
  },
  statValue: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: CONSULTOR_PRIMARY,
    margin: 0,
  },
};

export default ProfilePanel;