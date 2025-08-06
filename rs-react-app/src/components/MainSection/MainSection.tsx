import type { Breed } from '../CardList/CardList';
import CardList from '../CardList/CardList';
import styles from './MainSection.module.css';

export interface MainSectionProps {
  pageNumber: string;
  error: string | null;
  filteredBreeds: Breed[];
}

function MainSection(props: MainSectionProps) {
  return props.error ? (
    <p className={styles.errorMessage}>Error: {props.error}</p>
  ) : (
    <CardList pageNumber={props.pageNumber} data={props.filteredBreeds} />
  );
}

export default MainSection;
