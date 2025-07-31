import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App/App';
import { fetchedBreeds, mockBreeds } from './__mocks__/breeds.mock';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

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

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

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

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Error: HTTP 500/i)).toBeInTheDocument();
  });

  it('trigger search callback with trimmed input when button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockBreeds),
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
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

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/search?q=siam'),
        expect.anything()
      );
    });
  });

  it('go to the next page when Next button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fetchedBreeds,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/breed 1/i)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    expect(await screen.findByText(/breed 5/i)).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('go to the previous page when Prev button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fetchedBreeds,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/breed 1/i)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);
    expect(await screen.findByText(/breed 5/i)).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    await userEvent.click(prevButton);
    expect(await screen.findByText(/breed 1/i)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });
});
