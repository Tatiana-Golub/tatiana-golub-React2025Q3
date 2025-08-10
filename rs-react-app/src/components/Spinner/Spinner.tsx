import type { SpinnerProps } from '../../types';
import styles from './Spinner.module.css';

function Spinner({ loading }: SpinnerProps) {
  if (!loading) {
    return null;
  }

  return (
    <div className={styles.loader} data-testid="spinner">
      <div className={styles.innerCircle}></div>
    </div>
  );
}

export default Spinner;
