import { http, HttpResponse } from 'msw';
import { mockBreedDetails } from '../breedDetails.mock';

export const API_URL = 'https://api.thecatapi.com/v1/breeds';

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json([
      { id: 'abys', name: 'Abyssinian' },
      { id: 'siam', name: 'Siamese' },
    ]);
  }),

  http.get(`${API_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    return HttpResponse.json([{ id: 'siam', name: `Search result for ${q}` }]);
  }),

  http.get(`${API_URL}/:id`, ({ params }) => {
    if (params.id === 'abys') {
      return HttpResponse.json(mockBreedDetails);
    }
    return new Response(null, { status: 404 });
  }),
];
