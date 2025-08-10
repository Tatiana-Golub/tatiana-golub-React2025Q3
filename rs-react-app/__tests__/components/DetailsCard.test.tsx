import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithRouterAndProviders } from '../utils/utils-for-tests';
import { server } from '../__mocks__/api/server';
import { http } from 'msw';
import userEvent from '@testing-library/user-event';
import DetailsCard from '../../src/components/DetailsCard';
import { API_URL } from '../__mocks__/api/handlers';

describe('DetailsCard with RTK Query and msw', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('render breed name in title properly', async () => {
    renderWithRouterAndProviders(<DetailsCard />);

    const heading = await screen.findByRole('heading', {
      name: /breed details: abyssinian/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('render temperament data properly', async () => {
    renderWithRouterAndProviders(<DetailsCard />);
    const description = await screen.findByText(
      /active, energetic, independent, intelligent, gentle/i
    );
    expect(description).toBeInTheDocument();
  });

  it('render origin data properly', async () => {
    renderWithRouterAndProviders(<DetailsCard />);
    const description = await screen.findByText(/egipt/i);
    expect(description).toBeInTheDocument();
  });

  it('render lifespan data properly', async () => {
    renderWithRouterAndProviders(<DetailsCard />);
    const description = await screen.findByText(/14 - 15/i);
    expect(description).toBeInTheDocument();
  });

  it('render wikipedia link properly', async () => {
    renderWithRouterAndProviders(<DetailsCard />);

    const link = await screen.findByRole('link', {
      name: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Abyssinian_(cat)'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('show error message and retry button on API error', async () => {
    server.use(
      http.get(`${API_URL}/abys`, () => new Response(null, { status: 500 }))
    );

    renderWithRouterAndProviders(<DetailsCard />);

    expect(
      await screen.findByText(/error loading breed details/i)
    ).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();

    await userEvent.click(retryButton);
  });
});
