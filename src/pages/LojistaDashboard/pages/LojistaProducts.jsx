import React, { useState, useEffect } from "react";

// Mocks de estilos (Mantidos para consistência visual no ambiente)
const produtoStyles = {
    container: {
        padding: "30px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "10px",
        flexWrap: "wrap",
        gap: "20px",
    },
    title: {
        fontSize: "2.2rem",
        color: "#333",
        marginBottom: "8px",
        fontWeight: "700",
    },
    subtitle: {
        fontSize: "1.1rem",
        color: "#666",
        margin: 0,
    },
    stats: {
        display: "flex",
        gap: "15px",
    },
    statCard: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        minWidth: "100px",
    },
    statNumber: {
        display: "block",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: "5px",
    },
    statLabel: {
        fontSize: "0.9rem",
        color: "#666",
        fontWeight: "500",
    },
    filters: {
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    searchBox: {
        flex: 1,
        minWidth: '200px'
    },
    searchInput: {
        width: "100%",
        padding: "12px 16px",
        border: "2px solid #e0e0e0",
        borderRadius: "8px",
        fontSize: "1rem",
    },
    filterSelect: {
        padding: "12px 16px",
        border: "2px solid #e0e0e0",
        borderRadius: "8px",
        fontSize: "1rem",
        backgroundColor: "white",
        minWidth: "200px",
    },
    addButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        fontSize: "0.95rem",
        fontWeight: "600",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background-color 0.2s",
    },
    hr: {
        border: "none",
        borderTop: "1px solid #e0e0e0",
        margin: "15px 0 30px 0",
    },
    formContainer: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "30px",
    },
    formTitle: {
        fontSize: "1.8rem",
        color: "#333",
        marginBottom: "20px",
        borderBottom: "1px solid #eee",
        paddingBottom: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
    },
    formSection: {
        padding: "15px",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
    },
    sectionTitle: {
        fontSize: "1.1rem",
        color: "#555",
        marginBottom: "15px",
        borderBottom: "1px solid #e0e0e0",
        paddingBottom: "5px",
        fontWeight: "600",
    },
    formGroup: {
        marginBottom: "15px",
    },
    formRow: {
        display: "flex",
        gap: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "500",
        color: "#333",
        fontSize: "0.95rem",
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "1rem",
        boxSizing: "border-box",
    },
    select: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "1rem",
        backgroundColor: "white",
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "1rem",
        boxSizing: "border-box",
        resize: "vertical",
    },
    formActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "20px",
    },
    cancelButton: {
        padding: "12px 25px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        color: "#333",
        cursor: "pointer",
        fontWeight: "600",
        transition: "background-color 0.2s",
    },
    submitButton: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        fontWeight: "600",
        transition: "background-color 0.2s",
    },
    badgeAtivo: {
        backgroundColor: "#d4edda",
        color: "#155724",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        border: "1px solid #c3e6cb",
    },
    badgeInativo: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        border: "1px solid #f5c6cb",
    },
    badgeEsgotado: {
        backgroundColor: "#f8f9fa",
        color: "#6c757d",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        border: "1px solid #dee2e6",
    },
    badgeEstoqueBaixo: {
        backgroundColor: "#fff3cd",
        color: "#856404",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        border: "1px solid #ffeaa7",
    },
    categoriaBadge: {
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "600",
        border: "1px solid",
    },
    helpText: {
        fontSize: "0.8rem",
        color: "#666",
        fontWeight: "normal",
        marginLeft: "5px",
    },
    comissaoPreview: {
        backgroundColor: "#e7f3ff",
        padding: "8px 12px",
        borderRadius: "6px",
        marginTop: "8px",
        fontSize: "0.9rem",
        border: "1px solid #b8daff",
    },
    fileInput: {
        width: "100%",
        padding: "12px 16px",
        border: "2px dashed #e0e0e0",
        borderRadius: "8px",
        fontSize: "1rem",
        backgroundColor: "#fafafa",
        cursor: "pointer",
    },
    imagePreview: {
        textAlign: "center",
        marginTop: "15px",
    },
    previewImage: {
        maxWidth: "200px",
        maxHeight: "200px",
        borderRadius: "8px",
        border: "2px solid #e0e0e0",
    },
    produtosGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px",
    },
    produtoCard: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        transition: "transform 0.2s ease",
    },
    produtoImage: {
        height: "200px",
        overflow: "hidden",
    },
    produtoImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    produtoInfo: {
        padding: "20px",
    },
    produtoHeader: {
        marginBottom: "15px",
    },
    produtoNome: {
        fontSize: "1.2rem",
        color: "#333",
        margin: "0 0 10px 0",
        fontWeight: "600",
    },
    produtoBadges: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
    },
    produtoDescricao: {
        color: "#666",
        fontSize: "0.9rem",
        marginBottom: "15px",
        lineHeight: "1.4",
    },
    produtoDetalhes: {
        marginBottom: "20px",
    },
    detalheItem: {
        margin: "5px 0",
        fontSize: "0.9rem",
        color: "#555",
    },
    produtoActions: {
        display: "flex",
        gap: "10px",
    },
    editButton: {
        backgroundColor: "#ffc107",
        color: "#212529",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "0.9rem",
        fontWeight: "600",
        cursor: "pointer",
        flex: 1,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "0.9rem",
        fontWeight: "600",
        cursor: "pointer",
        flex: 1,
    },
    emptyState: {
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginTop: "20px",
    },
    emptyIcon: {
        fontSize: "3rem",
        marginBottom: "10px",
    },
    emptyTitle: {
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "10px",
    },
    emptyText: {
        color: "#666",
        marginBottom: "20px",
    },
    listaContainer: {
        marginBottom: "30px",
    },
    listaTitle: {
        fontSize: "1.8rem",
        color: "#333",
        marginBottom: "20px",
    },
    message: (isError) => ({
        padding: "10px 15px",
        borderRadius: "8px",
        marginTop: "15px",
        textAlign: "left",
        fontSize: "0.9rem",
        fontWeight: "500",
        backgroundColor: isError ? "#f8d7da" : "#d4edda",
        color: isError ? "#721c24" : "#155724",
        border: isError ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
    }),
    loadingText: {
        textAlign: "center",
        padding: "20px",
        fontSize: "1.2rem",
        color: "#007bff",
    },
    apiError: {
        textAlign: "center",
        padding: "20px",
        fontSize: "1rem",
        color: "#dc3545",
        border: "1px solid #dc3545",
        borderRadius: "8px",
        backgroundColor: "#f8d7da",
    },
};

// =========================================================================
// SIMULAÇÃO DO CLIENTE SUPABASE (REMOVA ESTE BLOCO SE USAR O ARQUIVO REAL)
const supabase = {
  from: () => ({
    select: () => ({ 
        // Adicionando mocks de dados para testar o novo campo de comissão
        data: [{
            id: 1, nome: 'Smartphone X', sku: 'SPX001', categoria: '1', descricao: 'Smartphone Android de última geração.', preco: 1500.00, precoCusto: 800.00, estoque: 50, estoqueMinimo: 10, comissao: 12.5, tamanho: 'P', cor: 'Preto', peso: 0.2, status: 'ativo', imagemUrl: "https://placehold.co/300x300/007bff/ffffff?text=Smartphone"
        },
        {
            id: 2, nome: 'Sofá Modular Confort', sku: 'SMC002', categoria: '2', descricao: 'Sofá de 3 lugares com chaise reversível.', preco: 2800.00, precoCusto: 1200.00, estoque: 5, estoqueMinimo: 5, comissao: 8.0, tamanho: 'G', cor: 'Cinza', peso: 55.0, status: 'ativo', imagemUrl: "https://placehold.co/300x300/28a745/ffffff?text=Sof%C3%A1"
        }], 
        error: null, order: () => ({ data: [] }) }),
    insert: () => ({ data: [{ id: Date.now() }], error: null }),
    update: () => ({ data: [], error: null }),
    delete: () => ({ data: [], error: null }),
  }),
};
// =========================================================================

// ⚠️ URL BASE DO SEU BACKEND (MUDE PARA O ENDPOINT DO RENDER EM PRODUÇÃO!)
const API_BASE_URL = "http://localhost:5000";

export const LojistaProducts = () => {
  // Estado Principal
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null); 
  const [modoCadastro, setModoCadastro] = useState("lista"); // 'lista', 'manual', 'csv', 'erp'
  const [csvFile, setCsvFile] = useState(null); 

  // 🆕 ESTADOS DE INTEGRAÇÃO
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({
    text: "",
    isError: false,
  });

  const [categorias, setCategorias] = useState([
    { id: 1, nome: "📱 Eletrônicos & Tecnologia", cor: "#007bff" },
    { id: 2, nome: "🛋️ Móveis & Decoração", cor: "#28a745" },
    { id: 3, nome: "📚 Livros & Papelaria", cor: "#ffc107" },
    { id: 4, nome: "👗 Moda & Acessórios", cor: "#e83e8c" },
    { id: 5, nome: "🏠 Casa, Mesa e Banho", cor: "#6f42c1" },
    { id: 6, nome: "🎮 Games & Consoles", cor: "#dc3545" },
    { id: 7, nome: "🛠️ Ferramentas & Construção", cor: "#fd7e14" },
    { id: 8, nome: "🚗 Automotivo", cor: "#17a2b8" },
    { id: 9, nome: "👶 Bebê & Infantil", cor: "#e91e63" },
    { id: 10, nome: "💪 Esportes & Fitness", cor: "#00bcd4" },
    { id: 11, nome: "💄 Perfumaria & Cosméticos", cor: "#673ab7" },
    { id: 12, nome: "🥕 Alimentos & Bebidas", cor: "#8bc34a" },
  ]);
  const [produtos, setProdutos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [busca, setBusca] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    preco: "",
    precoCusto: "",
    estoque: "",
    estoqueMinimo: "5",
    comissao: "10", // 👈 COMISSÃO PARA CONSULTOR (SPLIT STRIPE)
    comissaoVendedor: "5", // 👈 NOVO CAMPO: COMISSÃO PARA VENDEDOR INTERNO (PAGO PELO LOJISTA)
    tamanho: "",
    cor: "",
    peso: "",
    imagem: null,
    sku: "",
    status: "ativo",
  }); 

  // -------------------------------------------------------------------------
  // FUNÇÕES DE INTEGRAÇÃO SUPABASE
  // -------------------------------------------------------------------------

  const fetchProdutos = async () => {
    setLoading(true);
    setApiError(null);

    // Mapeia os campos de snake_case para camelCase
    const columns = `
            id, nome, sku, categoria, descricao, 
            preco, preco_custo:precoCusto, estoque, 
            estoque_minimo:estoqueMinimo, comissao, 
            comissao_vendedor:comissaoVendedor, 
            tamanho, cor, peso, status, imagem_url:imagemUrl, 
            data_cadastro:dataCadastro
        `;

    const { data, error } = await supabase
      .from("produtos")
      .select(columns)
      .order("data_cadastro", { ascending: false });

    if (error) {
      console.error("Erro ao buscar produtos:", error);
      setApiError(
        "Não foi possível carregar os produtos. Verifique a conexão com o DB e RLS."
      );
      setProdutos([]);
    } else {
      setProdutos(data);
    }
    setLoading(false);
  };

  // Chama a busca ao montar o componente
  useEffect(() => {
    fetchProdutos();
  }, []);

  // 🆕 C: CREATE / U: UPDATE - CRIAR/EDITAR PRODUTO MANUALMENTE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditing = !!editingProduto;

    // Prepara os dados para o Supabase (usa snake_case para o DB)
    const produtoPayload = {
      nome: formData.nome,
      sku: formData.sku || null,
      categoria: parseInt(formData.categoria),
      descricao: formData.descricao,
      preco: parseFloat(formData.preco),
      preco_custo: parseFloat(formData.precoCusto || 0), // snake_case
      estoque: parseInt(formData.estoque),
      estoque_minimo: parseInt(formData.estoqueMinimo), // snake_case
      comissao: parseFloat(formData.comissao), // COMISSÃO CONSULTOR
      comissao_vendedor: parseFloat(formData.comissaoVendedor), // COMISSÃO VENDEDOR
      tamanho: formData.tamanho,
      cor: formData.cor,
      peso: parseFloat(formData.peso || 0),
      status: formData.status,
      // Simulação de URL de imagem
      imagem_url:
        formData.imagemUrl ||
        "https://placehold.co/300x300/007bff/ffffff?text=Produto",
    };

    let dbOperation;
    if (isEditing) {
      dbOperation = supabase
        .from("produtos")
        .update(produtoPayload)
        .eq("id", editingProduto.id)
        .select();
    } else {
      dbOperation = supabase.from("produtos").insert([produtoPayload]).select();
    }

    const { error } = await dbOperation;

    if (error) {
      console.error(
        `Falha ao ${isEditing ? "atualizar" : "cadastrar"} produto: ${
          error.message
        }`
      );
    } else {
      console.log(`Produto ${isEditing ? "atualizado" : "cadastrado"} com sucesso!`);
      handleCancel();
      fetchProdutos(); // Recarrega a lista
    }
    setLoading(false);
  };

  // 🆕 D: DELETE - EXCLUIR PRODUTO
  const handleDelete = async (id) => {
    console.log(`Tentativa de exclusão do produto ID: ${id}.`);
    
    setLoading(true);

    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) {
      console.error(`Falha ao excluir produto: ${error.message}`);
    } else {
      console.log("Produto excluído com sucesso!");
      fetchProdutos(); // Recarrega a lista
    }
    setLoading(false);
  }; 

  // -------------------------------------------------------------------------
  // LÓGICA DE UI E EVENTOS
  // -------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEdit = (produto) => {
    setFormData({
      ...produto,
      precoCusto: produto.precoCusto || "", 
      estoqueMinimo: produto.estoqueMinimo || "5",
      comissaoVendedor: produto.comissaoVendedor || "5", // Carrega comissão do vendedor
    });
    setEditingProduto(produto);
    setShowForm(true);
    setModoCadastro("manual");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduto(null);
    setFormData({
      nome: "", categoria: "", descricao: "", preco: "", precoCusto: "", estoque: "", 
      estoqueMinimo: "5", comissao: "10", comissaoVendedor: "5", tamanho: "", cor: "", 
      peso: "", imagem: null, sku: "", status: "ativo",
    });
    setModoCadastro("lista");
    setCsvFile(null);
    setUploadMessage({ text: "", isError: false });
  }; 

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      setUploadMessage({ text: "", isError: false });
    } else if (file) {
      setCsvFile(null);
      setUploadMessage({
        text: "Por favor, selecione um arquivo CSV (.csv) válido.",
        isError: true,
      });
    }
  };

  const handleImportarCsv = async (e) => {
    e.preventDefault();
    // Lógica de importação CSV (Mantida com mock de API)
    if (!csvFile) {
      setUploadMessage({ text: "Nenhum arquivo CSV selecionado.", isError: true, });
      return;
    }
    setIsUploading(true);
    setUploadMessage({ text: "Enviando e processando arquivo no servidor...", isError: false, });

    const formDataApi = new FormData();
    formDataApi.append("csvFile", csvFile);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/lojistas/produtos/importar-csv`,
        { method: "POST", body: formDataApi }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details || "Erro desconhecido ao processar CSV no servidor."
        );
      }

      setUploadMessage({ text: `Importação concluída! ${data.totalInseridoOuAtualizado} produtos foram inseridos/atualizados.`, isError: false, });
      setCsvFile(null);
      fetchProdutos(); // 🎯 Chamar a função real para recarregar do Supabase
    } catch (error) {
      console.error("Erro na Importação:", error);
      setUploadMessage({ text: `Falha na importação: ${error.message}`, isError: true, });
    } finally {
      setIsUploading(false);
    }
  };

  // -------------------------------------------------------------------------
  // LÓGICA DE FILTROS E AJUDAS
  // -------------------------------------------------------------------------

  const produtosFiltrados = produtos.filter((produto) => {
    const matchCategoria =
      filtroCategoria === "todas" || produto.categoria.toString() === filtroCategoria.toString();
    const matchBusca =
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const getCategoriaInfo = (categoriaId) => {
    return (
      categorias.find((c) => c.id.toString() === categoriaId.toString()) || {
        nome: "Sem Categoria",
        cor: "#6c757d",
      }
    );
  };

  const getStatusBadge = (status, estoque, estoqueMinimo) => {
    if (status === "inativo") {
      return <span style={produtoStyles.badgeInativo}>❌ Inativo</span>;
    }

    if (parseInt(estoque) === 0) {
      return <span style={produtoStyles.badgeEsgotado}>🚫 Esgotado</span>;
    }

    if (parseInt(estoque) <= parseInt(estoqueMinimo)) {
      return <span style={produtoStyles.badgeEstoqueBaixo}>⚠️ Estoque Baixo</span>;
    }

    return <span style={produtoStyles.badgeAtivo}>✅ Ativo</span>;
  };

  const calcularComissao = (preco, percentual) => {
    return ((parseFloat(preco) * parseFloat(percentual)) / 100).toFixed(2);
  };

  // 🆕 Componente de Mensagem de Upload
  const UploadMessageComponent = () =>
    uploadMessage.text && (
      <div style={produtoStyles.message(uploadMessage.isError)}>
        {uploadMessage.text}
      </div>
    );

  // -------------------------------------------------------------------------
  // RENDERIZAÇÃO
  // -------------------------------------------------------------------------

  return (
    <div style={produtoStyles.container}>
        {/* Header */}                  
      <div style={produtoStyles.header}>
        <div>
          <h1 style={produtoStyles.title}>📦 Gestão de Produtos</h1>          
          <p style={produtoStyles.subtitle}>
                        Cadastre e gerencie seu catálogo de produtos
          </p>
        </div>
                                
        <div style={produtoStyles.stats}>
            {/* Stats aqui... */}
        </div>
      </div>
            <hr style={produtoStyles.hr} />      
        {/* Opções de Modo / Filtros e Busca */}                  
      <div style={produtoStyles.filters}>
                                
        <div style={produtoStyles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={produtoStyles.searchInput}
          />
        </div>
                               
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={produtoStyles.filterSelect}
        >
          <option value="todas">📂 Todas as categorias</option>                
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}                       
            </option>
          ))}
        </select>
                               
        <button
          style={produtoStyles.addButton}
          onClick={() => {
            setShowForm(true);
            setModoCadastro("manual");
          }}
        >
                              ➕ Novo Produto                
        </button>
               
        <button
          style={{ ...produtoStyles.addButton, backgroundColor: "#17a2b8" }}
          onClick={() => {
            setShowForm(false);
            setModoCadastro("csv");
          }}
        >
                    ⬆️ Importar CSV        
        </button>
               
        <button
          style={{ ...produtoStyles.addButton, backgroundColor: "#6f42c1" }}
          onClick={() => {
            setShowForm(false);
            setModoCadastro("erp");
          }}
        >
                    🔗 Integração ERP/Odoo        
        </button>
      </div>
            <hr style={produtoStyles.hr} />      
        {/* Formulário de Cadastro Manual */} 
      {showForm && modoCadastro === "manual" && (
        <div style={produtoStyles.formContainer}>
          <h2 style={produtoStyles.formTitle}>
            {editingProduto
              ? "✏️ Editar Produto (Manual)"
              : "📦 Novo Produto (Manual)"}
          </h2>
                                       
          <form onSubmit={handleSubmit} style={produtoStyles.form}>
                                               
            <div style={produtoStyles.formGrid}>
                                          {/* Informações Básicas */}           
                             
              <div style={produtoStyles.formSection}>
                                                               
                <h3 style={produtoStyles.sectionTitle}>Informações Básicas</h3>       
                                                       
                <div style={produtoStyles.formGroup}>
                    <label style={produtoStyles.label}>Nome do Produto *</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} style={produtoStyles.input} required />
                </div>
                                                               
                <div style={produtoStyles.formRow}>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Categoria *</label>             
                      <select name="categoria" value={formData.categoria} onChange={handleInputChange} style={produtoStyles.select} required>
                        <option value="">Selecione uma categoria</option> 
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nome}                                           
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>SKU</label>
                      <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} style={produtoStyles.input} placeholder="Código único" />
                    </div>
                </div>
                                                               
                <div style={produtoStyles.formGroup}>
                    <label style={produtoStyles.label}>Descrição</label>
                    <textarea name="descricao" value={formData.descricao} onChange={handleInputChange} style={produtoStyles.textarea} rows="3" placeholder="Descreva o produto..." />
                </div>
              </div>
                                          {/* Preços e Comissão */}             
                           
              <div style={produtoStyles.formSection}>
                                                               
                <h3 style={produtoStyles.sectionTitle}>Preços e Comissão (Split Stripe)</h3>         
                                                     
                <div style={produtoStyles.formRow}>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Preço de Venda (R$) *</label>
                      <input type="number" step="0.01" name="preco" value={formData.preco} onChange={handleInputChange} style={produtoStyles.input} required />
                    </div>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Preço de Custo (R$)</label>
                      <input type="number" step="0.01" name="precoCusto" value={formData.precoCusto} onChange={handleInputChange} style={produtoStyles.input} />
                    </div>
                </div>
                                                               
                <div style={produtoStyles.formRow}>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>
                        Comissão para Consultores (%) *
                        <span style={produtoStyles.helpText}>
                          (Split Stripe para o Consultor)
                        </span>
                      </label>
                      <input type="number" step="0.1" name="comissao" value={formData.comissao} onChange={handleInputChange} style={produtoStyles.input} required />
                      {formData.preco && (
                        <div style={produtoStyles.comissaoPreview}>
                          💰 Comissão Consultor: <strong>R$ {calcularComissao(formData.preco, formData.comissao)}</strong>
                        </div>
                      )}
                    </div>
                    
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>
                        Comissão para Vendedores (%) *
                        <span style={produtoStyles.helpText}>
                          (Pago pelo Lojista, não há split)
                        </span>
                      </label>
                      <input type="number" step="0.1" name="comissaoVendedor" value={formData.comissaoVendedor} onChange={handleInputChange} style={produtoStyles.input} required />
                      {formData.preco && (
                        <div style={{...produtoStyles.comissaoPreview, backgroundColor: '#f3e7ff', border: '1px solid #d8b8ff'}}>
                          💼 Comissão Vendedor: <strong>R$ {calcularComissao(formData.preco, formData.comissaoVendedor)}</strong>
                        </div>
                      )}
                    </div>
                </div>
              </div>
                                          {/* Estoque e Detalhes */}           
              <div style={produtoStyles.formSection}>
                                                               
                <h3 style={produtoStyles.sectionTitle}>Estoque e Detalhes</h3>         
                                                     
                <div style={produtoStyles.formRow}>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Estoque Disponível *</label>
                      <input type="number" name="estoque" value={formData.estoque} onChange={handleInputChange} style={produtoStyles.input} required />
                    </div>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Estoque Mínimo</label>
                      <input type="number" name="estoqueMinimo" value={formData.estoqueMinimo} onChange={handleInputChange} style={produtoStyles.input} />
                    </div>
                </div>
                                                               
                <div style={produtoStyles.formRow}>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Tamanho</label>
                      <input type="text" name="tamanho" value={formData.tamanho} onChange={handleInputChange} style={produtoStyles.input} placeholder="P, M, G, 42, etc." />
                    </div>
                    <div style={produtoStyles.formGroup}>
                      <label style={produtoStyles.label}>Cor</label>
                      <input type="text" name="cor" value={formData.cor} onChange={handleInputChange} style={produtoStyles.input} placeholder="Vermelho, Azul, etc." />
                    </div>
                </div>
                                                               
                <div style={produtoStyles.formGroup}>
                    <label style={produtoStyles.label}>Peso (kg)</label>
                    <input type="number" step="0.01" name="peso" value={formData.peso} onChange={handleInputChange} style={produtoStyles.input} />
                </div>
                                                               
                <div style={produtoStyles.formGroup}>
                    <label style={produtoStyles.label}>Status</label>                   
                    <select name="status" value={formData.status} onChange={handleInputChange} style={produtoStyles.select}>
                      <option value="ativo">✅ Ativo</option>                     
                      <option value="inativo">❌ Inativo</option>                 
                    </select>
                </div>
              </div>
                                          {/* Imagem */}                       
                 
              <div style={produtoStyles.formSection}>
                                                               
                <h3 style={produtoStyles.sectionTitle}>Imagem do Produto</h3>         
                                                     
                <div style={produtoStyles.formGroup}>
                    <label style={produtoStyles.label}>
                      Upload da Imagem <span style={produtoStyles.helpText}>(JPEG, PNG - máx 5MB)</span>
                    </label>
                    <input type="file" name="imagem" onChange={handleInputChange} style={produtoStyles.fileInput} accept=".jpg,.jpeg,.png" />
                </div>
                                                               
                {formData.imagem && (
                  <div style={produtoStyles.imagePreview}>
                    <img src={URL.createObjectURL(formData.imagem)} alt="Preview" style={produtoStyles.previewImage} />
                  </div>
                )}
              </div>
            </div>
                                               
            <div style={produtoStyles.formActions}>
              <button type="button" onClick={handleCancel} style={produtoStyles.cancelButton}>
                Cancelar                        
              </button>
              <button type="submit" style={produtoStyles.submitButton}>
                {editingProduto ? "Atualizar Produto" : "Cadastrar Produto"}   
              </button>
            </div>
          </form>
        </div>
      )}
            {/* Opção de Importação CSV / ERP / Lista... (Restante da lógica mantida) */}
        {/* ... restante do código de modoCsv e modoErp ... */}
        {modoCadastro === "csv" && (
        <div
          style={{
            ...produtoStyles.formContainer,
            border: "2px solid #17a2b8",
            backgroundColor: "#e8f7f9",
          }}
        >
                   
          <h2 style={produtoStyles.formTitle}>⬆️ Importar Produtos por CSV</h2>       
           
          <p style={produtoStyles.subtitle}>
                        Use o seu arquivo **`planilha-produtos-modelo.csv`**
            para             importação.          
          </p>
                   
          <p style={produtoStyles.helpText}>
                        **Recomendação:** Baixe o modelo e preencha as colunas.
            Os dados             serão mapeados para o cadastro manual (nome,
            categoria, preco,             estoque, sku, **comissao**, **comissaoVendedor**, etc.).          
          </p>
                   
          <a
            href="https://vluxffbornrlxcepqmzr.supabase.co/storage/v1/object/public/planilha-produtos-modelo/PlanilhaProdutos.csv"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...produtoStyles.helpText,
              color: "#007bff",
              display: "block",
              marginBottom: "15px",
            }}
          >
                        📥 Baixar Modelo CSV (Link do Supabase Storage)        
             
          </a>
                   
          <form
            onSubmit={handleImportarCsv}
            style={{ ...produtoStyles.form, maxWidth: "100%", padding: 0 }}
          >
            <div style={produtoStyles.formGroup}>
              <label style={produtoStyles.label}>
                Selecionar Arquivo CSV *
                <span style={produtoStyles.helpText}>
                  (O arquivo não deve exceder 5MB)
                </span>
              </label>
              <input
                type="file"
                onChange={handleCsvUpload}
                style={produtoStyles.fileInput}
                accept=".csv"
                required
              />
              {csvFile && (
                <p
                  style={{
                    ...produtoStyles.helpText,
                    margin: "5px 0 0 0",
                    color: "#17a2b8",
                  }}
                >
                  Arquivo selecionado: **{csvFile.name}**
                </p>
              )}
            </div>

            <div style={produtoStyles.formActions}>
              {/* Exibe a mensagem de upload (sucesso ou erro) */}
              {UploadMessageComponent()}
              <button
                type="button"
                onClick={handleCancel}
                style={produtoStyles.cancelButton}
                disabled={isUploading}
              >
                Voltar
              </button>
              <button
                type="submit"
                style={{
                  ...produtoStyles.submitButton,
                  backgroundColor: isUploading ? "#6c757d" : "#17a2b8",
                }}
                disabled={!csvFile || isUploading}
              >
                {isUploading ? "🔄 Processando..." : "Processar e Importar CSV"}
              </button>
            </div>
          </form>
        </div>
      )}
            {/* Opção de Integração ERP/Odoo */}     
      {modoCadastro === "erp" && (
        <div
          style={{
            ...produtoStyles.formContainer,
            border: "2px solid #6f42c1",
            backgroundColor: "#f5f0fb",
          }}
        >
                    <h2 style={produtoStyles.formTitle}>🔗 Integração com Odoo/ERP</h2>
                   
          <p style={produtoStyles.subtitle}>
                        Configure a conexão para sincronizar automaticamente
            seus produtos e             estoque.          
          </p>
                   
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginTop: "20px",
              backgroundColor: "white",
            }}
          >
                    
            <h3 style={produtoStyles.sectionTitle}>
                            Chaves de Sincronização Necessárias            
            </h3>
                    
            <p style={produtoStyles.helpText}>
                            **Os dados buscados do ERP (Odoo, etc.) devem mapear
              para os               campos existentes no cadastro manual:**    
                     
            </p>
                       
            <ul
              style={{
                listStyleType: "disc",
                marginLeft: "20px",
                fontSize: "0.95rem",
                color: "#555",
              }}
            >
                        
              <li>**SKU/Código do Produto (Identificador Único)**</li>         
                 
              <li>
                                **Comissão (Split Stripe)** e **Comissão Vendedor (Pago Lojista)**
              </li>
                        
              <li>**Preço de Venda, Preço de Custo, Estoque Disponível**</li>         
                <li>**URL da Imagem do Produto**</li>           
            </ul>
                    
          </div>
                   
          <div style={produtoStyles.formActions}>
                       
            <button type="button" onClick={handleCancel} style={produtoStyles.cancelButton}>
                Voltar à Lista            
            </button>
                       
            <button type="button" style={{ ...produtoStyles.submitButton, backgroundColor: "#6f42c1" }} disabled>
                Configurar Conexão (Desenvolvimento de API)        
            </button>
          </div>
                 
        </div>
      )}

      {modoCadastro === "lista" && (
        <div style={produtoStyles.listaContainer}>
                                       
          <h2 style={produtoStyles.listaTitle}>
                                    Catálogo de Produtos ({produtosFiltrados.length})                                
          </h2>
                       
          {loading && (
            <p style={produtoStyles.loadingText}>🔄 Carregando produtos...</p>
          )}
          {apiError && <p style={produtoStyles.apiError}>{apiError}</p>}               
                       
          {!loading && produtos.length === 0 ? (
            <div style={produtoStyles.emptyState}>
                {/* ... empty state ... */}
            </div>
          ) : (
            <div style={produtoStyles.produtosGrid}>
              {produtosFiltrados.map((produto) => {
                const categoriaInfo = getCategoriaInfo(produto.categoria);
                const comissaoConsultor = calcularComissao(produto.preco, produto.comissao);
                const comissaoVendedor = calcularComissao(produto.preco, produto.comissaoVendedor || 0);

                return (
                  <div key={produto.id} style={produtoStyles.produtoCard}>
                                                                               
                    <div style={produtoStyles.produtoImage}>
                      <img src={produto.imagemUrl} alt={produto.nome} style={produtoStyles.produtoImg} />
                    </div>
                                                                               
                    <div style={produtoStyles.produtoInfo}>
                      <div style={produtoStyles.produtoHeader}>
                        <h3 style={produtoStyles.produtoNome}>{produto.nome}</h3>     
                        <div style={produtoStyles.produtoBadges}>
                          <span style={{ ...produtoStyles.categoriaBadge, backgroundColor: categoriaInfo.cor + "20", color: categoriaInfo.cor, borderColor: categoriaInfo.cor }}>
                            {categoriaInfo.nome}                           
                          </span>
                          {getStatusBadge(produto.status, produto.estoque, produto.estoqueMinimo)}
                        </div>
                      </div>
                                                                               
                      {produto.descricao && (
                        <p style={produtoStyles.produtoDescricao}>
                          {produto.descricao}                                   
                        </p>
                      )}
                                                                               
                      <div style={produtoStyles.produtoDetalhes}>
                        <div style={produtoStyles.detalheItem}>
                          <strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}
                        </div>
                        <div style={produtoStyles.detalheItem}>
                          <strong>Comissão Consultor:</strong> {produto.comissao}% (R$ {comissaoConsultor})
                        </div>
                        <div style={produtoStyles.detalheItem}>
                          <strong>Comissão Vendedor:</strong> {produto.comissaoVendedor}% (R$ {comissaoVendedor})
                        </div>
                        <div style={produtoStyles.detalheItem}>
                          <strong>Estoque:</strong> {produto.estoque} unidades                            
                        </div>
                      </div>
                      <div style={produtoStyles.produtoActions}>
                        <button onClick={() => handleEdit(produto)} style={produtoStyles.editButton}>
                          ✏️ Editar                                                
                        </button>
                        <button onClick={() => handleDelete(produto.id)} style={produtoStyles.deleteButton}>
                          🗑️ Excluir                                              
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LojistaProducts;