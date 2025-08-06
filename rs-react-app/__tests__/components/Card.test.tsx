import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { renderWithProviders } from '../utils/utils-for-tests';
import userEvent from '@testing-library/user-event';
import Card from '../../src/components/Card';

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

  it('dispatch selectItem when checkbox is clicked to select', async () => {
    const cardProps = {
      id: 'abys',
      pageNumber: '1',
      name: 'Abyssinian',
      description: 'Active, Energetic',
    };

    const { store } = renderWithProviders(<Card {...cardProps} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(store.getState().selectedItems.selectedItemsIds).toContain('abys');
  });

  it('dispatch unselectItem when checkbox is clicked to unselect', async () => {
    const cardProps = {
      id: 'abys',
      pageNumber: '1',
      name: 'Abyssinian',
      description: 'Active, Energetic',
    };

    const { store } = renderWithProviders(<Card {...cardProps} />, {
      preloadedState: {
        selectedItems: { selectedItemsIds: ['abys'] },
      },
    });

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(store.getState().selectedItems.selectedItemsIds).not.toContain(
      'abys'
    );
  });
});
