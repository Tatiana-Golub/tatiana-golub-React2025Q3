import type { MainSectionProps } from '../../types';
import CardList from '../CardList/CardList';
import styles from './MainSection.module.css';

function MainSection({ pageNumber, error, filteredBreeds }: MainSectionProps) {
  return error ? (
    <p className={styles.errorMessage}>Error: {error}</p>
  ) : (
    <CardList pageNumber={pageNumber} data={filteredBreeds} />
  );
}

export default MainSection;
