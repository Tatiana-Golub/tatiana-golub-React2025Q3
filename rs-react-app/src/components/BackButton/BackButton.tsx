import styles from './BackButton.module.css';
import { START_URL } from '../../constants';
import Link from 'next/link';

function BackButton() {
  return (
    <Link href={START_URL} className={styles.backButton}>
      Back to Home
    </Link>
  );
}

export default BackButton;
