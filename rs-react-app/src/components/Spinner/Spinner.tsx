import styles from './Spinner.module.css';

interface SpinnerProps {
  loading: boolean;
}

function Spinner(props: SpinnerProps) {
  if (!props.loading) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <div className={styles.innerCircle}></div>
    </div>
  );
}

export default Spinner;
