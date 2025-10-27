import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faCss3Alt, faJs, faReact,
  faNodeJs, faPhp, faPython,
  faGithub, faLinkedin, faInstagram,
  faDocker
} from '@fortawesome/free-brands-svg-icons';
import './App.css';
import Navbar from './component/Navbar';
import ContatoForm from './component/ContatoForm';
import { showWarningAlert } from './component/SweetAlert';

const techIcons = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3Alt, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faReact, label: 'React' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPhp, label: 'PHP' },
  { icon: faPython, label: 'Python' },
  { icon: faDocker, label: 'Docker' },
  { icon: '/ejs.svg', label: 'EJS', isImage: true },
  { icon: '/sql.svg', label: 'SQL', isImage: true },
  { icon: '/mongo.svg', label: 'MongoDB', isImage: true },
];

const projects = [
  {
    title: 'Gestão de Clínica',
    description: 'Sistema de gestão clínica com agenda médica, cadastro de pacientes e módulo financeiro integrado.',
    code: 'https://github.com/Pedroxbr16/clinica-node',
    demo: 'https://clinica-node.vercel.app/login',
    image: '/clinica.png',
    tags: ['React', 'CSS', 'Bootstrap', 'Node.js', 'MySQL']
  },
  {
    title: 'Documentação',
    description: 'Documentação criada com Docusaurus para organizar conteúdos técnicos.',
    code: 'https://github.com/Pedroxbr16/documentacao-geral',
    demo: 'https://pemtech.vercel.app',
    image: '/documentacao.png',
    tags: ['Docusaurus', 'Markdown']
  },
  {
    title: 'Encurtador de Links',
    description: 'Aplicativo web para encurtar URLs de forma rápida e prática, com interface simples e intuitiva.',
    code: 'https://github.com/Pedroxbr16/encurtador',
    demo: 'https://encurtador.streamlit.app',
    image: '/encurtador.png',
    tags: ['Python', 'Streamlit']
  },
  {
    title: 'Baixador de Vídeos',
    description: 'Ferramenta em Python com Streamlit para baixar vídeos do YouTube de forma prática.',
    code: 'https://github.com/Pedroxbr16/baixador_videos',
    demo: 'https://baixador-videos.vercel.app',
    image: '/baixador.png',
    tags: ['Python', 'Streamlit', 'Pytube']
  }
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const projectCount = projects.length;
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container">
      <Navbar projectCount={projectCount} showLinks={true} />
      {/* HOME */}
      <section id="home" className="intro">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Pedro Justo</h1>
            <p className="subtitle">Desenvolvedor FullStack</p>

            <p className="description">
              Sou desenvolvedor fullstack com especialização em aplicações web,
              atuando com foco em tecnologias como React e Node.js. Tenho
              experiência no desenvolvimento de interfaces funcionais e
              intuitivas, construção de APIs escaláveis e integração de sistemas
              modernos.
            </p>

            <p className="description">
              Tenho como propósito transformar ideias em soluções tecnológicas
              eficientes, contribuindo diretamente para a otimização de
              processos e a melhoria da experiência do usuário. Estou em
              constante atualização, buscando novas ferramentas e conhecimentos
              que me permitam evoluir continuamente e entregar resultados de
              excelência.
            </p>
          </div>

          <img src="/user.png" alt="Pedro Justo" className="profile-img" />
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section id="tecnologias" className="tech-section">
        <h1 className="tech-title">Tecnologias que mais utilizo</h1>

        <div className="tech-icons-container">
          {techIcons.map((tech, index) => (
            <div key={index} className="tech-icon">
              {tech.isImage ? (
                <img src={tech.icon} alt={tech.label} className="tech-img" />
              ) : (
                <FontAwesomeIcon icon={tech.icon} size="3x" />
              )}
              <p>{tech.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="projects">
        <h2>Meus Projetos ({projectCount})</h2>
        <p>Um pouco de alguns projetos pessoais e trabalhos que participei</p>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div className="project-card" key={idx}>
              <div className="card-image-placeholder">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              <div className="card-info">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>

                <div className="card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="card-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="card-buttons">
                {project.code !== '#' ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <FontAwesomeIcon icon={faGithub} className="icon-left" />
                    Código
                  </a>
                ) : (
                  <button
                    className="btn-outline"
                    onClick={() =>
                      showWarningAlert('Link de código ainda não disponível.')
                    }
                  >
                    Código
                  </button>
                )}

                {project.demo !== '#' ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-black"
                  >
                    Ver Projeto
                  </a>
                ) : (
                  <button
                    className="btn-black"
                    onClick={() =>
                      showWarningAlert('Link de demonstração ainda não disponível.')
                    }
                  >
                    Ver Projeto
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato">
        <ContatoForm />
      </section>

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
      </footer>

      {/* MENU FLUTUANTE (mobile) */}
      <div className="floating-nav">
        <button className="floating-button" onClick={toggleMenu}>
          <img src="/trace.svg" alt="Menu" className="menu-icon" />
        </button>

        {menuOpen && (
          <div className="floating-menu">
            <a href="#home" onClick={toggleMenu}>Home</a>
            <a href="#tecnologias" onClick={toggleMenu}>Tecnologias</a>
            <a href="#projetos" onClick={toggleMenu}>Projetos</a>
            <a href="#contato" onClick={toggleMenu}>Contato</a>
          </div>
        )}
      </div>
    </div>
  );
}
