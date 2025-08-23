import { Modal } from '../../components/Modal';
import { ReactHookForm } from '../../components/ReactHookForm';
import { UncontrolledForm } from '../../components/UncontrolledForm';
import { useModal } from '../../hooks/useModal';
import './MainPage.css';

export function MainPage() {
  const modalUncontrolledForm = useModal();
  const modalReactHookForm = useModal();

  return (
    <div className="main-page">
      <h1>Choose Form</h1>
      <div className="main-buttons">
        <button className="main-button" onClick={modalUncontrolledForm.open}>
          Uncontrolled Form
        </button>

        <button className="main-button" onClick={modalReactHookForm.open}>
          React Hook Form
        </button>
      </div>

      <Modal
        isShowing={modalUncontrolledForm.isShowing}
        hide={modalUncontrolledForm.close}
      >
        <UncontrolledForm />
      </Modal>

      <Modal
        isShowing={modalReactHookForm.isShowing}
        hide={modalReactHookForm.close}
      >
        <ReactHookForm />
      </Modal>
    </div>
  );
}
