import BackButton from '../../components/BackButton';
import styles from './not-found.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Page Not Found</h1>
      <BackButton />
    </div>
  );
}

export default NotFound;
