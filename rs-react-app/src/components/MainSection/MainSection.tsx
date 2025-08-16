import { useTranslations } from 'next-intl';
import type { MainSectionProps } from '../../types';
import CardList from '../CardList/CardList';
import styles from './MainSection.module.css';

function MainSection({ pageNumber, error, filteredBreeds }: MainSectionProps) {
  const t = useTranslations('MainSection');
  return error ? (
    <p className={styles.errorMessage}>
      {t('error')}: {error}
    </p>
  ) : (
    <CardList pageNumber={pageNumber} data={filteredBreeds} />
  );
}

export default MainSection;
