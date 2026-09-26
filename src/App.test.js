import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders the Vira converter project and its details modal', () => {
  render(<App />);

  const title = screen.getByRole('heading', {
    name: 'Vira — Conversor de Arquivos'
  });
  const card = title.closest('.project-card');
  const projectLink = within(card).getByRole('link', { name: /ver projeto/i });

  expect(projectLink).toHaveAttribute(
    'href',
    'https://conversor.pedrojusto.com.br'
  );

  fireEvent.click(within(card).getByRole('button', {
    name: 'Ver detalhes de Vira — Conversor de Arquivos'
  }));

  const dialog = screen.getByRole('dialog', {
    name: 'Vira — Conversor de Arquivos'
  });

  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByText(/LibreOffice, ImageMagick, Poppler e FFmpeg/i)).toBeInTheDocument();
});

test('renders institutional projects without external links', () => {
  render(<App />);

  const title = screen.getByRole('heading', {
    name: 'SISGED — Gestão de Documentos'
  });
  const card = title.closest('.project-card');

  expect(within(card).queryByRole('link')).not.toBeInTheDocument();
  expect(within(card).getByText('Acesso institucional')).toBeInTheDocument();

  fireEvent.click(within(card).getByRole('button', {
    name: 'Ver detalhes de SISGED — Gestão de Documentos'
  }));

  expect(screen.getByRole('dialog', {
    name: 'SISGED — Gestão de Documentos'
  })).toBeInTheDocument();
});
