import { useTranslations } from 'next-intl';
import type { RefreshButtonprops } from '../../types';
import styles from './RefreshButton.module.css';

function RefreshButton({ onClick }: RefreshButtonprops) {
  const t = useTranslations('RefreshButton');

  return (
    <button className={styles.refreshButton} onClick={onClick}>
      {t('title')}
    </button>
  );
}

export default RefreshButton;
