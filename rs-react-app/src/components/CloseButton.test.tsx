import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CloseButton from '../../src/components/CloseButton';
import userEvent from '@testing-library/user-event';

describe('CloseButton', () => {
  it('renders the close button with ✖ symbol', () => {
    const handleClick = vi.fn();
    render(<CloseButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('✖');
  });

  it('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    render(<CloseButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
