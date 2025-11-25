import React, { useState } from 'react';

const mockStyles = {
    pageContainer: "min-h-screen bg-gray-50 p-4 sm:p-8 font-sans",
    title: "text-3xl font-extrabold text-[#2c5aa0] border-b pb-2 mb-4",
    subtitle: "text-lg text-gray-600 mb-8",
    sectionCard: "bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8",
    cardTitle: "text-xl font-bold text-[#2c5aa0] mb-4 border-b pb-2",
    input: "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150",
    buttonPrimary: "px-4 py-2 bg-[#2c5aa0] text-white font-semibold rounded-lg shadow-md hover:bg-[#1a407a] transition duration-150",
    buttonDanger: "px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150",
    buttonSuccess: "px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150",
    tableHeader: "bg-gray-50",
    tableTh: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    badgeSuccess: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-700",
    badgeWarning: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-700",
    badgePrimary: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-700",
    badgeDanger: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-700",
    modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
    modalContent: "bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4",
    notificationForm: "space-y-4",
    formGroup: "mb-4",
    label: "block text-sm font-medium text-gray-700 mb-2",
    textarea: "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none",
    checkboxGroup: "flex items-center space-x-4 mb-4",
    checkboxLabel: "flex items-center space-x-2",
};

// Serviço de notificações (simulado)
const notificationService = {
    enviarNotificacao: async (destinatarios, titulo, mensagem, tipo) => {
        // Simulação de envio de notificação
        console.log('📧 Enviando notificação:', {
            destinatarios,
            titulo,
            mensagem,
            tipo,
            timestamp: new Date().toISOString()
        });
        
        // Aqui você integraria com seu backend real
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
    }
};

const initialUsers = [
    { id: 1, nome: 'Ana Paula Matos', email: 'ana.matos@lojista.com', perfil: 'Admin Lojista', filial: 'Matriz', status: 'ativo', tipo: 'lojista' },
    { id: 2, nome: 'João Silva', email: 'joao.silva@lojista.com', perfil: 'Vendedor', filial: 'Loja Centro - SP', status: 'ativo', tipo: 'lojista' },
    { id: 3, nome: 'Carla Dias', email: 'carla.dias@lojista.com', perfil: 'Vendedor', filial: 'Filial Online', status: 'ativo', tipo: 'lojista' },
    { id: 4, nome: 'Pedro Costa', email: 'pedro.costa@lojista.com', perfil: 'Admin Lojista', filial: 'Matriz', status: 'inativo', tipo: 'lojista' },
];

const initialConsultores = [
    { id: 101, nome: 'Marcus Vinícius (Consultor Externo)', email: 'marcus.v@consultor.com', status: 'pendente', tipo: 'consultor' },
    { id: 102, nome: 'Juliana Lima (Consultora Externa)', email: 'juliana.l@consultor.com', status: 'aprovado', tipo: 'consultor' },
];

const LojistaUsuarios = () => {
    const [usuarios, setUsuarios] = useState(initialUsers);
    const [consultores, setConsultores] = useState(initialConsultores);
    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novoPerfil, setNovoPerfil] = useState('Vendedor');
    const [novaFilial, setNovaFilial] = useState('Loja Centro - SP');
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationData, setNotificationData] = useState({
        titulo: '',
        mensagem: '',
        enviarParaLojistas: true,
        enviarParaConsultores: false
    });
    const [loading, setLoading] = useState(false);

    const filiaisMock = ['Matriz', 'Loja Centro - SP', 'Filial Online', 'Quiosque Shopping'];

    const handleAddUser = () => {
        if (novoNome && novoEmail) {
            const newUser = {
                id: Date.now(),
                nome: novoNome,
                email: novoEmail,
                perfil: novoPerfil,
                filial: novoPerfil === 'Vendedor' ? novaFilial : 'Matriz',
                status: 'ativo',
                tipo: 'lojista'
            };
            setUsuarios([...usuarios, newUser]);
            setNovoNome('');
            setNovoEmail('');
        }
    };

    const handleToggleStatus = (id) => {
        setUsuarios(usuarios.map(u =>
            u.id === id ? { ...u, status: u.status === 'ativo' ? 'inativo' : 'ativo' } : u
        ));
    };

    const handleAprovarConsultor = async (id) => {
        const consultor = consultores.find(c => c.id === id);
        setConsultores(consultores.map(c => 
            c.id === id ? { ...c, status: 'aprovado' } : c
        ));

        // Notificação de aprovação para o consultor
        await notificationService.enviarNotificacao(
            [consultor.email],
            'Parceria Aprovada! 🎉',
            `Olá ${consultor.nome}, sua solicitação de parceria foi aprovada! Agora você pode começar a vender nossos produtos.`,
            'parceria_aprovada'
        );
    };

    const handleRecusarConsultor = async (id) => {
        const consultor = consultores.find(c => c.id === id);
        setConsultores(consultores.map(c => 
            c.id === id ? { ...c, status: 'recusado' } : c
        ));

        // Notificação de recusa para o consultor
        await notificationService.enviarNotificacao(
            [consultor.email],
            'Status da Sua Solicitação de Parceria',
            `Olá ${consultor.nome}, agradecemos seu interesse, mas no momento não poderemos seguir com sua solicitação de parceria.`,
            'parceria_recusada'
        );
    };

    const handleEnviarNotificacao = async () => {
        if (!notificationData.titulo || !notificationData.mensagem) {
            alert('Por favor, preencha título e mensagem');
            return;
        }

        if (!notificationData.enviarParaLojistas && !notificationData.enviarParaConsultores) {
            alert('Selecione pelo menos um grupo para enviar a notificação');
            return;
        }

        setLoading(true);

        try {
            let destinatarios = [];

            if (notificationData.enviarParaLojistas) {
                destinatarios = [...destinatarios, ...usuarios.filter(u => u.status === 'ativo').map(u => u.email)];
            }

            if (notificationData.enviarParaConsultores) {
                destinatarios = [...destinatarios, ...consultores.filter(c => c.status === 'aprovado').map(c => c.email)];
            }

            if (destinatarios.length === 0) {
                alert('Nenhum destinatário encontrado para os grupos selecionados');
                return;
            }

            await notificationService.enviarNotificacao(
                destinatarios,
                notificationData.titulo,
                notificationData.mensagem,
                'comunicado_geral'
            );

            alert(`✅ Notificação enviada para ${destinatarios.length} destinatários!`);
            setShowNotificationModal(false);
            setNotificationData({
                titulo: '',
                mensagem: '',
                enviarParaLojistas: true,
                enviarParaConsultores: false
            });
        } catch (error) {
            alert('❌ Erro ao enviar notificação');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'ativo': return <span className={mockStyles.badgeSuccess}>Ativo</span>;
            case 'inativo': return <span className={mockStyles.badgeDanger}>Inativo</span>;
            case 'pendente': return <span className={mockStyles.badgeWarning}>Aguardando</span>;
            case 'aprovado': return <span className={mockStyles.badgeSuccess}>Aprovado</span>;
            case 'recusado': return <span className={mockStyles.badgeDanger}>Recusado</span>;
            default: return <span className={mockStyles.badgePrimary}>{status}</span>;
        }
    };

    const usuariosAtivos = usuarios.filter(u => u.status === 'ativo').length;
    const consultoresPendentes = consultores.filter(c => c.status === 'pendente').length;

    return (
        <div className={mockStyles.pageContainer}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className={mockStyles.title}>👥 Gestão de Usuários e Acessos</h1>
                    <p className={mockStyles.subtitle}>Controle quem pode acessar o painel e quais permissões cada usuário possui.</p>
                </div>
                <button 
                    onClick={() => setShowNotificationModal(true)}
                    className={mockStyles.buttonPrimary}
                >
                    📢 Enviar Notificação
                </button>
            </div>

            {/* Cadastro de Novo Usuário Interno */}
            <section className={mockStyles.sectionCard}>
                <h2 className={mockStyles.cardTitle}>➕ Adicionar Usuário Interno (Lojista/Vendedor)</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input 
                            type="text" 
                            value={novoNome} 
                            onChange={(e) => setNovoNome(e.target.value)} 
                            placeholder="Nome completo" 
                            className={mockStyles.input} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            value={novoEmail} 
                            onChange={(e) => setNovoEmail(e.target.value)} 
                            placeholder="email@lojista.com" 
                            className={mockStyles.input} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
                        <select 
                            value={novoPerfil} 
                            onChange={(e) => setNovoPerfil(e.target.value)} 
                            className={mockStyles.input}
                        >
                            <option value="Admin Lojista">Admin Lojista</option>
                            <option value="Vendedor">Vendedor</option>
                        </select>
                    </div>
                    {novoPerfil === 'Vendedor' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filial/Unidade</label>
                            <select 
                                value={novaFilial} 
                                onChange={(e) => setNovaFilial(e.target.value)} 
                                className={mockStyles.input}
                            >
                                {filiaisMock.map(filial => (
                                    <option key={filial} value={filial}>{filial}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button 
                        onClick={handleAddUser} 
                        className={mockStyles.buttonPrimary}
                        disabled={!novoNome || !novoEmail}
                    >
                        Salvar Usuário
                    </button>
                </div>
            </section>

            {/* Tabela de Usuários Internos */}
            <section className={mockStyles.sectionCard}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={mockStyles.cardTitle}>👥 Equipe Interna ({usuarios.length})</h2>
                    <div className="text-sm text-gray-600">
                        <span className={mockStyles.badgeSuccess}>{usuariosAtivos} ativos</span>
                        <span className="mx-2">•</span>
                        <span className={mockStyles.badgeDanger}>{usuarios.length - usuariosAtivos} inativos</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className={mockStyles.tableHeader}>
                            <tr>
                                <th className={mockStyles.tableTh}>Nome</th>
                                <th className={mockStyles.tableTh}>Email</th>
                                <th className={mockStyles.tableTh}>Perfil</th>
                                <th className={mockStyles.tableTh}>Filial</th>
                                <th className={mockStyles.tableTh}>Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {usuarios.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{user.perfil}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.filial}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{renderStatusBadge(user.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                        <button 
                                            onClick={() => handleToggleStatus(user.id)}
                                            className={`py-1 px-3 text-xs rounded-lg font-semibold transition-colors ${
                                                user.status === 'ativo' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                            } text-white`}
                                        >
                                            {user.status === 'ativo' ? 'Desativar' : 'Ativar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Aprovação de Consultores */}
            <section className={mockStyles.sectionCard}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={mockStyles.cardTitle}>🔍 Solicitações de Consultores Externos ({consultores.length})</h2>
                    <div className="text-sm text-gray-600">
                        <span className={mockStyles.badgeWarning}>{consultoresPendentes} pendentes</span>
                        <span className="mx-2">•</span>
                        <span className={mockStyles.badgeSuccess}>{consultores.filter(c => c.status === 'aprovado').length} aprovados</span>
                    </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm">Aprove ou recuse os consultores da plataforma que desejam vender seus produtos em parceria.</p>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className={mockStyles.tableHeader}>
                            <tr>
                                <th className={mockStyles.tableTh}>Nome do Consultor</th>
                                <th className={mockStyles.tableTh}>Email</th>
                                <th className={mockStyles.tableTh}>Status da Parceria</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {consultores.map(consultor => (
                                <tr key={consultor.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{consultor.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consultor.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{renderStatusBadge(consultor.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                        {consultor.status === 'pendente' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleAprovarConsultor(consultor.id)}
                                                    className="py-1 px-3 text-xs rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                                                >
                                                    Aprovar
                                                </button>
                                                <button 
                                                    onClick={() => handleRecusarConsultor(consultor.id)}
                                                    className="py-1 px-3 text-xs rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                >
                                                    Recusar
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-500 text-xs">
                                                Parceria {consultor.status === 'aprovado' ? 'Ativa' : 'Recusada'}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modal de Notificação */}
            {showNotificationModal && (
                <div className={mockStyles.modalOverlay}>
                    <div className={mockStyles.modalContent}>
                        <h3 className="text-xl font-bold text-[#2c5aa0] mb-4">📢 Enviar Notificação</h3>
                        
                        <div className={mockStyles.notificationForm}>
                            <div className={mockStyles.formGroup}>
                                <label className={mockStyles.label}>Título da Notificação</label>
                                <input
                                    type="text"
                                    value={notificationData.titulo}
                                    onChange={(e) => setNotificationData({...notificationData, titulo: e.target.value})}
                                    placeholder="Digite o título..."
                                    className={mockStyles.input}
                                />
                            </div>

                            <div className={mockStyles.formGroup}>
                                <label className={mockStyles.label}>Mensagem</label>
                                <textarea
                                    value={notificationData.mensagem}
                                    onChange={(e) => setNotificationData({...notificationData, mensagem: e.target.value})}
                                    placeholder="Digite a mensagem..."
                                    rows="4"
                                    className={mockStyles.textarea}
                                />
                            </div>

                            <div className={mockStyles.checkboxGroup}>
                                <label className={mockStyles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={notificationData.enviarParaLojistas}
                                        onChange={(e) => setNotificationData({...notificationData, enviarParaLojistas: e.target.checked})}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Enviar para Lojistas ({usuarios.filter(u => u.status === 'ativo').length} ativos)</span>
                                </label>

                                <label className={mockStyles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={notificationData.enviarParaConsultores}
                                        onChange={(e) => setNotificationData({...notificationData, enviarParaConsultores: e.target.checked})}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Enviar para Consultores ({consultores.filter(c => c.status === 'aprovado').length} aprovados)</span>
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowNotificationModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleEnviarNotificacao}
                                    disabled={loading}
                                    className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-150 ${
                                        loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {loading ? 'Enviando...' : '📤 Enviar Notificação'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LojistaUsuarios;