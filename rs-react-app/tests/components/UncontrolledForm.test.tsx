import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UncontrolledForm } from '../../src/components/UncontrolledForm';
import { renderWithProvider } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { store } from '../../src/store';
import { setUncontrolledFormData } from '../../src/store/slices/formSlice';

describe('UncontrolledForm', () => {
  it('render all required fields', () => {
    renderWithProvider(<UncontrolledForm />);
    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /Age/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    const passwordInputs = screen.getAllByRole('textbox', { hidden: true });
    expect(passwordInputs).toHaveLength(2);

    expect(screen.getByRole('radio', { name: /^Male$/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /^Female$/ })).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: /Country/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Upload Image/i)).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /Accept Terms/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('show validation errors on empty submit', async () => {
    renderWithProvider(<UncontrolledForm />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByTestId('name-error')).toHaveTextContent(
      'First letter must be uppercase'
    );
    expect(await screen.findByTestId('email-error')).toHaveTextContent(
      'Email is required'
    );
  });

  it('validate password strength', async () => {
    renderWithProvider(<UncontrolledForm />);

    const passwordInput = screen.getByLabelText(/^Password$/i);

    await userEvent.type(passwordInput, 'weak');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const passwordError = await screen.findByTestId('password-error');
    expect(passwordError).toHaveTextContent(/number/i);
    expect(passwordError).toHaveTextContent(/uppercase/i);
    expect(passwordError).toHaveTextContent(/special character/i);
  });

  it('submit form with valid data and dispatch Redux action', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProvider(<UncontrolledForm />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Tatiana');
    const ageInput = screen.getByRole('spinbutton', { name: /Age/i });
    await userEvent.type(ageInput, '25');
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'Strong1!');
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      'Strong1!'
    );

    const maleRadio = screen.getByRole('radio', { name: /^Male$/ });
    await userEvent.click(maleRadio);

    await userEvent.selectOptions(screen.getByLabelText(/Country/i), 'Canada');

    await userEvent.click(screen.getByLabelText(/Accept Terms/i));

    const fileInput = screen.getByLabelText(
      /Upload Image/i
    ) as HTMLInputElement;
    const file = new File(['dummy content'], 'avatar.jpg', {
      type: 'image/jpg',
    });
    await userEvent.upload(fileInput, file);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        setUncontrolledFormData(expect.objectContaining({ name: 'Tatiana' }))
      );
    });
  });
});
