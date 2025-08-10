import type { RefreshButtonprops } from '../../types';
import styles from './RefreshButton.module.css';

function RefreshButton({ onClick }: RefreshButtonprops) {
  return (
    <button className={styles.refreshButton} onClick={onClick}>
      Refresh
    </button>
  );
}

export default RefreshButton;
