import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FiMenu, FiX } from 'react-icons/fi';
import '../assets/css/Navbar.css';
import { smoothScrollTo } from '../utils/scroll';

export default function Navbar({ projectCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);
    smoothScrollTo(targetId);
  };

  return (
    <header className="navbar navbar--portfolio">
      <div className="nav-container">
        {/* ESQUERDA: logo */}
        <div className="nav-left">
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('home');
          }}>
            <img src="/favicon.png" alt="Logo de Pedro Justo" className="logo-img" />
          </a>
        </div>

        {/* Botão Mobile */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* CENTRO: links */}
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#tecnologias" onClick={(e) => handleNavClick(e, 'tecnologias')}>Tecnologias</a>
          <a href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')}>
            Projetos{' '}
            {typeof projectCount === 'number' ? `(${projectCount})` : ''}
          </a>
          <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')}>Contato</a>
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
