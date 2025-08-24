import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MainPage } from '../../src/pages/MainPage';
import { renderWithProvider } from '../utils/test-utils';
import { screen } from '@testing-library/react';
import { setUncontrolledFormData } from '../../src/store/slices/formSlice';
import { store } from '../../src/store';
import { uncontrolledFormData } from '../utils/testData';

describe('MainPage', () => {
  it('render the buttons and header', () => {
    renderWithProvider(<MainPage />);
    expect(
      screen.getByRole('heading', { name: /choose form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /react hook form/i })
    ).toBeInTheDocument();
  });

  it('open Uncontrolled Form modal when its button is clicked', async () => {
    renderWithProvider(<MainPage />);
    const openButton = screen.getByRole('button', {
      name: /uncontrolled form/i,
    });

    await userEvent.click(openButton);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it('open React Hook Form modal when its button is clicked', async () => {
    renderWithProvider(<MainPage />);
    const openButton = screen.getByRole('button', { name: /react hook form/i });

    await userEvent.click(openButton);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  });

  it('close React Hook Form modal when ESC key is pressed', async () => {
    renderWithProvider(<MainPage />);
    const openButton = screen.getByRole('button', { name: /react hook form/i });

    await userEvent.click(openButton);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByLabelText(/Name/i)).not.toBeInTheDocument();
    });
  });

  it('render SubmittedData component on main page', () => {
    store.dispatch(setUncontrolledFormData(uncontrolledFormData));

    renderWithProvider(<MainPage />);

    expect(screen.getByText(/Uncontrolled Form Data/i)).toBeInTheDocument();
  });
});
