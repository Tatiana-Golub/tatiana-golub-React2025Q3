import { useTranslations } from 'next-intl';
import BackButton from '../components/BackButton';
import styles from './not-found.module.css';

function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>{t('description')}</h1>
      <BackButton />
    </div>
  );
}

export default NotFound;
