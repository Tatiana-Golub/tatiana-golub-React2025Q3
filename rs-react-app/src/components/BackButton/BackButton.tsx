import styles from './BackButton.module.css';
import { START_URL } from '../../constants';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

function BackButton() {
  const t = useTranslations('BackButton');

  return (
    <Link href={START_URL} className={styles.backButton}>
      {t('title')}
    </Link>
  );
}

export default BackButton;
