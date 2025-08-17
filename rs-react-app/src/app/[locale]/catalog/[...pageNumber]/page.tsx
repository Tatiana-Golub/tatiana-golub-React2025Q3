import { START_PAGE } from '../../../../constants';
import { Breed } from '../../../../types';
import CatalogPageContent from './catalog-page-content';

async function getInitialBreeds(): Promise<Breed[]> {
  const result = await fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key':
        'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l',
    },
  });

  if (!result.ok) {
    throw new Error('Failed to fetch breeds');
  }

  return result.json();
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ pageNumber: string[] }>;
  searchParams: Promise<{ search?: string }>;
}) {
  const { pageNumber } = await params;
  const { search } = await searchParams;

  let initialBreeds;
  try {
    initialBreeds = await getInitialBreeds();
  } catch {
    initialBreeds = new Array<Breed>();
  }

  return (
    <CatalogPageContent
      initialBreeds={initialBreeds}
      initialSearchTerm={search ?? ''}
      initialPage={Number(pageNumber[0]) || START_PAGE}
    />
  );
}
