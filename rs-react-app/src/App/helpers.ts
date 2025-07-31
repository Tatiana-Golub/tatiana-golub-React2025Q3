import type { Breed } from '../components/CardList';

export const hasBreeds = (breeds: Breed[]) => breeds.length > 0;

export const parsePageNumber = (pageNumber: string | undefined) => {
  const page = Number(pageNumber);
  return page > 0 ? page : 1;
};

