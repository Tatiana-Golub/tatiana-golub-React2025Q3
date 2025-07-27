import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from '../../src/components/About';
import { MemoryRouter } from 'react-router-dom';

describe('About', () => {
  it('render title properly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/about breeds cat-alog app/i);
  });

  it('render developer name properly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const name = screen.getByText(/tatiana golub/i);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/tatiana golub/i);
  });

  it('render RS School link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /RS School React Course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('render back button', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back to home/i });
    expect(button).toBeInTheDocument();
  });
});
