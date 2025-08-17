import type { Breed } from '../types';
import { LIMIT } from '../constants';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (!error) return null;

  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return errMsg;
  }

  return error.message || null;
};
