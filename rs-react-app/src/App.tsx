import './App.css';
import SearchBar from './components/SearchBar';
import CardList, { type Breed } from './components/CardList';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Pagination from './components/Pagination';

const API_URL = `https://api.thecatapi.com/v1/breeds`;
const API_KEY =
  'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l';
const LIMIT: number = 4;
const START_PAGE: number = 1;
const SEARCH_ITEM_KEY: string = 'searchItem';

function App() {
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_ITEM_KEY, '');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [page, setPage] = useState(START_PAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasBreeds = () => breeds.length > 0;

  const filterBreeds = (): Breed[] => {
    const fromIndex = (page - 1) * LIMIT;
    const toIndex = page * LIMIT - 1;
    return breeds.filter((_breed, index) => {
      if (index >= fromIndex && index <= toIndex) return true;
    });
  };

  const getTotalPageCount = useCallback(
    (): number => Math.ceil(breeds.length / LIMIT),
    [breeds]
  );

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = breeds ? getTotalPageCount() : current;

    setPage(next <= total ? next : current);
  }, [page, breeds, getTotalPageCount]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const fetchData = useCallback(
    (input: string) => {
      setSearchTerm(input);

      let url = '';
      if (input === '') url = API_URL;
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
          setBreeds(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setPage(START_PAGE);
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
          <CardList data={filterBreeds()} />
        )}
        {!loading && hasBreeds() && (
          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: page === 1,
              right: page === getTotalPageCount(),
            }}
            nav={{ current: page, total: getTotalPageCount() }}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
