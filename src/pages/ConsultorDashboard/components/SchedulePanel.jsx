// src/pages/ConsultorDashboard/components/SchedulePanel.jsx
// Componente de Agenda - Funciona para CONSULTOR e VENDEDOR

import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

const SchedulePanel = ({ tipoUsuario = 'consultor' }) => {
  const [userId, setUserId] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente_nome: '',
    cliente_telefone: '',
    data: '',
    hora: '',
    tipo: 'presencial', // presencial, remoto, telefone
    observacoes: ''
  });

  const cores = {
    consultor: { primary: '#2c5aa0', light: '#eaf2ff' },
    vendedor: { primary: '#4a6fa5', light: '#eaf2ff' }
  };

  const cor = cores[tipoUsuario] || cores.consultor;

  useEffect(() => {
    inicializar();
  }, []);

  useEffect(() => {
    if (userId) {
      carregarAgendamentos();
      // Atualizar a cada minuto
      const interval = setInterval(carregarAgendamentos, 60000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const inicializar = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Buscar ID do consultor ou vendedor
      const tabela = tipoUsuario === 'vendedor' ? 'vendedores' : 'consultores';
      const { data, error } = await supabase
        .from(tabela)
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) setUserId(data.id);

    } catch (error) {
      console.error('[Schedule] Erro ao inicializar:', error);
    }
  };

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);

      const campo = tipoUsuario === 'vendedor' ? 'vendedor_id' : 'consultor_id';
      
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .eq(campo, userId)
        .gte('data_hora', new Date().toISOString())
        .order('data_hora', { ascending: true })
        .limit(20);

      if (error) throw error;

      setAgendamentos(data || []);
      console.log('[Schedule] Agendamentos carregados:', data?.length);

    } catch (error) {
      console.error('[Schedule] Erro ao carregar:', error);
    } finally {
      setLoading(false);
    }
  };

  const criarAgendamento = async (e) => {
    e.preventDefault();

    if (!novoAgendamento.cliente_nome || !novoAgendamento.data || !novoAgendamento.hora) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    try {
      const dataHora = `${novoAgendamento.data}T${novoAgendamento.hora}:00`;
      
      const campo = tipoUsuario === 'vendedor' ? 'vendedor_id' : 'consultor_id';

      const { error } = await supabase
        .from('agendamentos')
        .insert({
          [campo]: userId,
          cliente_nome: novoAgendamento.cliente_nome,
          cliente_telefone: novoAgendamento.cliente_telefone,
          data_hora: dataHora,
          tipo_atendimento: novoAgendamento.tipo,
          observacoes: novoAgendamento.observacoes,
          status: 'agendado',
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      alert('✅ Agendamento criado com sucesso!');
      setMostrarModal(false);
      setNovoAgendamento({
        cliente_nome: '',
        cliente_telefone: '',
        data: '',
        hora: '',
        tipo: 'presencial',
        observacoes: ''
      });
      
      await carregarAgendamentos();

    } catch (error) {
      console.error('[Schedule] Erro ao criar:', error);
      alert('❌ Erro ao criar agendamento: ' + error.message);
    }
  };

  const confirmarAgendamento = async (id) => {
    try {
      const { error } = await supabase
        .from('agendamentos')
        .update({ status: 'confirmado' })
        .eq('id', id);

      if (error) throw error;

      alert('✅ Agendamento confirmado!');
      await carregarAgendamentos();

    } catch (error) {
      console.error('[Schedule] Erro ao confirmar:', error);
      alert('❌ Erro ao confirmar agendamento');
    }
  };

  const cancelarAgendamento = async (id) => {
    if (!window.confirm('Deseja cancelar este agendamento?')) return;

    try {
      const { error } = await supabase
        .from('agendamentos')
        .update({ status: 'cancelado' })
        .eq('id', id);

      if (error) throw error;

      alert('✅ Agendamento cancelado!');
      await carregarAgendamentos();

    } catch (error) {
      console.error('[Schedule] Erro ao cancelar:', error);
      alert('❌ Erro ao cancelar agendamento');
    }
  };

  const formatarDataHora = (dataHora) => {
    return new Date(dataHora).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      'agendado': { emoji: '📅', texto: 'Agendado', cor: '#ffc107' },
      'confirmado': { emoji: '✅', texto: 'Confirmado', cor: '#28a745' },
      'cancelado': { emoji: '❌', texto: 'Cancelado', cor: '#dc3545' },
      'concluido': { emoji: '🎉', texto: 'Concluído', cor: '#6c757d' },
    };
    return statusMap[status] || { emoji: '❓', texto: status, cor: '#999' };
  };

  const getTipoInfo = (tipo) => {
    const tipoMap = {
      'presencial': { emoji: '🏪', texto: 'Presencial' },
      'remoto': { emoji: '💻', texto: 'Remoto' },
      'telefone': { emoji: '📞', texto: 'Telefone' },
    };
    return tipoMap[tipo] || { emoji: '❓', texto: tipo };
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        ⏳ Carregando agenda...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ ...styles.title, color: cor.primary }}>
          📅 Minha Agenda
        </h2>
        <button
          onClick={() => setMostrarModal(true)}
          style={{ ...styles.btnNovo, backgroundColor: cor.primary }}
        >
          ➕ Novo Agendamento
        </button>
      </div>

      {/* Lista de Agendamentos */}
      {agendamentos.length === 0 ? (
        <div style={styles.empty}>
          <p>😴 Nenhum agendamento próximo</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Clique em "Novo Agendamento" para criar um
          </p>
        </div>
      ) : (
        <div style={styles.agendamentosGrid}>
          {agendamentos.map(agendamento => {
            const statusInfo = getStatusInfo(agendamento.status);
            const tipoInfo = getTipoInfo(agendamento.tipo_atendimento);

            return (
              <div key={agendamento.id} style={styles.agendamentoCard}>
                <div style={styles.cardHeader}>
                  <div>
                    <h3 style={styles.clienteNome}>
                      👤 {agendamento.cliente_nome}
                    </h3>
                    {agendamento.cliente_telefone && (
                      <p style={styles.clienteTelefone}>
                        📞 {agendamento.cliente_telefone}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: statusInfo.cor
                    }}
                  >
                    {statusInfo.emoji} {statusInfo.texto}
                  </span>
                </div>

                <div style={styles.cardInfo}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>📅 Data/Hora:</span>
                    <span style={styles.infoValue}>
                      {formatarDataHora(agendamento.data_hora)}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>Tipo:</span>
                    <span style={styles.infoValue}>
                      {tipoInfo.emoji} {tipoInfo.texto}
                    </span>
                  </div>

                  {agendamento.observacoes && (
                    <div style={styles.observacoes}>
                      <strong>📝 Observações:</strong>
                      <p>{agendamento.observacoes}</p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                {agendamento.status === 'agendado' && (
                  <div style={styles.cardActions}>
                    <button
                      onClick={() => confirmarAgendamento(agendamento.id)}
                      style={styles.btnConfirmar}
                    >
                      ✅ Confirmar
                    </button>
                    <button
                      onClick={() => cancelarAgendamento(agendamento.id)}
                      style={styles.btnCancelar}
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL - Novo Agendamento */}
      {mostrarModal && (
        <div style={styles.modalOverlay} onClick={() => setMostrarModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ ...styles.modalTitle, color: cor.primary }}>
              ➕ Novo Agendamento
            </h2>

            <form onSubmit={criarAgendamento} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>👤 Nome do Cliente *</label>
                <input
                  type="text"
                  value={novoAgendamento.cliente_nome}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    cliente_nome: e.target.value
                  })}
                  required
                  style={styles.input}
                  placeholder="Nome completo"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>📞 Telefone</label>
                <input
                  type="tel"
                  value={novoAgendamento.cliente_telefone}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    cliente_telefone: e.target.value
                  })}
                  style={styles.input}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>📅 Data *</label>
                  <input
                    type="date"
                    value={novoAgendamento.data}
                    onChange={(e) => setNovoAgendamento({
                      ...novoAgendamento,
                      data: e.target.value
                    })}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>⏰ Hora *</label>
                  <input
                    type="time"
                    value={novoAgendamento.hora}
                    onChange={(e) => setNovoAgendamento({
                      ...novoAgendamento,
                      hora: e.target.value
                    })}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tipo de Atendimento</label>
                <select
                  value={novoAgendamento.tipo}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    tipo: e.target.value
                  })}
                  style={styles.select}
                >
                  <option value="presencial">🏪 Presencial</option>
                  <option value="remoto">💻 Remoto</option>
                  <option value="telefone">📞 Telefone</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>📝 Observações</label>
                <textarea
                  value={novoAgendamento.observacoes}
                  onChange={(e) => setNovoAgendamento({
                    ...novoAgendamento,
                    observacoes: e.target.value
                  })}
                  style={styles.textarea}
                  rows="3"
                  placeholder="Anotações sobre o atendimento..."
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="submit"
                  style={{ ...styles.btnSalvar, backgroundColor: cor.primary }}
                >
                  ✅ Criar Agendamento
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  style={styles.btnCancelarModal}
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    color: '#666',
    fontSize: '1.2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  btnNovo: {
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    color: '#666',
  },
  agendamentosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  agendamentoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '20px',
    border: '1px solid #e9ecef',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f0f0f0',
  },
  clienteNome: {
    margin: '0 0 5px 0',
    fontSize: '1.1rem',
    color: '#333',
  },
  clienteTelefone: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#666',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'white',
    whiteSpace: 'nowrap',
  },
  cardInfo: {
    marginBottom: '15px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  infoLabel: {
    fontSize: '0.9rem',
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#333',
  },
  observacoes: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  btnConfirmar: {
    flex: 1,
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalTitle: {
    margin: '0 0 25px 0',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px 15px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    padding: '12px 15px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 15px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  modalActions: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  btnSalvar: {
    flex: 1,
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  btnCancelarModal: {
    flex: 1,
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
};

export default SchedulePanel;
