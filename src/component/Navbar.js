import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import '../assets/css/Navbar.css';

export default function Navbar({ projectCount }) {
  return (
    <header className="navbar navbar--portfolio">
      <div className="nav-container">
        {/* ESQUERDA: logo */}
        <div className="nav-left">
          <a href="/">
            <img src="/favicon.png" alt="Logo de Pedro Justo" className="logo-img" />
          </a>
        </div>

        {/* CENTRO: links */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#projetos">
            Projetos{' '}
            {typeof projectCount === 'number' ? `(${projectCount})` : ''}
          </a>
          <a href="#contato">Contato</a>
        </nav>

        {/* DIREITA: redes sociais */}
        <div className="social-icons">
          <a
            href="https://github.com/Pedroxbr16"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="github" />
          </a>

          <a
            href="https://www.linkedin.com/in/pedro-justo-463520298/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="linkedin" />
          </a>

          <a
            href="https://www.instagram.com/pedrojusto_/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </a>
        </div>
      </div>
    </header>
  );
}
