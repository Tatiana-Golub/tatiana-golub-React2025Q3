import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from '../../src/components/CardList';
import { mockBreeds } from '../__mocks__/breeds.mock';
import { MemoryRouter } from 'react-router-dom';

describe('CardList', () => {
  it('render correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <CardList data={mockBreeds} />
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(mockBreeds.length);
  });

  it('correctly displays item names and descriptions', () => {
    render(
      <MemoryRouter>
        <CardList data={mockBreeds} />
      </MemoryRouter>
    );

    const heading1 = screen.getByRole('heading', { name: /persian/i });
    expect(heading1).toBeInTheDocument();

    const description1 = screen.getByText(/sweet and gentle/i);
    expect(description1).toBeInTheDocument();

    const heading2 = screen.getByRole('heading', { name: /maine coon/i });
    expect(heading2).toBeInTheDocument();

    const description2 = screen.getByText(/gentle giant/i);
    expect(description2).toBeInTheDocument();
  });
});
