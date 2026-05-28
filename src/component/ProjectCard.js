import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { showWarningAlert } from './SweetAlert';
import '../assets/css/ProjectCard.css';

export default function ProjectCard({ project, getTagCategory, transitionDelay }) {
  const hasCode = project.code && project.code !== '#';
  const hasDemo = project.demo && project.demo !== '#';

  return (
    <div className="project-card reveal" style={{ transitionDelay }}>
      <div className="card-image-placeholder">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="card-info">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>

        <div className="card-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`card-tag card-tag--${getTagCategory(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card-buttons">
        {hasCode && (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FontAwesomeIcon icon={faGithub} />
            Código
          </a>
        )}

        {hasDemo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Ver Projeto
          </a>
        )}

        {!hasCode && !hasDemo && (
          <button
            className="btn-outline"
            onClick={() =>
              showWarningAlert('Links do projeto ainda não disponíveis.')
            }
          >
            Indisponível
          </button>
        )}
      </div>
    </div>
  );
}
