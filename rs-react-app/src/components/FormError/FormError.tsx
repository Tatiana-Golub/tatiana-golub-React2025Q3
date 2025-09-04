import './FormError.css';

interface Props {
  message?: string;
  testId?: string;
}

export const FormError = ({ message, testId }: Props) => (
  <p className="error" data-testid={testId}>
    {message ?? '\u00A0'}
  </p>
);
