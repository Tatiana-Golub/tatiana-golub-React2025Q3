import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../src/store';

export const renderWithProvider = (ui: React.ReactNode) => {
  return render(<Provider store={store}>{ui}</Provider>);
};
