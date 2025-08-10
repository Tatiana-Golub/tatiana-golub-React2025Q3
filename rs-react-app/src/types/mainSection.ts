import type { Breed } from './cardList';

export interface MainSectionProps {
  pageNumber: string;
  error: string | null;
  filteredBreeds: Breed[];
}
