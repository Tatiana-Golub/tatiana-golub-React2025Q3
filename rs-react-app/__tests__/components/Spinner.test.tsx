import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Spinner from '../../src/components/Spinner';

describe('Spinner', () => {
  it('does not render spinner when loading is false', () => {
    const { container } = render(<Spinner loading={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('render spinner when loading is true', () => {
    const { container } = render(<Spinner loading={true} />);

    expect(container).toBeInTheDocument();
  });
});