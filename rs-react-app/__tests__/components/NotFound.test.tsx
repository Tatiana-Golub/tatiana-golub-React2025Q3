import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from '../../src/components/NotFound';

describe('NotFound', () => {
  it('render title properly', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/page not found/i);
  });
});
