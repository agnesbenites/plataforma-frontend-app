import React, { useState, useMemo } from 'react';

const LojistaQRCode = () => {
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [consultorSelecionado, setConsultorSelecionado] = useState('');
  const [qrCodeGerado, setQrCodeGerado] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dados mockados
  const produtosDisponiveis = useMemo(() => [
    {
      id: 'prod_001',
      nome: 'Smartphone Galaxy S23',
      preco: 2500.00,
      percentualComissao: 5,
      categoria: 'Eletrônicos',
      sku: 'SM-GS23-BLK'
    },
    {
      id: 'prod_002', 
      nome: 'Fone Bluetooth',
      preco: 299.90,
      percentualComissao: 8,
      categoria: 'Áudio',
      sku: 'FB-T500-BLK'
    },
    {
      id: 'prod_003',
      nome: 'Tablet 10"',
      preco: 1200.00,
      percentualComissao: 6,
      categoria: 'Eletrônicos',
      sku: 'TB-10PRO-SLV'
    }
  ], []);

  const consultores = useMemo(() => [
    { id: 'cons_001', nome: 'João Silva', stripeAccountId: 'acct_123' },
    { id: 'cons_002', nome: 'Maria Santos', stripeAccountId: 'acct_456' },
    { id: 'cons_003', nome: 'Pedro Oliveira', stripeAccountId: 'acct_789' }
  ], []);

  const adicionarProduto = (produtoId) => {
    const produto = produtosDisponiveis.find(p => p.id === produtoId);
    if (produto) {
      setProdutosSelecionados(prev => [...prev, { 
        ...produto, 
        quantidade: 1,
        idUnico: `${produtoId}_${Date.now()}`
      }]);
    }
  };

  const removerProduto = (idUnico) => {
    setProdutosSelecionados(prev => prev.filter(p => p.idUnico !== idUnico));
  };

  const atualizarQuantidade = (idUnico, quantidade) => {
    setProdutosSelecionados(prev => 
      prev.map(p => p.idUnico === idUnico ? { ...p, quantidade: Math.max(1, quantidade) } : p)
    );
  };

  const calcularTotais = () => {
    return produtosSelecionados.reduce((acc, produto) => {
      const valorProduto = produto.preco * produto.quantidade;
      const comissaoProduto = valorProduto * (produto.percentualComissao / 100);
      
      return {
        valorTotal: acc.valorTotal + valorProduto,
        comissaoTotal: acc.comissaoTotal + comissaoProduto,
        quantidadeTotal: acc.quantidadeTotal + produto.quantidade
      };
    }, { valorTotal: 0, comissaoTotal: 0, quantidadeTotal: 0 });
  };

  const gerarQRCodeVenda = async () => {
    if (produtosSelecionados.length === 0 || !consultorSelecionado) {
      alert('Selecione produtos e um consultor!');
      return;
    }

    setLoading(true);
    
    try {
      const totais = calcularTotais();
      const consultor = consultores.find(c => c.id === consultorSelecionado);

      // Gerar ID único curto para a venda
      const vendaId = `v${Date.now().toString(36)}`;
      
      // Dados da venda para o QR Code/Link
      const vendaData = {
        vendaId: vendaId,
        produtos: produtosSelecionados.map(p => ({
          id: p.id,
          sku: p.sku,
          nome: p.nome,
          preco: p.preco,
          quantidade: p.quantidade,
          percentualComissao: p.percentualComissao
        })),
        consultorId: consultorSelecionado,
        consultorNome: consultor.nome,
        valorTotal: totais.valorTotal,
        timestamp: new Date().toISOString()
      };

      // Codificar dados para QR Code
      const qrCodeData = Buffer.from(JSON.stringify(vendaData)).toString('base64');
      
      // Gerar link curto
      const linkCurto = `suacomprasmart.com/v/${vendaId}`;
      
      // URL completa para integração
      const urlIntegracao = `${window.location.origin}/integracao-venda/${vendaId}`;

      setQrCodeGerado({
        qrCode: qrCodeData,
        vendaId: vendaId,
        linkCurto: linkCurto,
        urlIntegracao: urlIntegracao,
        valorTotal: totais.valorTotal,
        comissaoTotal: totais.comissaoTotal,
        dadosVenda: vendaData
      });

      // Salvar venda no backend
      await fetch('/api/vendas/salvar-venda-pendente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendaId: vendaId,
          dadosVenda: vendaData,
          status: 'pendente'
        })
      });

    } catch (error) {
      console.error('Erro gerar QR Code:', error);
      alert('Erro ao gerar QR Code de venda');
    } finally {
      setLoading(false);
    }
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(qrCodeGerado.urlIntegracao);
    alert('Link copiado para a área de transferência!');
  };

  const totais = calcularTotais();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Gerar Venda com QR Code</h1>
        <p style={styles.subtitle}>Crie vendas para clientes pagarem no caixa físico</p>
      </div>

      <div style={styles.content}>
        {/* Seleção de Consultor */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👤 Consultor Responsável</h2>
          <select 
            value={consultorSelecionado} 
            onChange={(e) => setConsultorSelecionado(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione um consultor</option>
            {consultores.map(consultor => (
              <option key={consultor.id} value={consultor.id}>
                {consultor.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Seleção de Produtos */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📦 Produtos da Venda</h2>
          
          <div style={styles.produtosGrid}>
            {/* Produtos Disponíveis */}
            <div style={styles.produtosDisponiveis}>
              <h3 style={styles.subsectionTitle}>Adicionar Produtos</h3>
              <div style={styles.listaProdutos}>
                {produtosDisponiveis.map(produto => (
                  <div key={produto.id} style={styles.produtoCard}>
                    <div style={styles.produtoInfo}>
                      <strong>{produto.nome}</strong>
                      <div style={styles.produtoDetalhes}>
                        R$ {produto.preco.toFixed(2)} • {produto.percentualComissao}% comissão
                      </div>
                      <div style={styles.produtoSku}>
                        SKU: {produto.sku}
                      </div>
                    </div>
                    <button 
                      onClick={() => adicionarProduto(produto.id)}
                      style={styles.addButton}
                    >
                      ➕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Produtos Selecionados */}
            <div style={styles.produtosSelecionados}>
              <h3 style={styles.subsectionTitle}>
                Carrinho ({produtosSelecionados.length})
              </h3>
              
              {produtosSelecionados.length === 0 ? (
                <div style={styles.emptyState}>
                  Nenhum produto no carrinho
                </div>
              ) : (
                <div style={styles.listaSelecionados}>
                  {produtosSelecionados.map(produto => (
                    <div key={produto.idUnico} style={styles.produtoSelecionado}>
                      <div style={styles.produtoSelecionadoInfo}>
                        <strong>{produto.nome}</strong>
                        <div style={styles.produtoSku}>SKU: {produto.sku}</div>
                        <div style={styles.produtoControls}>
                          <div style={styles.quantidadeControl}>
                            <button 
                              onClick={() => atualizarQuantidade(produto.idUnico, produto.quantidade - 1)}
                              style={styles.quantidadeBtn}
                            >
                              -
                            </button>
                            <span style={styles.quantidade}>{produto.quantidade}</span>
                            <button 
                              onClick={() => atualizarQuantidade(produto.idUnico, produto.quantidade + 1)}
                              style={styles.quantidadeBtn}
                            >
                              +
                            </button>
                          </div>
                          <div style={styles.produtoValor}>
                            R$ {(produto.preco * produto.quantidade).toFixed(2)}
                          </div>
                        </div>
                        <div style={styles.comissaoInfo}>
                          Comissão: R$ {(produto.preco * produto.quantidade * produto.percentualComissao / 100).toFixed(2)}
                        </div>
                      </div>
                      <button 
                        onClick={() => removerProduto(produto.idUnico)}
                        style={styles.removeButton}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resumo da Venda */}
        {produtosSelecionados.length > 0 && (
          <div style={styles.resumoSection}>
            <h2 style={styles.sectionTitle}>💰 Resumo da Venda</h2>
            <div style={styles.resumoGrid}>
              <div style={styles.resumoItem}>
                <span>Valor Total:</span>
                <strong style={styles.valorTotal}>R$ {totais.valorTotal.toFixed(2)}</strong>
              </div>
              <div style={styles.resumoItem}>
                <span>Comissão Consultor:</span>
                <strong style={styles.comissaoTotal}>R$ {totais.comissaoTotal.toFixed(2)}</strong>
              </div>
              <div style={styles.resumoItem}>
                <span>Quantidade de Itens:</span>
                <strong>{totais.quantidadeTotal}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Gerar QR Code */}
        {produtosSelecionados.length > 0 && consultorSelecionado && (
          <div style={styles.gerarSection}>
            <button 
              onClick={gerarQRCodeVenda}
              disabled={loading}
              style={styles.gerarButton}
            >
              {loading ? '🔄 Gerando...' : '🔳 Gerar QR Code & Link'}
            </button>
          </div>
        )}

        {/* QR Code e Link Gerado */}
        {qrCodeGerado && (
          <div style={styles.qrCodeSection}>
            <h2 style={styles.sectionTitle}>✅ Venda Criada com Sucesso!</h2>
            
            <div style={styles.compartilharContainer}>
              {/* QR Code */}
              <div style={styles.qrCodeContainer}>
                <h3>📱 QR Code para Escaneamento</h3>
                <div style={styles.qrCodeImage}>
                  <div style={styles.qrPlaceholder}>
                    <div style={styles.qrText}>QR CODE</div>
                    <div style={styles.qrVendaId}>Venda: {qrCodeGerado.vendaId}</div>
                    <div style={styles.qrValor}>R$ {qrCodeGerado.valorTotal.toFixed(2)}</div>
                  </div>
                </div>
                <p style={styles.instructionText}>
                  Cliente escaneia no caixa físico
                </p>
              </div>

              {/* Link Curto */}
              <div style={styles.linkContainer}>
                <h3>🔗 Link para Integração</h3>
                <div style={styles.linkBox}>
                  <div style={styles.linkDisplay}>
                    <strong style={styles.linkCurto}>{qrCodeGerado.linkCurto}</strong>
                  </div>
                  <button 
                    onClick={copiarLink}
                    style={styles.copyButton}
                  >
                    📋 Copiar Link
                  </button>
                </div>
                <div style={styles.linkInfo}>
                  <p><strong>Como usar o link:</strong></p>
                  <ol style={styles.instructionsList}>
                    <li>Cole no sistema do lojista</li>
                    <li>Produtos são adicionados automaticamente ao carrinho</li>
                    <li>Cliente paga presencialmente</li>
                    <li>Comissão é processada automaticamente</li>
                  </ol>
                </div>

                {/* URL Completa para Debug */}
                <div style={styles.urlCompleta}>
                  <details style={styles.details}>
                    <summary style={styles.summary}>URL Completa de Integração</summary>
                    <code style={styles.code}>{qrCodeGerado.urlIntegracao}</code>
                  </details>
                </div>
              </div>
            </div>

            {/* Detalhes da Venda */}
            <div style={styles.detalhesVenda}>
              <h3>📋 Detalhes da Venda</h3>
              <div style={styles.detalhesGrid}>
                <div style={styles.detalheItem}>
                  <strong>ID da Venda:</strong> {qrCodeGerado.vendaId}
                </div>
                <div style={styles.detalheItem}>
                  <strong>Consultor:</strong> {qrCodeGerado.dadosVenda.consultorNome}
                </div>
                <div style={styles.detalheItem}>
                  <strong>Valor Total:</strong> R$ {qrCodeGerado.valorTotal.toFixed(2)}
                </div>
                <div style={styles.detalheItem}>
                  <strong>Comissão:</strong> R$ {qrCodeGerado.comissaoTotal.toFixed(2)}
                </div>
              </div>
              
              <div style={styles.produtosLista}>
                <h4>Produtos Incluídos:</h4>
                {qrCodeGerado.dadosVenda.produtos.map((produto, index) => (
                  <div key={index} style={styles.produtoResumo}>
                    {produto.quantidade}x {produto.nome} - R$ {(produto.preco * produto.quantidade).toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Inter, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',
    color: '#333',
    marginBottom: '8px',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    margin: 0
  },
  content: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  section: {
    marginBottom: '30px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  produtosGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  produtosDisponiveis: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  listaProdutos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  produtoCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #dee2e6'
  },
  produtoInfo: {
    flex: 1
  },
  produtoDetalhes: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '5px'
  },
  produtoSku: {
    fontSize: '0.8rem',
    color: '#999',
    marginTop: '2px'
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  produtosSelecionados: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  emptyState: {
    textAlign: 'center',
    color: '#666',
    padding: '40px 20px',
    fontStyle: 'italic'
  },
  listaSelecionados: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  produtoSelecionado: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    backgroundColor: '#e7f3ff',
    borderRadius: '8px',
    border: '1px solid #b3d9ff'
  },
  produtoSelecionadoInfo: {
    flex: 1
  },
  produtoControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  quantidadeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantidadeBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  quantidade: {
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center'
  },
  produtoValor: {
    fontWeight: 'bold',
    color: '#28a745'
  },
  comissaoInfo: {
    fontSize: '0.8rem',
    color: '#6f42c1',
    marginTop: '5px'
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  resumoSection: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb'
  },
  resumoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  resumoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px'
  },
  valorTotal: {
    color: '#28a745',
    fontSize: '1.2rem'
  },
  comissaoTotal: {
    color: '#6f42c1',
    fontSize: '1.1rem'
  },
  gerarSection: {
    textAlign: 'center',
    margin: '30px 0'
  },
  gerarButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  qrCodeSection: {
    marginTop: '30px',
    padding: '25px',
    backgroundColor: '#e7f3ff',
    borderRadius: '8px',
    border: '1px solid #b3d9ff'
  },
  compartilharContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginBottom: '30px'
  },
  qrCodeContainer: {
    textAlign: 'center'
  },
  qrCodeImage: {
    margin: '20px 0'
  },
  qrPlaceholder: {
    width: '200px',
    height: '200px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #007bff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    fontWeight: '600'
  },
  qrText: {
    fontSize: '1.2rem',
    color: '#007bff',
    marginBottom: '10px'
  },
  qrVendaId: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '5px'
  },
  qrValor: {
    fontSize: '1rem',
    color: '#28a745',
    fontWeight: 'bold'
  },
  instructionText: {
    color: '#666',
    fontSize: '0.9rem'
  },
  linkContainer: {
    padding: '20px'
  },
  linkBox: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  linkDisplay: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1.1rem'
  },
  linkCurto: {
    color: '#007bff'
  },
  copyButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  linkInfo: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px'
  },
  instructionsList: {
    margin: '10px 0',
    paddingLeft: '20px',
    fontSize: '0.9rem'
  },
  urlCompleta: {
    marginTop: '15px'
  },
  details: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '6px'
  },
  summary: {
    cursor: 'pointer',
    fontWeight: '600'
  },
  code: {
    display: 'block',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    fontSize: '0.8rem',
    wordBreak: 'break-all'
  },
  detalhesVenda: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  detalhesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  detalheItem: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  },
  produtosLista: {
    marginTop: '15px'
  },
  produtoResumo: {
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    marginBottom: '5px',
    borderRadius: '4px',
    fontSize: '0.9rem'
  }
};

export default LojistaQRCode;