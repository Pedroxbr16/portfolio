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
    description: 'Conversor online de PDFs, documentos, planilhas, apresentações, imagens e vídeos, com suporte a múltiplos formatos.',
    code: '#',
    demo: 'https://conversor.pedrojusto.com.br',
    image: '/conversor.webp',
    tags: ['React', 'Docker', 'FFmpeg', 'LibreOffice']
  },
  {
    title: 'Gestão de Clínica',
    description: 'Sistema de gestão clínica com agenda médica, cadastro de pacientes e módulo financeiro integrado.',
    code: 'https://github.com/Pedroxbr16/clinica-node',
    demo: 'https://clinica.pedrojusto.com.br',
    image: '/clinica.webp',
    tags: ['React', 'CSS', 'Bootstrap', 'Node.js', 'MySQL']
  },
  {
    title: 'Documentação',
    description: 'Documentação criada com Docusaurus para organizar conteúdos técnicos.',
    code: 'https://github.com/Pedroxbr16/documentacao-geral',
    demo: 'https://documentacao.pedrojusto.com.br',
    image: '/documentacao.webp',
    tags: ['Docusaurus', 'Markdown']
  },
  {
    title: 'Montador de Escalas',
    description: 'Sistema web self-service para montar escalas de forma rápida e inteligente, facilitando a gestão da equipe.',
    code:'https://github.com/Pedroxbr16/MakeSchedule',
    demo: 'https://escala.pedrojusto.com.br',
    image: '/montaEscala.webp',
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
