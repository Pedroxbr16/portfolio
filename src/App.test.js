import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders the Vira converter project', () => {
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
});
