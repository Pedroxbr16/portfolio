import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faCss3Alt, faJs, faReact,
  faNodeJs, faPhp, faJava, faPython,
  faGithub, faLinkedin, faInstagram, 
  faDocker
} from '@fortawesome/free-brands-svg-icons';
import './App.css';
import ContatoForm from './component/ContatoForm';
import {  showWarningAlert } from './component/SweetAlert';



const techIcons = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3Alt, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  { icon: faReact, label: 'React' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPhp, label: 'PHP' },
  { icon: faJava, label: 'Java' },
  { icon: faPython, label: 'Python' },
  { icon: faDocker, label: 'Docker' }
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
    title: 'Sistema Patrimonial',
    description: 'Sistema de controle de bens com cadastro, edição e geração de termos de responsabilidade para empréstimos.',
    code: 'https://github.com/Pedroxbr16/patrimonio-react',
    demo: '#',
    image: '/embreve.png',
    tags: ['React', 'CSS', 'Node.js', 'MongoDB']
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
    title: 'Sistema de Estoque',
    description: 'Sistema de controle de estoque com cadastro, edição e organização de materiais por categorias e depósitos.',
    code: 'https://github.com/Pedroxbr16/estoque-php',
    demo: '#',
    image: '/estoque.jpg',
    tags: ['HTML', 'CSS', 'PHP', 'JS']
  }
];

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(window.innerWidth < 768 ? 1 : 2);
  const carouselRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const updateCardsPerSlide = () => setCardsPerSlide(window.innerWidth < 768 ? 1 : 2);
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  const handleNext = () => {
    const maxIndex = Math.ceil(projects.length / cardsPerSlide) - 1;
    const nextIndex = (index + 1) > maxIndex ? 0 : index + 1;
    setIndex(nextIndex);
    carouselRef.current.style.transform = `translateX(-${nextIndex * 100}%)`;
  };

  const handlePrev = () => {
    const maxIndex = Math.ceil(projects.length / cardsPerSlide) - 1;
    const prevIndex = (index - 1 + maxIndex + 1) % (maxIndex + 1);
    setIndex(prevIndex);
    carouselRef.current.style.transform = `translateX(-${prevIndex * 100}%)`;
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const maxIndex = Math.ceil(projects.length / cardsPerSlide) - 1;
      setIndex(prev => {
        const next = (prev + 1) > maxIndex ? 0 : prev + 1;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${next * 100}%)`;
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [cardsPerSlide]);
  return (
    <div className="container">
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/favicon.png" alt="Logo" className="logo-img" />
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#tecnologias">Tecnologias</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
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

      <section id="home" className="intro">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Pedro Justo</h1>
            <p className="subtitle">Desenvolvedor Web</p>
            <p className="description">
              Sou desenvolvedor fullstack com especialização em aplicações web, atuando com foco em tecnologias como React e Node.js. Tenho  experiência no desenvolvimento de interfaces funcionais e intuitivas, construção de APIs escaláveis e integração de sistemas modernos. 
            </p> 
            <p className='description'>
              Tenho como propósito transformar ideias em soluções tecnológicas eficientes, contribuindo diretamente para a otimização de processos e a melhoria da experiência do usuário. Estou em constante atualização, buscando novas ferramentas e conhecimentos que me permitam evoluir continuamente e entregar resultados de excelência.
            </p>
          </div>
          <img src="/user.png" alt="Pedro Justo" className="profile-img" />
        </div>
      </section>

      <section id="tecnologias" className="tech-section">
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

   
      <section id="projetos" className="projects">
        <h2>Meus Projetos</h2>
        <p>Um pouco de alguns projetos pessoais e trabalho que participei</p>
        <div className="carousel">
          <button className="carousel-btn left" onClick={handlePrev}>&#8592;</button>
          <div
            className="carousel-track"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {Array.from({ length: Math.ceil(projects.length / cardsPerSlide) }).map((_, groupIndex) => (
              <div className="carousel-slide" key={groupIndex}>
                {projects.slice(groupIndex * cardsPerSlide, groupIndex * cardsPerSlide + cardsPerSlide).map((project, index) => (
                  <div className="project-card" key={index}>
                    <div className="card-image-placeholder">
                      <img src={project.image} alt={project.title} className="project-image" />
                    </div>
                    <div className="card-info">
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-description">{project.description}</p>
                      <div className="card-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="card-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-buttons">
  {project.code !== '#' ? (
    <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn-outline">
      <FontAwesomeIcon icon={faGithub} className="icon-left" />
      Código
    </a>
  ) : (
    <button className="btn-outline" onClick={() => showWarningAlert('Link de código ainda não disponível.')}>
      <FontAwesomeIcon icon={faGithub} className="icon-left" />
      Código
    </button>
  )}

  {project.demo !== '#' ? (
    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-black">
      Demo
      <svg className="icon-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"/>
        <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z"/>
      </svg>
    </a>
  ) : (
    <button className="btn-black" onClick={() => showWarningAlert('Link da demo ainda não disponível.')}>
      Demo
      <svg className="icon-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"/>
        <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z"/>
      </svg>
    </button>
  )}
</div>


                  </div>
                ))}
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={handleNext}>&#8594;</button>
          <div className="carousel-indicators">
            {Array.from({ length: Math.ceil(projects.length / cardsPerSlide) }).map((_, i) => (
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

      {/* Botão flutuante para abrir menu */}
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
