import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import InfoButton from './InfoButton';

/**
 * Seção de Promoções - VERSÃO MELHORADA
 * Com percentual de desconto, quantidade disponível e ajudas
 */
const PromocoesSection = ({ userId, todasLojas, onSuccess }) => {
  const [promocoes, setPromocoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipoPromocao: 'produto_desconto',
    tipoDesconto: 'percentual', // 'percentual' ou 'valor_fixo'
    percentualDesconto: '',
    dataInicio: '',
    dataFim: '',
    quantidadeDisponivel: '', // Novo campo
    ativo: true,
    lojasDisponiveis: [],
    produtoPrincipalId: '',
    produtoDescontoId: '',
    precoCombo: '',
    produtoId: '',
    quantidade: '',
    precoTotal: '',
    quantidadeCompra: '',
    quantidadeLeva: '',
  });

  /* ====================================
     CARREGAR DADOS
  ==================================== */
  useEffect(() => {
    carregarDados();
  }, [userId]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      const lojaIds = todasLojas.map(l => l.id);
      const { data: produtosData } = await supabase
        .from('produtos')
        .select('*')
        .in('loja_id', lojaIds)
        .order('nome');

      setProdutos(produtosData || []);

      const { data: promocoesData } = await supabase
        .from('combos')
        .select('*')
        .order('created_at', { ascending: false });

      setPromocoes(promocoesData || []);

    } catch (error) {
      console.error('[Promoções] Erro ao carregar:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ====================================
     HANDLERS
  ==================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let config = {};

      // Montar config baseado no tipo
      if (formData.tipoPromocao === 'produto_desconto') {
        const prodPrincipal = produtos.find(p => p.id === formData.produtoPrincipalId);
        const prodDesconto = produtos.find(p => p.id === formData.produtoDescontoId);

        if (!prodPrincipal || !prodDesconto) {
          alert('❌ Selecione os produtos');
          return;
        }

        // Calcular preço baseado no tipo de desconto
        let precoFinal;
        if (formData.tipoDesconto === 'percentual') {
          const desconto = Number(formData.percentualDesconto);
          precoFinal = Number(prodDesconto.preco) * (1 - desconto / 100);
        } else {
          precoFinal = Number(formData.precoCombo);
        }

        config = {
          produto_principal_id: prodPrincipal.id,
          produto_principal_nome: prodPrincipal.nome,
          produto_desconto_id: prodDesconto.id,
          produto_desconto_nome: prodDesconto.nome,
          preco_combo: precoFinal,
          preco_original: Number(prodDesconto.preco),
          economia: Number(prodDesconto.preco) - precoFinal,
          tipo_desconto: formData.tipoDesconto,
          percentual_desconto: formData.tipoDesconto === 'percentual' ? Number(formData.percentualDesconto) : null,
        };
      } else if (formData.tipoPromocao === 'quantidade_preco') {
        const produto = produtos.find(p => p.id === formData.produtoId);

        if (!produto) {
          alert('❌ Selecione o produto');
          return;
        }

        const precoTotal = Number(formData.precoTotal);
        const quantidade = Number(formData.quantidade);

        config = {
          produto_id: produto.id,
          produto_nome: produto.nome,
          quantidade: quantidade,
          preco_total: precoTotal,
          preco_unitario_normal: Number(produto.preco),
          preco_unitario_combo: precoTotal / quantidade,
          economia_total: (Number(produto.preco) * quantidade) - precoTotal,
        };
      } else if (formData.tipoPromocao === 'compre_leve') {
        const produto = produtos.find(p => p.id === formData.produtoId);

        if (!produto) {
          alert('❌ Selecione o produto');
          return;
        }

        config = {
          produto_id: produto.id,
          produto_nome: produto.nome,
          quantidade_compra: Number(formData.quantidadeCompra),
          quantidade_leva: Number(formData.quantidadeLeva),
          preco_unitario: Number(produto.preco),
        };
      }

      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        tipo_combo: formData.tipoPromocao,
        ativo: formData.ativo,
        data_inicio: formData.dataInicio || null,
        data_fim: formData.dataFim || null,
        quantidade_disponivel: formData.quantidadeDisponivel ? Number(formData.quantidadeDisponivel) : null,
        lojas_disponiveis: formData.lojasDisponiveis.length > 0 ? formData.lojasDisponiveis : null,
        config: config,
        criado_por: userId,
      };

      if (editando) {
        const { error } = await supabase
          .from('combos')
          .update(payload)
          .eq('id', editando.id);

        if (error) throw error;
        alert('✅ Promoção atualizada!');
      } else {
        const { error } = await supabase
          .from('combos')
          .insert([payload]);

        if (error) throw error;
        alert('✅ Promoção criada!');
      }

      setShowModal(false);
      setEditando(null);
      resetForm();
      carregarDados();
      onSuccess?.();

    } catch (error) {
      console.error('[Promoções] Erro:', error);
      alert('❌ Erro ao salvar promoção');
    }
  };

  const handleToggleAtivo = async (promocao) => {
    try {
      const { error } = await supabase
        .from('combos')
        .update({ ativo: !promocao.ativo })
        .eq('id', promocao.id);

      if (error) throw error;
      carregarDados();
    } catch (error) {
      alert('❌ Erro ao alterar status');
    }
  };

  const handleExcluir = async (promocaoId) => {
    if (!confirm('Tem certeza que deseja excluir esta promoção?')) return;

    try {
      const { error } = await supabase
        .from('combos')
        .delete()
        .eq('id', promocaoId);

      if (error) throw error;
      alert('✅ Promoção excluída!');
      carregarDados();
    } catch (error) {
      alert('❌ Erro ao excluir');
    }
  };

  const handleEditar = (promocao) => {
    setEditando(promocao);
    
    setFormData({
      nome: promocao.nome,
      descricao: promocao.descricao || '',
      tipoPromocao: promocao.tipo_combo,
      tipoDesconto: promocao.config.tipo_desconto || 'valor_fixo',
      percentualDesconto: promocao.config.percentual_desconto || '',
      dataInicio: promocao.data_inicio ? promocao.data_inicio.split('T')[0] : '',
      dataFim: promocao.data_fim ? promocao.data_fim.split('T')[0] : '',
      quantidadeDisponivel: promocao.quantidade_disponivel || '',
      ativo: promocao.ativo,
      lojasDisponiveis: promocao.lojas_disponiveis || [],
      produtoPrincipalId: promocao.config.produto_principal_id || '',
      produtoDescontoId: promocao.config.produto_desconto_id || '',
      precoCombo: promocao.config.preco_combo || '',
      produtoId: promocao.config.produto_id || '',
      quantidade: promocao.config.quantidade || '',
      precoTotal: promocao.config.preco_total || '',
      quantidadeCompra: promocao.config.quantidade_compra || '',
      quantidadeLeva: promocao.config.quantidade_leva || '',
    });
    
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      tipoPromocao: 'produto_desconto',
      tipoDesconto: 'percentual',
      percentualDesconto: '',
      dataInicio: '',
      dataFim: '',
      quantidadeDisponivel: '',
      ativo: true,
      lojasDisponiveis: [],
      produtoPrincipalId: '',
      produtoDescontoId: '',
      precoCombo: '',
      produtoId: '',
      quantidade: '',
      precoTotal: '',
      quantidadeCompra: '',
      quantidadeLeva: '',
    });
  };

  /* ====================================
     HELPERS
  ==================================== */
  const getTipoTexto = (tipo) => {
    const tipos = {
      'produto_desconto': '🎁 Compre X, Y sai mais barato',
      'quantidade_preco': '📦 X unidades por R$ Y',
      'compre_leve': '🎉 Compre X leve Y',
    };
    return tipos[tipo] || tipo;
  };

  const getDescricao = (promocao) => {
    const cfg = promocao.config;
    
    if (promocao.tipo_combo === 'produto_desconto') {
      const desconto = cfg.tipo_desconto === 'percentual' 
        ? `${cfg.percentual_desconto}% OFF`
        : `R$ ${cfg.preco_combo?.toFixed(2)}`;
      return `Comprando ${cfg.produto_principal_nome}, ${cfg.produto_desconto_nome} sai por ${desconto}`;
    } else if (promocao.tipo_combo === 'quantidade_preco') {
      return `${cfg.quantidade} ${cfg.produto_nome} por R$ ${cfg.preco_total?.toFixed(2)}`;
    } else if (promocao.tipo_combo === 'compre_leve') {
      return `Compre ${cfg.quantidade_compra} ${cfg.produto_nome}, leve ${cfg.quantidade_leva}`;
    }
    return promocao.descricao;
  };

  const getLojasTexto = (promocao) => {
    if (!promocao.lojas_disponiveis || promocao.lojas_disponiveis.length === 0) {
      return '🏪 Todas as filiais';
    }
    const nomes = promocao.lojas_disponiveis
      .map(id => todasLojas.find(l => l.id === id)?.nome)
      .filter(Boolean);
    return `🏪 ${nomes.join(', ')}`;
  };

  /* ====================================
     RENDER
  ==================================== */
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <h2 style={styles.title}>🎁 Promoções e Ofertas</h2>
            <p style={styles.subtitle}>Crie promoções para aumentar suas vendas</p>
          </div>
          <InfoButton title="Como funcionam as promoções?">
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Cadastre <strong>produtos primeiro</strong></li>
              <li>Depois crie promoções usando esses produtos</li>
              <li>Escolha o tipo de promoção adequado</li>
              <li>Defina preço ou percentual de desconto</li>
              <li>Ative quando estiver pronta!</li>
            </ul>
          </InfoButton>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditando(null);
            setShowModal(true);
          }}
          style={styles.createButton}
        >
          ➕ Nova Promoção
        </button>
      </div>

      {/* Aviso importante */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #ffc107',
      }}>
        <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>
          ℹ️ <strong>Importante:</strong> O upload em lote funciona apenas para produtos. 
          Promoções devem ser criadas individualmente pelo botão "Nova Promoção".
        </p>
      </div>

      {/* Lista de Promoções */}
      {loading ? (
        <div style={styles.loading}>Carregando promoções...</div>
      ) : promocoes.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '3rem', margin: '0 0 15px 0' }}>🎁</p>
          <h3 style={{ color: '#666' }}>Nenhuma promoção cadastrada</h3>
          <p style={{ color: '#999' }}>Crie promoções para impulsionar suas vendas!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {promocoes.map(promocao => (
            <div key={promocao.id} style={{
              ...styles.card,
              borderLeft: promocao.ativo ? '5px solid #28a745' : '5px solid #dc3545',
              opacity: promocao.ativo ? 1 : 0.7
            }}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <div style={{ flex: 1 }}>
                  <strong style={styles.cardTitle}>{promocao.nome}</strong>
                  <small style={styles.badge}>
                    {getTipoTexto(promocao.tipo_combo)}
                  </small>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: promocao.ativo ? '#d4edda' : '#f8d7da',
                  color: promocao.ativo ? '#28a745' : '#dc3545',
                }}>
                  {promocao.ativo ? '✅ Ativa' : '⏸️ Inativa'}
                </span>
              </div>

              {/* Descrição */}
              <p style={styles.cardDescription}>
                {getDescricao(promocao)}
              </p>

              {/* Quantidade disponível */}
              {promocao.quantidade_disponivel && (
                <div style={{
                  ...styles.cardInfo,
                  backgroundColor: '#e8f5e9',
                  border: '1px solid #4caf50',
                }}>
                  📦 {promocao.quantidade_disponivel} combo{promocao.quantidade_disponivel > 1 ? 's' : ''} disponíve{promocao.quantidade_disponivel > 1 ? 'is' : 'l'}
                </div>
              )}

              {/* Lojas */}
              <div style={styles.cardInfo}>
                {getLojasTexto(promocao)}
              </div>

              {/* Datas */}
              {(promocao.data_inicio || promocao.data_fim) && (
                <div style={styles.cardDates}>
                  📅 {promocao.data_inicio ? new Date(promocao.data_inicio).toLocaleDateString('pt-BR') : '---'} até {promocao.data_fim ? new Date(promocao.data_fim).toLocaleDateString('pt-BR') : '---'}
                </div>
              )}

              {/* Ações */}
              <div style={styles.cardActions}>
                <button
                  onClick={() => handleToggleAtivo(promocao)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: promocao.ativo ? '#ffc107' : '#28a745',
                    color: promocao.ativo ? '#333' : 'white'
                  }}
                >
                  {promocao.ativo ? '⏸️ Desativar' : '▶️ Ativar'}
                </button>
                <button
                  onClick={() => handleEditar(promocao)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#17a2b8'
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleExcluir(promocao.id)}
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#dc3545'
                  }}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Cadastro/Edição */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editando ? '✏️ Editar Promoção' : '➕ Nova Promoção'}
              </h3>
              <button onClick={() => setShowModal(false)} style={styles.closeButton}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Nome */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Nome da Promoção *
                  <InfoButton title="Nome da Promoção">
                    Escolha um nome atrativo que chame atenção do cliente.
                    <br />Ex: "Combo Verão", "Mega Oferta", "Leve 3 Pague 2"
                  </InfoButton>
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                  required
                  style={styles.input}
                  placeholder="Ex: Combo Verão"
                />
              </div>

              {/* Tipo */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Tipo de Promoção *
                  <InfoButton title="Tipos de Promoção">
                    <strong>Compre X, Y sai mais barato:</strong> Cliente compra produto principal, outro sai com desconto
                    <br /><br />
                    <strong>X unidades por R$ Y:</strong> Venda múltiplas unidades por preço especial
                    <br /><br />
                    <strong>Compre X leve Y:</strong> Cliente compra quantidade e leva mais unidades
                  </InfoButton>
                </label>
                <select
                  value={formData.tipoPromocao}
                  onChange={e => setFormData({...formData, tipoPromocao: e.target.value})}
                  style={styles.input}
                >
                  <option value="produto_desconto">🎁 Compre X, Y sai mais barato</option>
                  <option value="quantidade_preco">📦 X unidades por R$ Y</option>
                  <option value="compre_leve">🎉 Compre X leve Y</option>
                </select>
              </div>

              {/* Campos dinâmicos - PRODUTO_DESCONTO */}
              {formData.tipoPromocao === 'produto_desconto' && (
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Produto Principal *</label>
                      <select
                        value={formData.produtoPrincipalId}
                        onChange={e => setFormData({...formData, produtoPrincipalId: e.target.value})}
                        required
                        style={styles.input}
                      >
                        <option value="">Selecione</option>
                        {produtos.map(p => (
                          <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco?.toFixed(2)}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Produto com Desconto *</label>
                      <select
                        value={formData.produtoDescontoId}
                        onChange={e => setFormData({...formData, produtoDescontoId: e.target.value})}
                        required
                        style={styles.input}
                      >
                        <option value="">Selecione</option>
                        {produtos.map(p => (
                          <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco?.toFixed(2)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tipo de Desconto */}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      Como aplicar o desconto?
                      <InfoButton title="Tipo de Desconto">
                        <strong>Percentual:</strong> Desconto em % do preço original
                        <br />Ex: 20% OFF = produto de R$ 100 sai por R$ 80
                        <br /><br />
                        <strong>Valor Fixo:</strong> Defina o preço final direto
                        <br />Ex: R$ 49,90 (independente do preço original)
                      </InfoButton>
                    </label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radio}>
                        <input
                          type="radio"
                          name="tipoDesconto"
                          value="percentual"
                          checked={formData.tipoDesconto === 'percentual'}
                          onChange={e => setFormData({...formData, tipoDesconto: e.target.value})}
                        />
                        <span>Percentual de Desconto</span>
                      </label>
                      <label style={styles.radio}>
                        <input
                          type="radio"
                          name="tipoDesconto"
                          value="valor_fixo"
                          checked={formData.tipoDesconto === 'valor_fixo'}
                          onChange={e => setFormData({...formData, tipoDesconto: e.target.value})}
                        />
                        <span>Valor Fixo</span>
                      </label>
                    </div>
                  </div>

                  {/* Campo baseado no tipo */}
                  {formData.tipoDesconto === 'percentual' ? (
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Percentual de Desconto (%) *</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        step="0.01"
                        value={formData.percentualDesconto}
                        onChange={e => setFormData({...formData, percentualDesconto: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 20 (para 20% OFF)"
                      />
                      {formData.percentualDesconto && formData.produtoDescontoId && (
                        <small style={{ color: '#28a745', display: 'block', marginTop: '6px' }}>
                          💰 Preço final: R$ {(
                            produtos.find(p => p.id === formData.produtoDescontoId)?.preco * 
                            (1 - Number(formData.percentualDesconto) / 100)
                          ).toFixed(2)}
                        </small>
                      )}
                    </div>
                  ) : (
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Preço na Promoção (R$) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.precoCombo}
                        onChange={e => setFormData({...formData, precoCombo: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 49.90"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Campos dinâmicos - QUANTIDADE_PRECO */}
              {formData.tipoPromocao === 'quantidade_preco' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Produto *</label>
                    <select
                      value={formData.produtoId}
                      onChange={e => setFormData({...formData, produtoId: e.target.value})}
                      required
                      style={styles.input}
                    >
                      <option value="">Selecione</option>
                      {produtos.map(p => (
                        <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco?.toFixed(2)}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Quantidade *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantidade}
                        onChange={e => setFormData({...formData, quantidade: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 5"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Preço Total *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.precoTotal}
                        onChange={e => setFormData({...formData, precoTotal: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 100.00"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Campos dinâmicos - COMPRE_LEVE */}
              {formData.tipoPromocao === 'compre_leve' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Produto *</label>
                    <select
                      value={formData.produtoId}
                      onChange={e => setFormData({...formData, produtoId: e.target.value})}
                      required
                      style={styles.input}
                    >
                      <option value="">Selecione</option>
                      {produtos.map(p => (
                        <option key={p.id} value={p.id}>{p.nome} - R$ {p.preco?.toFixed(2)}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Compre *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantidadeCompra}
                        onChange={e => setFormData({...formData, quantidadeCompra: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Leve *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantidadeLeva}
                        onChange={e => setFormData({...formData, quantidadeLeva: e.target.value})}
                        required
                        style={styles.input}
                        placeholder="Ex: 3"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Quantidade Disponível */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Quantidade de Combos Disponíveis (Opcional)
                  <InfoButton title="Quantidade Disponível">
                    Deixe vazio para <strong>ilimitado</strong>.
                    <br /><br />
                    Se preencher, o sistema vai controlar quantos combos ainda podem ser vendidos.
                    <br /><br />
                    Ex: Se você tem 10 cadernos e 10 canetas, coloque 10 aqui.
                  </InfoButton>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantidadeDisponivel}
                  onChange={e => setFormData({...formData, quantidadeDisponivel: e.target.value})}
                  style={styles.input}
                  placeholder="Deixe vazio para ilimitado"
                />
              </div>

              {/* Filiais */}
              {todasLojas.length > 1 && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    🏪 Filiais onde a promoção está disponível
                    <InfoButton title="Filiais">
                      Deixe vazio para a promoção valer em <strong>todas as filiais</strong>.
                      <br /><br />
                      Marque as filiais específicas se quiser limitar.
                    </InfoButton>
                  </label>
                  <small style={styles.hint}>Deixe vazio para todas as filiais</small>
                  <div style={styles.checkboxGroup}>
                    {todasLojas.map(loja => (
                      <label key={loja.id} style={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={formData.lojasDisponiveis.includes(loja.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                lojasDisponiveis: [...formData.lojasDisponiveis, loja.id]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                lojasDisponiveis: formData.lojasDisponiveis.filter(id => id !== loja.id)
                              });
                            }
                          }}
                        />
                        <span>{loja.nome}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Datas */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Data Início</label>
                  <input
                    type="date"
                    value={formData.dataInicio}
                    onChange={e => setFormData({...formData, dataInicio: e.target.value})}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Data Fim</label>
                  <input
                    type="date"
                    value={formData.dataFim}
                    onChange={e => setFormData({...formData, dataFim: e.target.value})}
                    style={styles.input}
                  />
                </div>
              </div>

              {/* Ativo */}
              <div style={styles.formGroup}>
                <label style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.ativo}
                    onChange={e => setFormData({...formData, ativo: e.target.checked})}
                  />
                  <span style={{ fontWeight: '600' }}>Ativar promoção imediatamente</span>
                </label>
              </div>

              {/* Botões */}
              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                >
                  {editando ? '💾 Salvar' : '➕ Criar Promoção'}
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
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e9ecef',
    marginTop: '30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#495057',
    margin: '0 0 8px 0',
    fontWeight: '700',
  },
  subtitle: {
    margin: 0,
    color: '#666',
    fontSize: '0.95rem',
  },
  createButton: {
    backgroundColor: '#6f42c1',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e9ecef',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    alignItems: 'start',
  },
  cardTitle: {
    display: 'block',
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '6px',
  },
  badge: {
    backgroundColor: '#e3f2fd',
    color: '#6f42c1',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#495057',
    marginBottom: '12px',
    lineHeight: '1.5',
  },
  cardInfo: {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
  },
  cardDates: {
    fontSize: '0.8rem',
    color: '#888',
    marginBottom: '15px',
    padding: '6px',
    backgroundColor: '#fff3cd',
    borderRadius: '4px',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #e9ecef',
  },
  actionButton: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '0.85rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    color: 'white',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '2px solid #f0f0f0',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#333',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#999',
    cursor: 'pointer',
  },
  form: {
    padding: '24px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '2px solid #e9ecef',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  hint: {
    display: 'block',
    marginTop: '4px',
    marginBottom: '8px',
    fontSize: '0.85rem',
    color: '#666',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '2px solid #f0f0f0',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default PromocoesSection;