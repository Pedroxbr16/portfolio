import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  FiArrowUpRight,
  FiBarChart2,
  FiBox,
  FiCalendar,
  FiCheck,
  FiDollarSign,
  FiFileText,
  FiLock,
  FiX
} from 'react-icons/fi';
import { showWarningAlert } from './SweetAlert';
import '../assets/css/ProjectCard.css';

const previewIcons = {
  documents: FiFileText,
  finance: FiDollarSign,
  assets: FiBox,
  events: FiCalendar,
};

function PreviewContent({ type }) {
  if (type === 'documents') {
    return (
      <div className="preview-document-list">
        <span className="preview-section-label">Documentos recentes</span>
        {[0, 1, 2].map((item) => (
          <div className="preview-document-row" key={item}>
            <FiFileText />
            <span />
            <i />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'finance') {
    return (
      <>
        <div className="preview-metrics">
          <span><small>Contratos</small><strong>●●●</strong></span>
          <span><small>Vigentes</small><strong>●●</strong></span>
        </div>
        <div className="preview-chart" aria-hidden="true">
          {[42, 68, 54, 82, 64, 91].map((height, index) => (
            <i key={index} style={{ '--bar-height': `${height}%` }} />
          ))}
        </div>
      </>
    );
  }

  if (type === 'assets') {
    return (
      <>
        <div className="preview-dashboard-heading">
          <span className="preview-section-label">Visão patrimonial</span>
          <FiBarChart2 />
        </div>
        <div className="preview-asset-grid">
          <span /><span /><span />
        </div>
        <div className="preview-table">
          <span /><span /><span />
        </div>
      </>
    );
  }

  return (
    <div className="preview-events-layout">
      <span className="preview-section-label">Agenda institucional</span>
      <div className="preview-calendar-grid">
        {Array.from({ length: 14 }, (_, index) => (
          <i className={index === 3 || index === 8 || index === 11 ? 'is-active' : ''} key={index} />
        ))}
      </div>
      <div className="preview-event-row"><span /><i /></div>
    </div>
  );
}

function InstitutionalPreview({ project }) {
  const Icon = previewIcons[project.previewType] || FiLock;

  return (
    <div className={`institutional-preview institutional-preview--${project.previewType}`} aria-hidden="true">
      <div className="institutional-preview__topbar">
        <span className="institutional-preview__dots"><i /><i /><i /></span>
        <small>CGE-RJ</small>
      </div>
      <div className="institutional-preview__shell">
        <aside className="institutional-preview__sidebar">
          <Icon />
          <span /><span /><span />
        </aside>
        <div className="institutional-preview__content">
          <div className="institutional-preview__heading">
            <strong>{project.acronym}</strong>
            <i />
          </div>
          <PreviewContent type={project.previewType} />
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const titleId = useId();
  const descriptionId = useId();
  const isInstitutional = Boolean(project.institutional);
  const hasCode = project.code && project.code !== '#';
  const hasDemo = project.demo && project.demo !== '#';

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="project-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button className="project-modal__close" type="button" onClick={onClose} aria-label="Fechar detalhes">
          <FiX />
        </button>

        <div className={`project-modal__preview${isInstitutional ? '' : ' project-modal__preview--public'}`}>
          {isInstitutional ? (
            <InstitutionalPreview project={project} />
          ) : (
            <img src={project.image} alt={`Prévia do projeto ${project.title}`} className="project-modal__image" />
          )}
        </div>

        <div className="project-modal__body">
          <span className="project-modal__eyebrow">
            {isInstitutional ? 'Projeto institucional · CGE-RJ' : 'Projeto público'}
          </span>
          <h3 id={titleId}>{project.title}</h3>
          <p id={descriptionId}>{project.details}</p>

          <div className="project-modal__role">
            <small>Minha atuação</small>
            <strong>{project.role}</strong>
          </div>

          <h4>Principais contribuições</h4>
          <ul className="project-modal__highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}><FiCheck /> <span>{highlight}</span></li>
            ))}
          </ul>

          {isInstitutional ? (
            <div className="project-modal__restricted">
              <FiLock />
              <span>Por ser um sistema interno, não há link público ou repositório disponível.</span>
            </div>
          ) : (
            <div className="project-modal__links">
              {hasCode && (
                <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <FontAwesomeIcon icon={faGithub} /> Código
                </a>
              )}
              {hasDemo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Abrir projeto <FiArrowUpRight />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>,
    document.body
  );
}

export default function ProjectCard({ project, getTagCategory, transitionDelay }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasCode = project.code && project.code !== '#';
  const hasDemo = project.demo && project.demo !== '#';
  const isInstitutional = Boolean(project.institutional);

  return (
    <div className="project-card reveal" style={{ transitionDelay }}>
      {isInstitutional ? (
        <button
          type="button"
          className="card-image-placeholder institutional-preview-trigger"
          onClick={() => setIsModalOpen(true)}
          aria-label={`Ver detalhes de ${project.title}`}
        >
          <InstitutionalPreview project={project} />
        </button>
      ) : (
        <div className="card-image-placeholder">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

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

      {isInstitutional ? (
        <div className="institutional-actions">
          <span className="institutional-notice"><FiLock /> Acesso institucional</span>
          <button className="institutional-details-button" type="button" onClick={() => setIsModalOpen(true)}>
            Ver detalhes <FiArrowUpRight />
          </button>
        </div>
      ) : (
        <div className="public-project-actions">
          <button
            className="public-details-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Ver detalhes de ${project.title}`}
          >
            Ver detalhes <FiArrowUpRight />
          </button>

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
                onClick={() => showWarningAlert('Links do projeto ainda não disponíveis.')}
              >
                Indisponível
              </button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
