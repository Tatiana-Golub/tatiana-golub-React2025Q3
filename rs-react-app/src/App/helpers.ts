import type { Breed } from '../components/CardList/CardList';
import { LIMIT } from './constants';

export const hasBreeds = (breeds: Breed[]) => breeds.length > 0;

export const parsePageNumber = (pageNumber: string | undefined) => {
  const page = Number(pageNumber);
  return page > 0 ? page : 1;
};

export const filterBreeds = (breeds: Breed[], page: number): Breed[] => {
  const fromIndex = (page - 1) * LIMIT;
  const toIndex = page * LIMIT - 1;
  return breeds.filter((_breed, index) => {
    return index >= fromIndex && index <= toIndex;
  });
};
export const getTotalPageCount = (breeds: Breed[]): number =>
  Math.ceil(breeds.length / LIMIT);
