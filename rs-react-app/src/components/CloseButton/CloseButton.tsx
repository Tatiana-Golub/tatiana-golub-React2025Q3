import type { CloseButtonprops } from '../../types';
import styles from './CloseButton.module.css';

function CloseButton({ onClick }: CloseButtonprops) {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      ✖
    </button>
  );
}

export default CloseButton;
