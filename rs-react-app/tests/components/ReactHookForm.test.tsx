import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReactHookForm } from '../../src/components/ReactHookForm';
import { renderWithProvider } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { store } from '../../src/store';
import { setReactHookFormData } from '../../src/store/slices/formSlice';

describe('ReactHookForm', () => {
  it('render all required fields', () => {
    renderWithProvider(<ReactHookForm />);

    expect(screen.getByRole('textbox', { name: /Name/i })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /Age/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();

    const passwordInputs = screen.getAllByLabelText(/Password/i);
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
    renderWithProvider(<ReactHookForm />);

    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, 'tatiana');
    nameInput.blur();

    expect(
      await screen.findByText(/First letter must be uppercase/i)
    ).toBeInTheDocument();
  });

  it('validate password strength', async () => {
    renderWithProvider(<ReactHookForm />);

    const passwordInput = screen.getByLabelText(/^Password$/i);
    await userEvent.type(passwordInput, 'weak');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const passwordError = await screen.findByText(/Must contain/i);
    expect(passwordError).toHaveTextContent(/number/i);
    expect(passwordError).toHaveTextContent(/uppercase/i);
    expect(passwordError).toHaveTextContent(/special character/i);
  });

  it('submit form with valid data and dispatches Redux action', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProvider(<ReactHookForm />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Tatiana');
    await userEvent.type(
      screen.getByRole('spinbutton', { name: /Age/i }),
      '25'
    );
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'Strong1!');
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      'Strong1!'
    );

    await userEvent.click(screen.getByRole('radio', { name: /^Male$/ }));
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: /Country/i }),
      'Canada'
    );
    await userEvent.click(
      screen.getByRole('checkbox', { name: /Accept Terms/i })
    );

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
        setReactHookFormData(expect.objectContaining({ name: 'Tatiana' }))
      );
    });
  });
});
