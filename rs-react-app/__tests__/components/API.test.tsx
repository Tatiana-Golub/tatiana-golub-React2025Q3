import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAll } from '../../src/api/API';

const API_URL = 'https://api.thecatapi.com/v1/breeds';

describe('API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('call fetchAll with correct URL', async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }));

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    await fetchAll();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-api-key': expect.any(String),
        }),
      })
    );
  });
});
