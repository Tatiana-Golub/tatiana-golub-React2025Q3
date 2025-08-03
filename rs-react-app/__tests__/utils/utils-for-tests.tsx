import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactElement, PropsWithChildren } from 'react';
import selectedItemsSlice from '../../src/redux/cardSlice';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        selectedItems: selectedItemsSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
