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
    description: 'Conversor online de documentos e imagens, com suporte a múltiplos formatos e processamento de até 10 arquivos por vez.',
    code: '#',
    demo: 'https://conversor.pedrojusto.com.br',
    image: '/conversor.png',
    tags: ['React', 'CSS']
  },
  {
    title: 'Gestão de Clínica',
    description: 'Sistema de gestão clínica com agenda médica, cadastro de pacientes e módulo financeiro integrado.',
    code: 'https://github.com/Pedroxbr16/clinica-node',
    demo: 'https://clinica.pedrojusto.com.br',
    image: '/clinica.png',
    tags: ['React', 'CSS', 'Bootstrap', 'Node.js', 'MySQL']
  },
  {
    title: 'Documentação',
    description: 'Documentação criada com Docusaurus para organizar conteúdos técnicos.',
    code: 'https://github.com/Pedroxbr16/documentacao-geral',
    demo: 'https://documentacao.pedrojusto.com.br',
    image: '/documentacao.png',
    tags: ['Docusaurus', 'Markdown']
  },
  {
    title: 'Montador de Escalas',
    description: 'Sistema web self-service para montar escalas de forma rápida e inteligente, facilitando a gestão da equipe.',
    code:'https://github.com/Pedroxbr16/MakeSchedule',
    demo: 'https://escala.pedrojusto.com.br',
    image: '/montaEscala.png',
    tags: ['Next.js', 'CSS']
  },
];

const tagCategoryMap = {
  React: 'frontend',
  CSS: 'frontend',
  Bootstrap: 'frontend',
  Docusaurus: 'docs',
  Markdown: 'docs',
  'Next.js': 'frontend',
  'Node.js': 'backend',
  EJS: 'backend',
  Python: 'backend',
  MySQL: 'database',
  MongoDB: 'database',
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

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 100;

      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="container">
      <Navbar projectCount={projectCount} />

      {/* HOME */}
      <section id="home" className="intro">
        <div className="intro-content">
          <div className="intro-text reveal">
            <h1>Pedro Justo</h1>
            <p className="subtitle">Desenvolvedor FullStack</p>

            <p className="description">
              Sou desenvolvedor Full Stack com foco em Node.js, EJS e React, criando aplicações web de ponta a ponta com interfaces dinâmicas, regras de negócio bem definidas e integrações com bancos de dados como MySQL e MongoDB. Atuo desde a modelagem e estruturação de rotas até a entrega da interface, sempre priorizando organização de código, manutenção e performance.
            </p>

            <p className="description">
              Nos projetos que desenvolvi, construí soluções como sistemas de gestão, monitoramento e ferramentas web orientadas a problemas reais. Meu objetivo é entregar produtos simples de usar, escaláveis e confiáveis, com atenção à experiência do usuário, qualidade técnica e evolução contínua do sistema.
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
            {/* Ícones flutuantes */}
            <div className="floating-icon icon-react">
              <FontAwesomeIcon icon={faReact} />
            </div>
            <div className="floating-icon icon-node">
              <FontAwesomeIcon icon={faNodeJs} />
            </div>
            <div className="floating-icon icon-php">
              <FontAwesomeIcon icon={faPhp} />
            </div>
            <div className="floating-icon icon-js">
              <FontAwesomeIcon icon={faJs} />
            </div>
            <div className="floating-icon icon-html">
              <FontAwesomeIcon icon={faHtml5} />
            </div>
            <div className="floating-icon icon-python">
              <FontAwesomeIcon icon={faPython} />
            </div>

            <img
              src="/user.png"
              alt="Pedro Justo"
              className="profile-img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section id="tecnologias" className="tech-section reveal">
        <h2 className="tech-title">Tecnologias que mais utilizo</h2>

        <div className="marquee-wrapper">
          <div className="marquee-track track-left">
            {[...techIcons.slice(0, 6), ...techIcons.slice(0, 6), ...techIcons.slice(0, 6), ...techIcons.slice(0, 6)].map((tech, index) => (
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
            {[...techIcons.slice(6), ...techIcons.slice(6), ...techIcons.slice(6), ...techIcons.slice(6)].map((tech, index) => (
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
