import CardList, { type Breed } from './CardList';

export interface MainSectionProps {
  pageNumber: string;
  error: string | null;
  filteredBreeds: Breed[];
}

function MainSection(props: MainSectionProps) {
  return props.error ? (
    <p className="error-message">Error: {props.error}</p>
  ) : (
    <CardList pageNumber={props.pageNumber} data={props.filteredBreeds} />
  );
}

export default MainSection;
