import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from '../../src/components/Card';

describe('Card', () => {
  it('render name and description properly', () => {
    render(<Card name="Siamese" description="Sweet and lovely" />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/siamese/i);

    const description = screen.getByRole('paragraph');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(/sweet and lovely/i);
  });

  it('handle the absence of description gracefully', () => {
    render(<Card name="Unknown" description={''} />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/unknown/i);

    const description = screen.getByRole('paragraph');
    expect(description).not.toHaveTextContent(/sweet and lovely/);
  });
});
