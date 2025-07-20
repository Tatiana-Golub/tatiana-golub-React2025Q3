import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../../src/components/ErrorButton';
import userEvent from '@testing-library/user-event';

describe('Error Boundary', () => {
  const ProblemChild = () => {
    throw new Error();
  };

  const fallbackRegex = /something bad happened/i;
  let consoleError: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleError.mockRestore();
  });

  it('render children when everything is fine', () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine</p>
      </ErrorBoundary>
    );

    expect(screen.getByText(/everything is fine/i)).toBeInTheDocument();
  });

  it(`display fallback UI when error occurs and log error`, () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(fallbackRegex);
    expect(errorMessage).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });

  it(`throw error when ErrorButton is clicked and show fallback UI`, async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /error button/i });
    await userEvent.click(button);

    const errorMessage = screen.getByText(fallbackRegex);
    expect(errorMessage).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });
});
