import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faCss3Alt, faJs, faReact,
  faNodeJs, faPhp, faJava, faPython,
  faGithub, faLinkedin, faInstagram
} from '@fortawesome/free-brands-svg-icons';
import './App.css';
import ContatoForm from './component/ContatoForm';

const techIcons = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3Alt, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faReact, label: 'React' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPhp, label: 'PHP' },
  { icon: faJava, label: 'Java' },
  { icon: faPython, label: 'Python' }
];

const projects = [
  { title: 'Gestão de Clínica', description: 'Sistema completo com React, Node e MySQL', link: 'https://github.com/Pedroxbr16/clinica-node' },
  { title: 'Sistema Patrimonial', description: 'Estoque e controle com React e MongoDB', link: 'https://github.com/Pedroxbr16/patrimonio-react' },
  { title: 'Documentação', description: 'Plataforma de documentação criada com Docusaurus para organizar e compartilhar conteúdos técnicos sobre desenvolvimento.', link: 'https://pemtech.vercel.app' },
  { title: 'Projeto 4', description: 'Descrição do Projeto 4', link: '#' }
];

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef();

  const handleNext = () => {
    const maxIndex = Math.ceil(projects.length / 2) - 1;
    const nextIndex = (index + 1) > maxIndex ? 0 : index + 1;
    setIndex(nextIndex);
    carouselRef.current.style.transform = `translateX(-${nextIndex * 100}%)`;
  };

  const handlePrev = () => {
    const maxIndex = Math.ceil(projects.length / 2) - 1;
    const prevIndex = (index - 1 + maxIndex + 1) % (maxIndex + 1);
    setIndex(prevIndex);
    carouselRef.current.style.transform = `translateX(-${prevIndex * 100}%)`;
  };

  useEffect(() => {
    const maxIndex = Math.ceil(projects.length / 2) - 1;
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) > maxIndex ? 0 : prev + 1;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${next * 100}%)`;
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/favicon.png" alt="Logo" className="logo-img" />
          </div>
          <nav className="nav-links">
            <a href="#">Home</a>
            <a href="#">Tecnologias</a>
            <a href="#">Projetos</a>
            <a href="#">Contato</a>
          </nav>
          <div className="social-icons">
            <a href="https://github.com/Pedroxbr16" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="github" />
            </a>
            <a href="https://www.linkedin.com/in/pedro-justo-463520298/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
            </a>
            <a href="https://www.instagram.com/pedrojusto_/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="instagram" />
            </a>
          </div>
        </div>
      </header>

      <section className="intro">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Pedro Justo</h1>
            <p className="subtitle">Desenvolvedor Web</p>
            <p className="description">
              Sou desenvolvedor fullstack com especialização em aplicações web, atuando com foco em tecnologias como React e Node.js. 
              Tenho  experiência no desenvolvimento de interfaces funcionais e intuitivas, construção de APIs escaláveis e integração de sistemas modernos.
              Tenho como propósito transformar ideias em soluções tecnológicas eficientes, 
              contribuindo diretamente para a otimização de processos e a melhoria da experiência do usuário. Estou em constante atualização, 
              buscando novas ferramentas e conhecimentos que me permitam evoluir continuamente e entregar resultados de excelência.
            </p>
          </div>
          <img src="/user.png" alt="Pedro Justo" className="profile-img" />
        </div>
      </section>

      <section className="tech-section">
        <h1 className="tech-title">Tecnologias que mais utilizo</h1>
        <div className="tech-icons-container">
          {techIcons.map((tech, index) => (
            <div key={index} className="tech-icon">
              <FontAwesomeIcon icon={tech.icon} size="3x" />
              <p>{tech.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="projects">
        <h2>Meus Projetos</h2>
        <p>Um pouco de alguns projetos pessoais e trabalho que participei</p>
        <div className="carousel">
          <button className="carousel-btn left" onClick={handlePrev}>&#8592;</button>
          <div className="carousel-track" ref={carouselRef}>
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, groupIndex) => (
              <div className="carousel-slide" key={groupIndex}>
                {projects.slice(groupIndex * 2, groupIndex * 2 + 2).map((project, index) => (
                  <div className="project-card" key={index}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-btn">Ver Projeto</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={handleNext}>&#8594;</button>
          <div className="carousel-indicators">
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, i) => (
              <span
                key={i}
                className={`indicator ${i === index ? 'active' : ''}`}
                onClick={() => {
                  setIndex(i);
                  if (carouselRef.current) {
                    carouselRef.current.style.transform = `translateX(-${i * 100}%)`;
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <ContatoForm />

      <footer className="footer">
        <div className="social-icons">
          <a href="https://github.com/Pedroxbr16" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="github" />
          </a>
          <a href="https://www.linkedin.com/in/pedro-justo-463520298/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
          </a>
          <a href="https://www.instagram.com/pedrojusto_/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
}
