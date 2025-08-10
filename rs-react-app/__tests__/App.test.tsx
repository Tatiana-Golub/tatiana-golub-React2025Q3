import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils/utils-for-tests';
import { server } from './__mocks__/api/server';
import { API_URL } from './__mocks__/api/handlers';
import { http, HttpResponse } from 'msw';
import { App } from '../src/App';

describe('App', () => {
  it('make initial API call on component mount', async () => {
    renderWithProviders(<App />);

    expect(await screen.findByText(/abyssinian/i)).toBeInTheDocument();
    expect(await screen.findByText(/siamese/i)).toBeInTheDocument();
  });

  it('handle API error responses', async () => {
    server.use(
      http.get(API_URL, () => {
        return new Response(null, { status: 500 });
      })
    );

    renderWithProviders(<App />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('trigger search callback with trimmed input when button is clicked', async () => {
    renderWithProviders(<App />);

    const input = screen.getByPlaceholderText(/search for cats/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  persian  ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchItem')).toBe('persian');
  });

  it('handle search term from localStorage', async () => {
    localStorage.setItem('searchItem', 'siamese');

    renderWithProviders(<App />);

    expect(await screen.findByText(/siamese/i)).toBeInTheDocument();
  });

  it('show spinner while loading', async () => {
    localStorage.clear();
    renderWithProviders(<App />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    expect(await screen.findByText(/abyssinian/i)).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('use cached data on second render without refetching', async () => {
    const fetchSpy = vi.fn();

    server.use(
      http.get(API_URL, () => {
        fetchSpy();
        return HttpResponse.json([
          { id: 'abys', name: 'Abyssinian' },
          { id: 'siam', name: 'Siamese' },
        ]);
      })
    );

    const { store, unmount } = renderWithProviders(<App />);

    expect(await screen.findByText(/abyssinian/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    unmount();
    renderWithProviders(<App />, {
      store,
    });

    expect(await screen.findByText(/abyssinian/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
