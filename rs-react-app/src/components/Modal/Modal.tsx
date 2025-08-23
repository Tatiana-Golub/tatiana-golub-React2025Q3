import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  isShowing: boolean;
  hide: () => void;
  children: React.ReactNode;
  triggerRef?: React.RefObject<HTMLElement>;
}

export function Modal({ isShowing, hide, children, triggerRef }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef<boolean>(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    if (isShowing) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isShowing, hide]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        hide();
      }
    }
    if (isShowing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isShowing, hide]);

  useEffect(() => {
    if (isShowing) {
      const firstInput =
        modalRef.current?.querySelector<HTMLInputElement>('input');
      firstInput?.focus();
    } else if (wasOpen.current && triggerRef?.current) {
      triggerRef.current.focus();
    }
    wasOpen.current = isShowing;
  }, [isShowing, triggerRef]);

  if (!isShowing) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-wrapper" ref={modalRef}>
        <button className="modal-close" aria-label="Close" onClick={hide}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}
