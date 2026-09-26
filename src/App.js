import React, { Suspense, lazy, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faCss3Alt, faJs, faReact,
  faNodeJs, faPhp, faPython,
  faGithub, faLinkedin, faInstagram,
  faDocker, faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import './App.css';
import Navbar from './component/Navbar';
import LazySection from './component/LazySection';
import ProjectCard from './component/ProjectCard';
import { smoothScrollTo } from './utils/scroll';

const ContatoForm = lazy(() => import('./component/ContatoForm'));

const techIcons = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3Alt, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faReact, label: 'React' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPhp, label: 'PHP' },
  { icon: faPython, label: 'Python' },
  { icon: faDocker, label: 'Docker' },
  { icon: faGitAlt, label: 'Git' },
  { icon: '/ejs.svg', label: 'EJS', isImage: true },
  { icon: '/sql.svg', label: 'SQL', isImage: true },
  { icon: '/mongo.svg', label: 'MongoDB', isImage: true },
];

const projects = [
  {
    title: 'Vira — Conversor de Arquivos',
    description: 'Conversor web para PDFs, documentos, planilhas, apresentações, imagens e vídeos. Processa até 10 arquivos por lote e reúne múltiplos resultados em um arquivo ZIP.',
    code: '#',
    demo: 'https://conversor.pedrojusto.com.br',
    image: '/conversor.webp',
    role: 'Desenvolvimento full stack do produto',
    details: 'O Vira reúne em uma única interface conversões que normalmente exigem ferramentas diferentes. O usuário seleciona documentos, imagens ou vídeos, define o formato de saída e acompanha o processamento; quando há vários resultados, a aplicação prepara um único arquivo ZIP para download.',
    highlights: [
      'Conversão de PDFs, arquivos Office, imagens e vídeos em dezenas de formatos',
      'Processamento em lote de até 10 arquivos, com download agrupado em ZIP',
      'Pipeline de conversão com LibreOffice, ImageMagick, Poppler e FFmpeg',
      'Aplicação instalável como PWA e limpeza automática dos arquivos temporários'
    ],
    tags: ['React', 'Express', 'Vite', 'FFmpeg', 'LibreOffice', 'Docker']
  },
  {
    title: 'Gestão de Clínica',
    description: 'Plataforma para a operação de clínicas, com pacientes, profissionais, agenda, histórico clínico, exames, receitas, pagamentos e indicadores financeiros.',
    code: 'https://github.com/Pedroxbr16/clinica-node',
    demo: 'https://clinica.pedrojusto.com.br',
    image: '/clinica.webp',
    role: 'Desenvolvimento full stack da plataforma',
    details: 'A solução integra aplicação web, API e aplicativo móvel. Administradores, médicos e atendentes acessam fluxos específicos para organizar pacientes, consultas, prontuários e rotinas financeiras, enquanto o aplicativo amplia o acesso a cadastro e pré-agendamento.',
    highlights: [
      'Agenda clínica com tipos de consulta, cadastro e pré-agendamento',
      'Histórico do paciente, pedidos de exames, receitas, atestados e guias',
      'Gestão de pacientes, médicos, atendentes e permissões por perfil',
      'Pagamentos e dashboard com receita e volume de consultas'
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Docker']
  },
  {
    title: 'Montador de Escalas',
    description: 'Gerador de escalas com pessoas e funções em uma tabela personalizada, prévia instantânea e exportação do resultado em PNG.',
    code:'https://github.com/Pedroxbr16/MakeSchedule',
    demo: 'https://escala.pedrojusto.com.br',
    image: '/montaEscala.webp',
    role: 'Desenvolvimento front-end do produto',
    details: 'O Montador de Escalas transforma o preenchimento de uma escala em um fluxo visual simples. Enquanto título, data, observações, nomes e funções são editados, o documento final é atualizado em tempo real; ao concluir, a aplicação gera uma imagem em alta resolução pronta para compartilhamento.',
    highlights: [
      'Linhas dinâmicas para adicionar ou remover pessoas e respectivas funções',
      'Prévia instantânea de título, data, observações e tabela',
      'Contagem das pessoas preenchidas e validação dos campos',
      'Exportação em PNG de alta resolução gerada com Canvas'
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'CSS']
  },
  {
    title: 'SISGED — Gestão de Documentos',
    description: 'Desenvolvi a versão 2.0 do SISGED, plataforma que centraliza o envio, a organização, a indexação, a publicação e a consulta de documentos da CGE/RJ. A solução reúne busca avançada, gestão por áreas, relatórios e trilhas de auditoria.',
    acronym: 'SISGED',
    institutional: true,
    previewType: 'documents',
    role: 'Desenvolvimento da versão 2.0',
    details: 'O SISGED organiza todo o ciclo de documentos institucionais em um único ambiente. A plataforma permite cadastrar arquivos e links, extrair conteúdo para pesquisa, controlar o acesso por área, importar documentos do Nextcloud e acompanhar indicadores e registros de auditoria.',
    highlights: [
      'Nova experiência de envio, organização, publicação e consulta',
      'Busca por metadados e indexação do conteúdo dos documentos',
      'Relatórios gerenciais e notificação automática de novos uploads'
    ],
    tags: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Docker']
  },
  {
    title: 'SISCONFI — Contratos e Finanças',
    description: 'Desenvolvi do zero o SISCONFI, plataforma que centraliza contratos e aditivos, pagamentos, fornecedores, unidades gestoras e publicações oficiais da CGE/RJ. Dashboards e alertas apoiam o acompanhamento de vigências, saldos e execução contratual.',
    acronym: 'SISCONFI',
    institutional: true,
    previewType: 'finance',
    role: 'Desenvolvimento do zero',
    details: 'O SISCONFI reúne dados contratuais e financeiros antes distribuídos entre diferentes fontes. Em uma única visão, as equipes consultam contratos, aditivos, pagamentos, documentos financeiros, fornecedores, publicações oficiais, comissões de fiscalização e possíveis restrições cadastrais.',
    highlights: [
      'Consulta consolidada de contratos, aditivos, vigências, valores e saldos',
      'Acompanhamento de pagamentos e documentos de execução financeira',
      'Dashboards, notificações e integrações com bases institucionais'
    ],
    tags: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Docker']
  },
  {
    title: 'SISP — Gestão Patrimonial',
    description: 'Desenvolvi do zero o SISP, plataforma que acompanha o ciclo completo dos bens da CGE/RJ: cadastro, localização, depreciação, reavaliação, transferência e baixa. O sistema também controla empréstimos de notebooks e gera termos com assinatura digital.',
    acronym: 'SISP',
    institutional: true,
    previewType: 'assets',
    role: 'Desenvolvimento do zero',
    details: 'O SISP centraliza a gestão patrimonial por subunidade e oferece uma visão operacional e gerencial dos bens. Além dos fluxos patrimoniais, a plataforma automatiza empréstimos e devoluções de equipamentos, documentos comprobatórios, assinaturas e notificações em tempo real.',
    highlights: [
      'Cadastro, depreciação, reavaliação, localização e baixa de bens',
      'Transferências entre subunidades com documentos e assinaturas',
      'Empréstimos de notebooks com termos digitais e validação de autenticidade'
    ],
    tags: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Docker']
  },
  {
    title: 'CGE Eventos — Gestão de Eventos',
    description: 'Atuei na evolução da plataforma que organiza a jornada dos eventos institucionais, reunindo solicitações, calendário, atividades, inscrições, check-in, comunicação e certificados. Minha participação envolveu novos fluxos e correções de bugs.',
    acronym: 'CGE EVENTOS',
    institutional: true,
    previewType: 'events',
    role: 'Evolução de fluxos e correção de bugs',
    details: 'O CGE Eventos apoia todo o processo de uma atividade institucional: solicitação e organização, divulgação, gestão de palestrantes e participantes, inscrições, controle de presença, relatórios e emissão de certificados. Atuei na manutenção evolutiva em colaboração com a equipe responsável.',
    highlights: [
      'Implementação de novos fluxos para criação e gestão de eventos',
      'Correções de bugs e ajustes de estabilidade',
      'Melhorias na comunicação por e-mail e nas informações aos participantes'
    ],
    tags: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Docker']
  },
];

const tagCategoryMap = {
  React: 'frontend',
  CSS: 'frontend',
  Bootstrap: 'frontend',
  'Next.js': 'frontend',
  TypeScript: 'frontend',
  Vite: 'frontend',
  'Node.js': 'backend',
  Express: 'backend',
  EJS: 'backend',
  Python: 'backend',
  MySQL: 'database',
  MongoDB: 'database',
  Docker: 'tooling',
  FFmpeg: 'tooling',
  LibreOffice: 'tooling',
  Streamlit: 'tooling',
  Pytube: 'tooling',
};

function getTagCategory(tag) {
  return tagCategoryMap[tag] || 'default';
}

export default function Portfolio() {
  const projectCount = projects.length;

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((reveal) => reveal.classList.add('active'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px', threshold: 0.01 }
    );

    reveals.forEach((reveal) => observer.observe(reveal));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <Navbar projectCount={projectCount} />

      {/* HOME */}
      <section id="home" className="intro">
        <div className="intro-content">
          <div className="intro-text reveal">
            <h1>Pedro Justo</h1>
            <p className="subtitle">Coordenador de Sistemas e Inovação | Desenvolvedor Full Stack</p>

            <p className="description">
              Sou estudante de Análise e Desenvolvimento de Sistemas e atuo como Coordenador de Sistemas e Inovação na Controladoria-Geral do Estado do Rio de Janeiro. Coordeno a equipe de desenvolvimento, gerencio projetos e conecto as necessidades das áreas de negócio às soluções técnicas.
            </p>

            <p className="description">
              Como desenvolvedor Full Stack, trabalho com Node.js, EJS, React, MySQL e MongoDB na criação de sistemas de gestão, monitoramento e ferramentas web. Tenho perfil proativo, foco em resultados e busco aprimoramento contínuo por meio de projetos práticos e cursos especializados, priorizando código organizado, performance e experiência do usuário.
            </p>

            <div className="hero-buttons">
              <a href="#projetos" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('projetos');
              }}>
                Ver Projetos <FiArrowRight />
              </a>
              <a href="#contato" className="btn-outline" onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('contato');
              }}>
                Fale Comigo <FiMail />
              </a>
            </div>
          </div>

          <div className="profile-img-container reveal">
            <div className="profile-photo-frame">
              <img
                src="/hero-pedro-close.webp"
                alt="Retrato profissional de Pedro Justo"
                className="profile-img"
                width="1254"
                height="1254"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section id="tecnologias" className="tech-section reveal">
        <h2 className="tech-title">Tecnologias que mais utilizo</h2>

        <div className="marquee-wrapper">
          <div className="marquee-track track-left">
            {[...techIcons.slice(0, 6), ...techIcons.slice(0, 6)].map((tech, index) => (
              <div key={index} className="tech-icon">
                {tech.isImage ? (
                  <img
                    src={tech.icon}
                    alt={tech.label}
                    className="tech-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <FontAwesomeIcon icon={tech.icon} size="3x" />
                )}
                <p>{tech.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track track-right">
            {[...techIcons.slice(6), ...techIcons.slice(6)].map((tech, index) => (
              <div key={index} className="tech-icon">
                {tech.isImage ? (
                  <img
                    src={tech.icon}
                    alt={tech.label}
                    className="tech-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <FontAwesomeIcon icon={tech.icon} size="3x" />
                )}
                <p>{tech.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="projects reveal">
        <h2>Meus Projetos ({projectCount})</h2>
        <p>Um pouco de alguns projetos pessoais e trabalhos que participei</p>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              getTagCategory={getTagCategory}
              transitionDelay={`${idx * 0.1}s`}
            />
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <LazySection
        className="contact-lazy-wrapper reveal"
        fallback={
          <section id="contato" className="contact contact--loading">
            <h2>Entre em contato</h2>
            <p style={{ textAlign: 'center', color: '#9CA3AF' }}>Carregando formulário...</p>
          </section>
        }
      >
        <Suspense
          fallback={
            <section id="contato" className="contact contact--loading">
              <h2>Entre em contato</h2>
              <p style={{ textAlign: 'center', color: '#9CA3AF' }}>Carregando formulário...</p>
            </section>
          }
        >
          <ContatoForm />
        </Suspense>
      </LazySection>

      {/* FOOTER */}
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://github.com/Pedroxbr16"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="github" />
          </a>

          <a
            href="https://www.linkedin.com/in/pedro-justo-463520298/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
          </a>

          <a
            href="https://www.instagram.com/pedrojusto_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px' }}>© {new Date().getFullYear()} Pedro Justo. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
