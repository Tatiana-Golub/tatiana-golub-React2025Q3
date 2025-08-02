import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from '../../src/components/Card';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('Card', () => {
  it('render name and description properly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card
            id="1"
            name="Siamese"
            description="Sweet and lovely"
            pageNumber="1"
          />
        </MemoryRouter>
      </Provider>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/siamese/i);

    const description = screen.getByRole('paragraph');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(/sweet and lovely/i);
  });
});
