import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import FlyoutElement from '../../src/components/FlyoutElement';
import { mockBreeds } from '../__mocks__/breeds.mock';
import { renderWithProviders } from '../utils/utils-for-tests';

describe('FlyoutElement', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(
      () => 'blob:http://localhost/fake-blob-url'
    );
  });

  describe('FlyoutElement', () => {
    it('not render if no items are selected', () => {
      renderWithProviders(<FlyoutElement items={mockBreeds} />, {
        preloadedState: {
          selectedItems: { selectedItemsIds: [] },
        },
      });

      expect(screen.queryByText(/Item\(s\) selected:/)).not.toBeInTheDocument();
    });

    it('render selected items info and buttons when items are selected', () => {
      renderWithProviders(<FlyoutElement items={mockBreeds} />, {
        preloadedState: {
          selectedItems: { selectedItemsIds: ['1', '2'] },
        },
      });

      expect(screen.getByText(/Item\(s\) selected: 2/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /unselect all/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute(
        'download',
        '2_items.csv'
      );
    });
  });
});
