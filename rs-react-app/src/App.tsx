import './App.css';
import SearchBar from './components/SearchBar';
import CardList, { type Breed } from './components/CardList';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

const API_URL = `https://api.thecatapi.com/v1/breeds`;
const API_KEY =
  'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l';
const LIMIT: number = 5;
const SEARCH_ITEM_KEY: string = 'searchItem';

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_ITEM_KEY, '');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    (input: string) => {
      setSearchTerm(input);

      let url = '';
      if (input === '') url = `${API_URL}?limit=${LIMIT}&page=0`;
      else url = `${API_URL}/search?q=${input}`;

      setLoading(true);
      setError(null);

      fetch(url, {
        headers: {
          'x-api-key': API_KEY,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: Breed[]) => {
          const filtered = input
            ? data.filter((_breed, index) => {
                if (index < LIMIT) return true;
              })
            : data;
          setBreeds(filtered);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    },
    [setSearchTerm]
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  return (
    <div className="app">
      <h1>Breeds Cat-alog</h1>
      <SearchBar input={searchTerm} onSearch={fetchData} />
      <Spinner loading={loading} />
      <ErrorBoundary>
        {error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <CardList data={breeds} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
