import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { mockBreeds } from './__mocks__/breeds.mock';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('make initial API call on component mount', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockBreeds),
    });

    render(<App data="" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText(/persian/i)).toBeInTheDocument();
    expect(await screen.findByText(/maine coon/i)).toBeInTheDocument();
  });

  it('handle API error responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn(),
    });

    render(<App data="" />);

    expect(await screen.findByText(/Error: HTTP 500/)).toBeInTheDocument();
  });

  it('trigger search callback with trimmed input when button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockBreeds),
    });

    render(<App data="" />);
    const input = screen.getByPlaceholderText(/search for cats/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  persian  ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe('persian');
  });

  it('handle search term from localStorage', async () => {
    localStorage.setItem('searchItem', 'siam');

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([{ id: '1', name: 'Siam' }]),
    });

    render(<App data="" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/search?q=siam'),
        expect.anything()
      );
    });
  });
});
