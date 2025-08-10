import BackButton from '../BackButton';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Page Not Found</h1>
      <BackButton />
    </div>
  );
}

export default NotFound;
