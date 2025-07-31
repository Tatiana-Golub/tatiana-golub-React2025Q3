import './App.css';
import SearchBar from '../components/SearchBar';
import CardList, { type Breed } from '../components/CardList';
import Spinner from '../components/Spinner';
import ErrorBoundary from '../components/ErrorBoundary';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Pagination from '../components/Pagination';
import AboutLink from '../components/AboutLink';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAll, fetchSearch } from '../api/API';
import { hasBreeds, parsePageNumber } from './helpers';
import MainSection from '../components/MainSection';

const LIMIT: number = 4;
const START_PAGE: number = 1;
const SEARCH_ITEM_KEY: string = 'searchItem';

function App() {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_ITEM_KEY, '');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [page, setPage] = useState(parsePageNumber(pageNumber));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigateToPage = (page: number) => {
    setPage(page);
    navigate(`/catalog/${page}`);
  };

  const filterBreeds = (): Breed[] => {
    const fromIndex = (page - 1) * LIMIT;
    const toIndex = page * LIMIT - 1;
    return breeds.filter((_breed, index) => {
      return index >= fromIndex && index <= toIndex;
    });
  };

  const getTotalPageCount = useCallback(
    (): number => Math.ceil(breeds.length / LIMIT),
    [breeds]
  );

  const handleNextPageClick = useCallback(() => {
    const next = page + 1;
    const total = breeds ? getTotalPageCount() : page;

    navigateToPage(next <= total ? next : page);
  }, [page, breeds, getTotalPageCount]);

  const handlePrevPageClick = useCallback(() => {
    const prev = page - 1;

    navigateToPage(prev > 0 ? prev : page);
  }, [page]);

  const fetchData = useCallback(
    (input: string) => {
      setSearchTerm(input);

      const responce = input === '' ? fetchAll() : fetchSearch(input);

      setLoading(true);
      setError(null);

      responce
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
          navigateToPage(START_PAGE);
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
      <AboutLink />
      <h1>Breeds Cat-alog</h1>
      <SearchBar input={searchTerm} onSearch={fetchData} />
      <Spinner loading={loading} />
      <ErrorBoundary>
        <MainSection
          pageNumber={pageNumber || '1'}
          error={error}
          filteredBreeds={filterBreeds()}
        />
        {!loading && hasBreeds(breeds) && (
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
