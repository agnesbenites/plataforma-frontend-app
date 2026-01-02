// app-frontend/src/pages/ConsultorDashboard/components/TrainingPanel.jsx

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaLock, FaFileAlt, FaClock, FaStore, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import MarkdownViewer from '../../../components/MarkdownViewer';

const CONSULTOR_PRIMARY = "#2c5aa0";
const CONSULTOR_LIGHT_BG = "#eaf2ff";

const TrainingPanel = ({ consultorId }) => {
  const [treinamentosPlataforma, setTreinamentosPlataforma] = useState([]);
  const [treinamentosLojistas, setTreinamentosLojistas] = useState([]);
  const [treinamentosConcluidos, setTreinamentosConcluidos] = useState([]);
  const [treinamentoSelecionado, setTreinamentoSelecionado] = useState(null);
  const [conteudoMD, setConteudoMD] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [progressoGeral, setProgressoGeral] = useState(0);

  useEffect(() => {
    carregarTreinamentos();
  }, []);

  const carregarTreinamentos = async () => {
    setLoading(true);
    try {
      // Carregar index.json
      const response = await fetch('/docs/index.json');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar index.json');
      }

      const data = await response.json();
      
      // Separar por categoria
      const plataforma = data.treinamentos.filter(t => t.categoria === 'plataforma');
      const lojistas = data.treinamentos.filter(t => t.categoria === 'lojista');
      
      setTreinamentosPlataforma(plataforma);
      setTreinamentosLojistas(lojistas);
      
      // Carregar progresso do consultor (mock por enquanto)
      // TODO: Buscar do backend
      const concluidos = JSON.parse(localStorage.getItem(`treinamentos_${consultorId}`) || '[]');
      setTreinamentosConcluidos(concluidos);
      
      calcularProgresso(plataforma, concluidos);
      
    } catch (error) {
      console.error('Erro ao carregar treinamentos:', error);
      alert('Erro ao carregar treinamentos. Verifique se os arquivos estão em /public/docs/');
    } finally {
      setLoading(false);
    }
  };

  const calcularProgresso = (treinamentos, concluidos) => {
    const totalObrigatorios = treinamentos.filter(t => t.obrigatorio).length;
    const concluidosObrigatorios = treinamentos.filter(t => 
      t.obrigatorio && concluidos.includes(t.id)
    ).length;
    
    const progresso = totalObrigatorios > 0 ? (concluidosObrigatorios / totalObrigatorios) * 100 : 0;
    setProgressoGeral(Math.round(progresso));
  };

  const isConcluido = (treinamentoId) => {
    return treinamentosConcluidos.includes(treinamentoId);
  };

  const isHabilitado = () => {
    return treinamentosPlataforma
      .filter(t => t.obrigatorio)
      .every(t => isConcluido(t.id));
  };

  const isNovo = (dataPublicacao) => {
    const hoje = new Date();
    const publicacao = new Date(dataPublicacao);
    const diferencaDias = Math.floor((hoje - publicacao) / (1000 * 60 * 60 * 24));
    return diferencaDias <= 7;
  };

  const iniciarTreinamento = async (treinamento) => {
    setLoadingContent(true);
    
    try {
      // Carregar conteúdo MD
      const response = await fetch(`/docs/${treinamento.arquivo}`);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar conteúdo');
      }

      const markdown = await response.text();
      setConteudoMD(markdown);
      setTreinamentoSelecionado(treinamento);
      
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error);
      alert(`Erro ao carregar o treinamento. Verifique se o arquivo existe em /public/docs/${treinamento.arquivo}`);
    } finally {
      setLoadingContent(false);
    }
  };

  const concluirTreinamento = (treinamentoId) => {
    // Adicionar aos concluídos
    const novoConcluidos = [...treinamentosConcluidos, treinamentoId];
    setTreinamentosConcluidos(novoConcluidos);
    
    // Salvar no localStorage (temporário)
    localStorage.setItem(`treinamentos_${consultorId}`, JSON.stringify(novoConcluidos));
    
    // TODO: Salvar no backend
    // await fetch(`/api/consultores/${consultorId}/treinamentos/${treinamentoId}/concluir`, {
    //   method: 'POST'
    // });

    setTreinamentoSelecionado(null);
    setConteudoMD('');
    calcularProgresso(treinamentosPlataforma, novoConcluidos);
    
    alert('✅ Treinamento concluído com sucesso!');
  };

  const voltarParaLista = () => {
    setTreinamentoSelecionado(null);
    setConteudoMD('');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Carregando treinamentos...</p>
      </div>
    );
  }

  // Visualização Detalhada do Treinamento
  if (treinamentoSelecionado) {
    return (
      <div style={styles.container}>
        <div style={styles.detailHeader}>
          <button onClick={voltarParaLista} style={styles.backButton}>
            ← Voltar
          </button>
          
          <div style={styles.detailTitleSection}>
            <h2 style={styles.detailTitle}>{treinamentoSelecionado.titulo}</h2>
            <p style={styles.detailSubtitle}>{treinamentoSelecionado.descricao}</p>
            <div style={styles.detailMeta}>
              <span><FaFileAlt /> Documento</span>
              <span><FaClock /> {treinamentoSelecionado.duracao}</span>
              {treinamentoSelecionado.obrigatorio && (
                <span style={styles.obrigatorioTagDetail}>OBRIGATÓRIO</span>
              )}
            </div>
          </div>
        </div>

        <div style={styles.detailContent}>
          {loadingContent ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Carregando conteúdo...</p>
            </div>
          ) : (
            <>
              {/* Renderizar Markdown */}
              <MarkdownViewer content={conteudoMD} />

              {/* Botão de Conclusão */}
              {!isConcluido(treinamentoSelecionado.id) && (
                <button
                  onClick={() => concluirTreinamento(treinamentoSelecionado.id)}
                  style={styles.concluirButton}
                >
                  <FaCheckCircle /> Marcar como Concluído
                </button>
              )}
              
              {isConcluido(treinamentoSelecionado.id) && (
                <div style={styles.jaConcluidoMessage}>
                  <FaCheckCircle color="#28a745" size={24} />
                  <span>Você já concluiu este treinamento!</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // Visualização em Lista
  return (
    <div style={styles.container}>
      {/* Header com Status de Habilitação */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🎓 Treinamentos e Capacitação</h2>
          <p style={styles.subtitle}>Complete os treinamentos obrigatórios para ficar 100% habilitado</p>
        </div>

        <div style={styles.statusCard}>
          {isHabilitado() ? (
            <>
              <FaCheckCircle size={40} color="#28a745" />
              <div>
                <p style={styles.statusLabel}>Status</p>
                <p style={{ ...styles.statusValue, color: '#28a745' }}>✅ Habilitado</p>
              </div>
            </>
          ) : (
            <>
              <FaLock size={40} color="#ffc107" />
              <div>
                <p style={styles.statusLabel}>Status</p>
                <p style={{ ...styles.statusValue, color: '#ffc107' }}>📚 Em Treinamento</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div style={styles.progressCard}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Progresso dos Treinamentos Obrigatórios</span>
          <span style={styles.progressPercentage}>{progressoGeral}%</span>
        </div>
        <div style={styles.progressBarContainer}>
          <div 
            style={{
              ...styles.progressBarFill,
              width: `${progressoGeral}%`,
            }}
          />
        </div>
      </div>

      {/* Duas Colunas */}
      <div style={styles.columnsContainer}>
        
        {/* Coluna 1: Treinamentos da Plataforma */}
        <div style={styles.column}>
          <div style={styles.columnHeader}>
            <FaShieldAlt size={24} color={CONSULTOR_PRIMARY} />
            <h3 style={styles.columnTitle}>Treinamentos da Plataforma</h3>
          </div>
          <p style={styles.columnDescription}>
            Políticas, diretrizes e boas práticas para atuação profissional
          </p>

          <div style={styles.treinamentosList}>
            {treinamentosPlataforma.map(treinamento => (
              <TrainCard
                key={treinamento.id}
                treinamento={treinamento}
                isConcluido={isConcluido(treinamento.id)}
                isNovo={isNovo(treinamento.dataPublicacao)}
                onIniciar={() => iniciarTreinamento(treinamento)}
              />
            ))}
          </div>
        </div>

        {/* Coluna 2: Treinamentos dos Lojistas */}
        <div style={styles.column}>
          <div style={styles.columnHeader}>
            <FaStore size={24} color={CONSULTOR_PRIMARY} />
            <h3 style={styles.columnTitle}>Treinamentos das Lojas</h3>
          </div>
          <p style={styles.columnDescription}>
            Conteúdos sobre produtos, promoções e políticas específicas das lojas
          </p>

          <div style={styles.treinamentosList}>
            {treinamentosLojistas.length === 0 ? (
              <div style={styles.emptyState}>
                <FaStore size={40} color="#ccc" />
                <p style={styles.emptyText}>Nenhum treinamento disponível no momento</p>
              </div>
            ) : (
              treinamentosLojistas.map(treinamento => (
                <TrainCard
                  key={treinamento.id}
                  treinamento={treinamento}
                  isConcluido={isConcluido(treinamento.id)}
                  isNovo={isNovo(treinamento.dataPublicacao)}
                  onIniciar={() => iniciarTreinamento(treinamento)}
                  isLojista={true}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Card de Treinamento
const TrainCard = ({ treinamento, isConcluido, isNovo, onIniciar, isLojista = false }) => (
  <div style={{
    ...styles.trainCard,
    borderLeft: `4px solid ${isConcluido ? '#28a745' : treinamento.obrigatorio ? '#dc3545' : '#ffc107'}`,
    opacity: isConcluido ? 0.8 : 1,
  }}>
    <div style={styles.trainCardHeader}>
      <div style={styles.trainCardTitle}>
        <div style={styles.badgesContainer}>
          {isConcluido && (
            <span style={styles.concluidoBadge}>
              <FaCheckCircle /> CONCLUÍDO
            </span>
          )}
          {!isConcluido && isNovo && (
            <span style={styles.novoBadge}>🆕 NOVO</span>
          )}
          {!isConcluido && !isNovo && (
            <span style={styles.pendenteBadge}>📚 PENDENTE</span>
          )}
          {treinamento.obrigatorio && !isConcluido && (
            <span style={styles.obrigatorioTag}>OBRIGATÓRIO</span>
          )}
        </div>
        <h4 style={styles.trainTitle}>{treinamento.titulo}</h4>
      </div>
    </div>

    <p style={styles.trainDescription}>{treinamento.descricao}</p>

    <div style={styles.trainMeta}>
      <span style={styles.metaItem}><FaFileAlt /> Documento</span>
      <span style={styles.metaItem}><FaClock /> {treinamento.duracao}</span>
      <span style={styles.metaItem}>
        📅 {new Date(treinamento.dataPublicacao).toLocaleDateString('pt-BR')}
      </span>
    </div>

    <button
      onClick={onIniciar}
      style={{
        ...styles.iniciarButton,
        backgroundColor: isConcluido ? '#6c757d' : CONSULTOR_PRIMARY,
      }}
    >
      {isConcluido ? 'Revisar Conteúdo' : 'Iniciar Treinamento'}
    </button>
  </div>
);

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '25px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #2c5aa0',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  header: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    margin: 0,
  },
  statusCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
  },
  statusLabel: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  statusValue: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: 0,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  progressLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  progressPercentage: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: CONSULTOR_PRIMARY,
  },
  progressBarContainer: {
    width: '100%',
    height: '20px',
    backgroundColor: '#e9ecef',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: CONSULTOR_PRIMARY,
    transition: 'width 0.3s',
  },
  columnsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '25px',
  },
  column: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
  },
  columnTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  columnDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '25px',
    lineHeight: '1.5',
  },
  treinamentosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  trainCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '20px',
    borderLeft: '4px solid',
    transition: 'transform 0.2s',
  },
  trainCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '10px',
  },
  trainCardTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    flex: 1,
  },
  badgesContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  concluidoBadge: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  novoBadge: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  pendenteBadge: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  obrigatorioTag: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  obrigatorioTagDetail: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  trainTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  trainDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.5',
  },
  trainMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: '13px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  iniciarButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#999',
    marginTop: '15px',
  },
  // Estilos para visualização detalhada
  detailHeader: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  detailTitleSection: {
    marginBottom: '15px',
  },
  detailTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 10px 0',
  },
  detailSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '15px',
  },
  detailMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    fontSize: '14px',
    color: '#666',
  },
  detailContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  concluirButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '16px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    marginTop: '30px',
  },
  jaConcluidoMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '2px solid #c3e6cb',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '30px',
  },
};

export default TrainingPanel;