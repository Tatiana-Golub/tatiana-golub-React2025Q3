import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../../src/components/NotFound';
import { MemoryRouter } from 'react-router';

vi.mock('../../src/components/BackButton', () => ({
  default: () => <button>Go Back</button>,
}));

describe('NotFound', () => {
  it('renders the "Page Not Found" message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('renders the BackButton component', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });
});
