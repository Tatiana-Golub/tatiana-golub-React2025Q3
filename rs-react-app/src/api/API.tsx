const API_URL = `https://api.thecatapi.com/v1/breeds`;
const API_KEY =
  'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l';

export async function fetchAll() {
  return fetch(API_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
}

export async function fetchSearch(searchTerm: string) {
  return fetch(`${API_URL}/search?q=${searchTerm}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
}

export async function fetchBreed(id: string) {
  return fetch(`${API_URL}/${id}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
}
