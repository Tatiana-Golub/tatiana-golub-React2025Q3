import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../../src/components/ErrorButton';
import userEvent from '@testing-library/user-event';

describe('Error Button', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it('render error button properly', () => {
    render(<ErrorButton />);

    const button = screen.getByRole('button', { name: /error button/i });
    expect(button).toBeInTheDocument();
  });

  it('throw error when ErrorButton is clicked and show fallback UI', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /error button/i });
    await userEvent.click(button);

    const errorMessage = screen.getByText(/something bad happened/i);
    expect(errorMessage).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });
});
