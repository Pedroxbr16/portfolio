import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import '../assets/css/Navbar.css';

export default function Navbar({
  projectCount,
  showLinks = true,
  variant, // 'portfolio' ou 'hub'
}) {
  return (
    <header
      className={`navbar ${
        variant === 'portfolio' ? 'navbar--portfolio' : 'navbar--hub'
      }`}
    >
      <div className="nav-container">
        {/* ESQUERDA: logo */}
        <div className="nav-left">
          <img src="/favicon.png" alt="Logo" className="logo-img" />
        </div>

        {/* CENTRO: links ou placeholder */}
        {showLinks ? (
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#tecnologias">Tecnologias</a>
            <a href="#projetos">
              Projetos{' '}
              {typeof projectCount === 'number' ? `(${projectCount})` : ''}
            </a>
            <a href="#contato">Contato</a>
          </nav>
        ) : (
          // placeholder some via CSS (.nav-links--placeholder { display: none; })
          <nav className="nav-links nav-links--placeholder" aria-hidden="true">
            <a>_</a>
            <a>_</a>
            <a>_</a>
            <a>_</a>
          </nav>
        )}

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
