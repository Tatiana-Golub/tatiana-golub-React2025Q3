import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockBreedDetails } from '../__mocks__/breedDetails.mock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as api from '../../src/api/API';
import { fetchBreedMock } from '../__mocks__/fetchBreedMock';
import DetailsCard from '../../src/components/DetailsCard';

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
    render(
      <MemoryRouter initialEntries={['/catalog/1/abys']}>
        <Routes>
          <Route path="/catalog/:page/:id" element={<DetailsCard />} />
        </Routes>
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', {
      name: /breed details: abyssinian/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('render temperament data properly', async () => {
    render(
      <MemoryRouter initialEntries={['/catalog/1/abys']}>
        <Routes>
          <Route path="/catalog/:page/:id" element={<DetailsCard />} />
        </Routes>
      </MemoryRouter>
    );

    const description = await screen.findByText(
      /active, energetic, independent, intelligent, gentle/i
    );
    expect(description).toBeInTheDocument();
  });

  it('render origin data properly', async () => {
    render(
      <MemoryRouter initialEntries={['/catalog/1/abys']}>
        <Routes>
          <Route path="/catalog/:page/:id" element={<DetailsCard />} />
        </Routes>
      </MemoryRouter>
    );

    const description = await screen.findByText(/egipt/i);
    expect(description).toBeInTheDocument();
  });

  it('render lifespan data properly', async () => {
    render(
      <MemoryRouter initialEntries={['/catalog/1/abys']}>
        <Routes>
          <Route path="/catalog/:page/:id" element={<DetailsCard />} />
        </Routes>
      </MemoryRouter>
    );

    const description = await screen.findByText(/14 - 15/i);
    expect(description).toBeInTheDocument();
  });

  it('render wikipedia link properly', async () => {
    render(
      <MemoryRouter initialEntries={['/catalog/1/abys']}>
        <Routes>
          <Route path="/catalog/:page/:id" element={<DetailsCard />} />
        </Routes>
      </MemoryRouter>
    );

    const link = await screen.findByRole('link', {
      name: mockBreedDetails.wikipedia_url,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockBreedDetails.wikipedia_url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
