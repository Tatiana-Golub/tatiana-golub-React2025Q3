import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockBreedDetails } from '../__mocks__/breedDetails.mock';
import * as api from '../../src/api/API';
import { fetchBreedMock } from '../__mocks__/fetchBreedMock';
import { renderDetailsCard } from '../utils/helpers';

beforeEach(() => {
  vi.spyOn(api, 'fetchBreed').mockImplementation(async (id: string) => {
    if (id === 'abys') {
      return fetchBreedMock(mockBreedDetails);
    }
    return {
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response;
  });
});

describe('DetailsCard', () => {
  it('render breed name in title properly', async () => {
    renderDetailsCard();

    const heading = await screen.findByRole('heading', {
      name: /breed details: abyssinian/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('render temperament data properly', async () => {
    renderDetailsCard();

    const description = await screen.findByText(
      /active, energetic, independent, intelligent, gentle/i
    );
    expect(description).toBeInTheDocument();
  });

  it('render origin data properly', async () => {
    renderDetailsCard();

    const description = await screen.findByText(/egipt/i);
    expect(description).toBeInTheDocument();
  });

  it('render lifespan data properly', async () => {
    renderDetailsCard();

    const description = await screen.findByText(/14 - 15/i);
    expect(description).toBeInTheDocument();
  });

  it('render wikipedia link properly', async () => {
    renderDetailsCard();

    const link = await screen.findByRole('link', {
      name: mockBreedDetails.wikipedia_url,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockBreedDetails.wikipedia_url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
