import { describe, expect, it } from 'vitest';
import { SubmittedData } from '../../src/components/SubmittedData';
import {
  setReactHookFormData,
  setUncontrolledFormData,
} from '../../src/store/slices/formSlice';
import { store } from '../../src/store';
import { renderWithProvider } from '../utils/test-utils';
import { screen } from '@testing-library/react';
import { reactHookFormData, uncontrolledFormData } from '../utils/testData';

describe('SubmittedData', () => {
  it('render uncontrolled form data', () => {
    store.dispatch(setUncontrolledFormData(uncontrolledFormData));

    renderWithProvider(<SubmittedData />);

    expect(screen.getByText(/Uncontrolled Form Data/i)).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-name')).toHaveTextContent(
      'Tatiana'
    );
    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-image')).toHaveAttribute(
      'src',
      'avatar.jpg'
    );
  });

  it('render react hook form data', () => {
    store.dispatch(setReactHookFormData(reactHookFormData));

    renderWithProvider(<SubmittedData />);

    expect(screen.getByText(/React Hook Form Data/i)).toBeInTheDocument();
    expect(screen.getByTestId('reacthook-name')).toHaveTextContent('Alex');
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
    expect(screen.getByTestId('reacthook-image')).toHaveAttribute(
      'src',
      'avatar2.jpg'
    );
  });
});
