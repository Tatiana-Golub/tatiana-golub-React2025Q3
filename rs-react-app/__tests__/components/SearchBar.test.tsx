import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('render search input and search button', () => {
    render(<SearchBar input="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search for cats/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('show empty input when no saved term exists', () => {
    render(<SearchBar input="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search for cats/i);

    expect(input).toHaveValue('');
  });

  it('update input value when user types', async () => {
    render(<SearchBar input="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search for cats/i);

    await userEvent.type(input, 'Persian');
    expect(input).toHaveValue('Persian');
  });

  it('trigger search callback with trimmed input when button is clicked', async () => {
    render(<SearchBar input="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search for cats/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  persian  ');
    await userEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('persian');
  });

  it('call onSearch when Enter key is pressed', async () => {
    render(<SearchBar input="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search for cats/i);

    await userEvent.type(input, 'Siam{enter}');

    expect(mockOnSearch).toBeCalledWith('Siam');
  });
});
