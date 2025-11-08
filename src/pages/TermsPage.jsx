// web-consultor/src/pages/TermsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    navigate("/register");
  };

  // Ícones para cada seção
  const icons = {
    contract: "📝",
    payment: "💰",
    data: "🔒",
    recording: "🎥",
    curriculum: "📊",
    security: "🛡️",
    obligations: "⚖️",
    intellectual: "💡",
    termination: "🚫",
    changes: "🔄",
    jurisdiction: "🏛️",
    relationship: "🤝",
    manual: "📚",
    service: "🎯",
    responsibility: "⚠️",
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            {icons.contract} Termos e Condições de Uso - Compra Smart
          </h1>
          <p style={styles.paragraphIntro}>
            <strong>
              Leia atentamente antes de prosseguir com seu cadastro como
              consultor.
            </strong>
            Este contrato rege sua relação com a plataforma Compra Smart e
            estabelece direitos, obrigações e condições comerciais.
          </p>
        </header>

        {/* 1. ACEITAÇÃO DOS TERMOS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.contract} 1. Aceitação dos Termos
          </h2>
          <p style={styles.paragraph}>
            Ao clicar em "Aceito os Termos", você concorda integralmente com
            todas as condições aqui estabelecidas, nos termos do{" "}
            <strong>artigo 421 do Código Civil Brasileiro</strong> e da{" "}
            <strong>Lei nº 12.965/2014 (Marco Civil da Internet)</strong>.
          </p>
        </section>

        {/* 2. RELACIONAMENTO CONTRATUAL */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.relationship} 2. Relacionamento Contratual e Vínculo
            Trabalhista
          </h2>
          <div style={styles.warningBox}>
            <h3 style={styles.warningTitle}>
              🚫 Ausência de Vínculo Empregatício
            </h3>
            <ul style={styles.list}>
              <li>
                <strong>Consultores cadastrados diretamente:</strong> Não
                possuem vínculo trabalhista com a plataforma ou com as lojas
              </li>
              <li>
                <strong>Vendedores cadastrados por lojistas:</strong> Devem
                possuir vínculo trabalhista próprio com a loja (CLT, contrato,
                etc.)
              </li>
              <li>
                <strong>Desobrigação da plataforma:</strong> A Compra Smart está
                totalmente desobrigada de qualquer reclamação na esfera
                trabalhista
              </li>
            </ul>
          </div>
          <p style={styles.paragraph}>
            Este contrato caracteriza-se como{" "}
            <strong>prestação de serviços autônoma</strong>, nos termos do
            artigo 593 do Código Civil Brasileiro.
          </p>
        </section>

        {/* 3. MODELO DE REMUNERAÇÃO */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.payment} 3. Modelo de Remuneração e Comissões
          </h2>
          <div style={styles.highlightBox}>
            <h3 style={styles.highlightTitle}>💰 Como funciona seu ganho:</h3>
            <ul style={styles.list}>
              <li>
                <strong>Percentual mínimo:</strong> 3% do valor do produto
                (percentual base estabelecido)
              </li>
              <li>
                <strong>Percentual por venda:</strong> Você receberá um
                percentual sobre o valor de cada venda concretizada
              </li>
              <li>
                <strong>Definição pelo lojista:</strong> Cada loja parceira
                define seus próprios percentuais por produto/categoria
              </li>
              <li>
                <strong>Transparência:</strong> Os percentuais serão claramente
                informados antes de cada atendimento
              </li>
              <li>
                <strong>Pagamento:</strong> Repasses realizados mensalmente, até
                o 5º dia útil do mês subsequente
              </li>
            </ul>
          </div>
        </section>

        {/* 4. LIMITAÇÕES DE RESPONSABILIDADE */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.responsibility} 4. Limitações de Responsabilidade da
            Plataforma
          </h2>
          <div style={styles.warningBox}>
            <h3 style={styles.warningTitle}>
              ⚠️ A plataforma NÃO se responsabiliza por:
            </h3>
            <ul style={styles.list}>
              <li>
                <strong>Alterações nos percentuais de comissão</strong>{" "}
                realizadas pelas lojas
              </li>
              <li>
                <strong>Alterações de valores dos produtos</strong> realizadas
                pela loja
              </li>
              <li>
                <strong>Campanhas promocionais</strong> como datas comemorativas
                ou datas comerciais
              </li>
              <li>
                <strong>Disponibilidade de produtos</strong> em estoque das
                lojas
              </li>
              <li>
                <strong>Problemas de entrega</strong> ou logística dos produtos
              </li>
            </ul>
          </div>
          <p style={styles.paragraph}>
            O consultor deve sempre verificar as condições atualizadas
            diretamente com cada loja antes dos atendimentos.
          </p>
        </section>

        {/* 5. MANUAL DE BOAS PRÁTICAS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.manual} 5. Manual de Boas Práticas de Atendimento
          </h2>
          <div style={styles.highlightBox}>
            <h3 style={styles.highlightTitle}>
              📚 Compromisso com a Qualidade:
            </h3>
            <ul style={styles.list}>
              <li>
                <strong>Leitura obrigatória:</strong> Após aprovação, o
                consultor deverá realizar a leitura completa do manual
                disponível em sua home
              </li>
              <li>
                <strong>Atualizações:</strong> O manual poderá ser atualizado
                periodicamente
              </li>
              <li>
                <strong>Conformidade:</strong> O não cumprimento poderá resultar
                em suspensão da plataforma
              </li>
            </ul>
          </div>
        </section>

        {/* 6. PADRÃO DE ATENDIMENTO */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.service} 6. Padrão de Atendimento ao Cliente
          </h2>
          <div style={styles.highlightBox}>
            <h3 style={styles.highlightTitle}>🎯 Compromissos do Consultor:</h3>
            <ul style={styles.list}>
              <li>
                <strong>Atender às necessidades principais</strong> do cliente
                de maneira respeitosa e formal
              </li>
              <li>
                <strong>Não realizar indução de vendas</strong> ou práticas
                comerciais agressivas
              </li>
              <li>
                <strong>Garantir que o cliente faça a melhor escolha</strong>{" "}
                baseada em suas reais necessidades
              </li>
              <li>
                <strong>
                  Fornecer informações claras, precisas e honestas
                </strong>{" "}
                sobre os produtos
              </li>
              <li>
                <strong>Manter postura profissional</strong> em todos os
                atendimentos
              </li>
            </ul>
          </div>
          <p style={styles.paragraph}>
            O consultor atua como <strong>facilitador da melhor escolha</strong>
            , não como vendedor tradicional.
          </p>
        </section>

        {/* 7. PROTEÇÃO DE DADOS PESSOAIS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.data} 7. Proteção de Dados Pessoais - LGPD
          </h2>
          <p style={styles.paragraph}>
            Conforme a{" "}
            <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>
            , seus dados serão utilizados para:
          </p>
          <ul style={styles.list}>
            <li>Verificação de identidade e análise cadastral</li>
            <li>Processamento de pagamentos e repasse de comissões</li>
            <li>Comunicação sobre serviços e atualizações da plataforma</li>
            <li>Melhoria da experiência do usuário</li>
          </ul>
          <p style={styles.paragraph}>
            Você tem direito à <strong>revogação do consentimento</strong> a
            qualquer momento, nos termos do artigo 8º da LGPD.
          </p>
        </section>

        {/* 8. DIREITO DE USO DE IMAGEM E GRAVAÇÕES */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.recording} 8. Direito de Uso de Imagem e Gravações
          </h2>
          <div style={styles.highlightBox}>
            <h3 style={styles.highlightTitle}>🎥 Autorizações concedidas:</h3>
            <ul style={styles.list}>
              <li>
                <strong>Gravação de atendimentos:</strong> Autoriza a gravação
                de vídeo e áudio durante os atendimentos
              </li>
              <li>
                <strong>Finalidade:</strong> Garantir qualidade do serviço,
                treinamento e resolução de conflitos
              </li>
              <li>
                <strong>Uso da imagem:</strong> Autoriza o uso de sua imagem
                para fins promocionais da plataforma
              </li>
              <li>
                <strong>Armazenamento:</strong> Gravações armazenadas por até
                180 dias, conforme necessidade legal
              </li>
            </ul>
          </div>
          <p style={styles.paragraph}>
            Base legal: <strong>Lei nº 9.610/98 (Direito Autoral)</strong> e{" "}
            <strong>Art. 20 do Código Civil</strong> sobre uso de imagem.
          </p>
        </section>

        {/* 9. ANÁLISE DE CURRÍCULO POR IA */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.curriculum} 9. Análise de Currículo por Inteligência
            Artificial
          </h2>
          <p style={styles.paragraph}>
            Você autoriza expressamente a análise automatizada de seu currículo
            por sistemas de IA para:
          </p>
          <ul style={styles.list}>
            <li>Identificação de áreas de atuação e especialidades</li>
            <li>Compatibilização com lojas e segmentos parceiros</li>
            <li>Sugestão de capacitações e melhorias</li>
            <li>Otimização do matching com oportunidades</li>
          </ul>
          <p style={styles.paragraph}>
            <strong>Garantia de veracidade:</strong> Você declara sob as penas
            da lei que todas as informações são verdadeiras.
          </p>
        </section>

        {/* 10. SEGURANÇA E CONTRATO DE CONFIDENCIALIDADE */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.security} 10. Segurança e Confidencialidade
          </h2>
          <div style={styles.warningBox}>
            <h3 style={styles.warningTitle}>🛡️ Obrigações do Consultor:</h3>
            <ul style={styles.list}>
              <li>
                <strong>Sigilo absoluto</strong> sobre informações de clientes e
                lojas
              </li>
              <li>
                <strong>Proibição</strong> de compartilhamento de dados fora da
                plataforma
              </li>
              <li>
                <strong>Não utilização</strong> de informações para fins
                pessoais
              </li>
              <li>
                <strong>Comunicação imediata</strong> em caso de violação de
                segurança
              </li>
            </ul>
          </div>
          <p style={styles.paragraph}>
            O descumprimento resultará em <strong>suspensão imediata</strong> e{" "}
            <strong>medidas legais cabíveis</strong>.
          </p>
        </section>

        {/* 11. OBRIGAÇÕES DO CONSULTOR */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.obligations} 11. Obrigações do Consultor
          </h2>
          <ul style={styles.list}>
            <li>
              Manter conduta ética e profissional em todos os atendimentos
            </li>
            <li>Cumprir prazos e compromissos assumidos com clientes</li>
            <li>Atualizar informações cadastrais quando necessário</li>
            <li>Respeitar a política de cancelamento e reagendamento</li>
            <li>Zelar pela imagem e reputação da plataforma</li>
            <li>Seguir o manual de boas práticas de atendimento</li>
            <li>Não praticar indução de vendas agressiva</li>
          </ul>
        </section>

        {/* 12. PROPRIEDADE INTELECTUAL */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.intellectual} 12. Propriedade Intelectual
          </h2>
          <p style={styles.paragraph}>
            Todo o conteúdo, marcas, software e metodologias da plataforma são
            de propriedade exclusiva da Compra Smart, protegidos pela{" "}
            <strong>Lei nº 9.279/96 (Lei de Propriedade Industrial)</strong> e{" "}
            <strong>Lei nº 9.609/98 (Software)</strong>.
          </p>
        </section>

        {/* 13. RESCISÃO DO CONTRATO */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.termination} 13. Rescisão do Contrato
          </h2>
          <p style={styles.paragraph}>
            O contrato poderá ser rescindido por qualquer das partes, mediante
            aviso prévio de 30 dias, ou imediatamente em caso de descumprimento
            grave das obrigações aqui estabelecidas.
          </p>
        </section>

        {/* 14. ALTERAÇÕES DOS TERMOS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.changes} 14. Alterações dos Termos
          </h2>
          <p style={styles.paragraph}>
            A Compra Smart poderá alterar estes termos a qualquer momento,
            mediante comunicação com 30 dias de antecedência. O uso continuado
            da plataforma após as alterações constitui aceitação dos novos
            termos.
          </p>
        </section>

        {/* 15. FORO E LEGISLAÇÃO APLICÁVEL */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {icons.jurisdiction} 15. Foro e Legislação Aplicável
          </h2>
          <p style={styles.paragraph}>
            Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer
            questões decorrentes deste contrato, renunciando expressamente a
            qualquer outro, por mais privilegiado que seja.
          </p>
        </section>

        {/* RODAPÉ COM ACEITAÇÃO */}
        <footer style={styles.footer}>
          <div style={styles.acceptanceBox}>
            <h3 style={styles.acceptanceTitle}>✅ Confirmação de Aceitação</h3>
            <p style={styles.acceptanceText}>
              Ao clicar em "Aceito os Termos", você declara ter lido,
              compreendido e concordado com todas as condições acima, incluindo
              especialmente a <strong>ausência de vínculo trabalhista</strong>,
              o <strong>percentual mínimo de 3%</strong>, a{" "}
              <strong>leitura obrigatória do manual de boas práticas</strong> e
              as <strong>limitações de responsabilidade da plataforma</strong>.
            </p>
          </div>

          <div style={styles.buttonsContainer}>
            <button onClick={() => navigate(-1)} style={styles.backButton}>
              ⬅️ Voltar
            </button>
            <button onClick={handleAccept} style={styles.acceptButton}>
              ✅ Aceito os Termos e Quero Continuar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    lineHeight: "1.6",
  },
  content: {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "900px",
    margin: "30px 0",
  },
  header: {
    borderBottom: "2px solid #364fab",
    paddingBottom: "20px",
    marginBottom: "30px",
  },
  title: {
    color: "#364fab",
    fontSize: "28px",
    marginBottom: "15px",
    textAlign: "center",
  },
  paragraphIntro: {
    lineHeight: "1.6",
    color: "#333",
    fontSize: "16px",
    textAlign: "center",
    borderLeft: "none",
    paddingLeft: "0",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #e9ecef",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
  },
  sectionTitle: {
    color: "#1b3670",
    marginTop: "0",
    marginBottom: "15px",
    fontWeight: "bold",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  paragraph: {
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
    fontSize: "14px",
  },
  list: {
    color: "#555",
    marginBottom: "15px",
    paddingLeft: "20px",
  },
  highlightBox: {
    backgroundColor: "#e7f3ff",
    padding: "15px",
    borderRadius: "8px",
    margin: "15px 0",
    borderLeft: "4px solid #364fab",
  },
  highlightTitle: {
    color: "#1b3670",
    marginTop: "0",
    marginBottom: "10px",
  },
  warningBox: {
    backgroundColor: "#fff3cd",
    padding: "15px",
    borderRadius: "8px",
    margin: "15px 0",
    borderLeft: "4px solid #ffc107",
  },
  warningTitle: {
    color: "#856404",
    marginTop: "0",
    marginBottom: "10px",
  },
  acceptanceBox: {
    backgroundColor: "#d4edda",
    padding: "20px",
    borderRadius: "8px",
    margin: "30px 0",
    border: "1px solid #c3e6cb",
  },
  acceptanceTitle: {
    color: "#155724",
    marginTop: "0",
    marginBottom: "10px",
  },
  acceptanceText: {
    color: "#155724",
    margin: "0",
    fontSize: "14px",
  },
  footer: {
    borderTop: "2px solid #364fab",
    paddingTop: "30px",
    marginTop: "30px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: "15px 25px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  acceptButton: {
    padding: "15px 25px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

export default TermsPage;
