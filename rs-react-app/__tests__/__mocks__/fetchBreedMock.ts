import { mockBreedDetails } from './breedDetails.mock';

export const fetchBreedMock = (data = mockBreedDetails): Response =>
  ({
    ok: true,
    status: 200,
    json: async () => data,
  }) as Response;
