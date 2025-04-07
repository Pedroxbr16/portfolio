import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faBootstrap,
  faReact,
  faNodeJs,
  faPhp,
  faJava,
  faPython,
  faGithub,
  faLinkedin,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import './App.css';

const techIcons = [
  { icon: faHtml5, label: 'HTML5' },
  { icon: faCss3Alt, label: 'CSS3' },
  { icon: faJs, label: 'JavaScript' },
  // { icon: faBootstrap, label: 'Bootstrap' },
  { icon: faReact, label: 'React' },
  { icon: faNodeJs, label: 'Node.js' },
  { icon: faPhp, label: 'PHP' },
  { icon: faJava, label: 'Java' },
  { icon: faPython, label: 'Python'}
];

export default function Portfolio() {
  return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
  <div className="nav-container">
    {/* Favicon à esquerda */}
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
      <FontAwesomeIcon icon={faGithub} className='github'/>
      <FontAwesomeIcon icon={faLinkedin} className='linkedin' />
      <FontAwesomeIcon icon={faInstagram} className='instagram' />
    </div>
  </div>
</header>


      {/* Apresentação */}
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

      {/* Tecnologias */}
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

      {/* Projetos */}
      <section className="projects">
        <h2>Meus Projetos</h2>
        <p>Um pouco de alguns projetos pessoais e trabalho que participei</p>
        <div className="carousel">
          <button className="carousel-btn left">&#8592;</button>
          <div className="carousel-track">
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
          </div>
          <button className="carousel-btn right">&#8594;</button>
        </div>
      </section>

      {/* Contato */}
      <section className="contact">
        <h2>Entre em contato</h2>
        <form className="contact-form">
          <input type="email" placeholder="Email" />
          <textarea placeholder="Mensagem"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <FontAwesomeIcon icon={faGithub} className='github'/>
          <FontAwesomeIcon icon={faLinkedin} className='linkedin' />
          <FontAwesomeIcon icon={faInstagram} className='instagram'/>
        </div>
      </footer>
    </div>
  );
}
