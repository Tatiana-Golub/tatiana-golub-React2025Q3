export interface Breed {
  id: string;
  name: string;
  description: string;
}

export interface CardListProps {
  pageNumber: string;
  data: Breed[];
}
