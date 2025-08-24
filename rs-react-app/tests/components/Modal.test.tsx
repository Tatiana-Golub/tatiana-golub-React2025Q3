import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { Modal } from '../../src/components/Modal';
import { screen } from '@testing-library/react';

describe('Modal', () => {
  it('render children when open and not when closed', async () => {
    const { rerender } = render(
      <Modal isShowing={false} hide={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();

    rerender(
      <Modal isShowing={true} hide={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(await screen.findByText(/Modal Content/i)).toBeInTheDocument();
  });

  it('call hide when close button is clicked', async () => {
    const hideMock = vi.fn();
    render(
      <Modal isShowing={true} hide={hideMock}>
        <div>Modal Content</div>
      </Modal>
    );

    await userEvent.click(screen.getByRole('button'));
    expect(hideMock).toHaveBeenCalled();
  });

  it('call hide when ESC key is pressed', async () => {
    const hideMock = vi.fn();
    render(
      <Modal isShowing={true} hide={hideMock}>
        <div>Modal Content</div>
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(hideMock).toHaveBeenCalled();
  });

  it('call hide when clicking outside the modal content', async () => {
    const hideMock = vi.fn();
    render(
      <Modal isShowing={true} hide={hideMock}>
        <div>Modal Content</div>
      </Modal>
    );

    await userEvent.click(document.body);
    expect(hideMock).toHaveBeenCalled();
  });

  it('render modal in a portal', async () => {
    render(
      <Modal isShowing={true} hide={vi.fn()}>
        <div>Modal Test</div>
      </Modal>
    );

    const modalContent = await screen.findByText(/Modal Test/i);
    expect(document.body.contains(modalContent)).toBe(true);
  });
});
