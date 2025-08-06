import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  filterBreeds,
  getTotalPageCount,
  hasBreeds,
  parsePageNumber,
} from './helpers';
import { SEARCH_ITEM_KEY, START_PAGE } from './constants';
import type { Breed } from '../components/CardList/CardList';
import { fetchAll, fetchSearch } from '../api/API';
import ThemeSelector from '../components/ThemeSelector';
import AboutLink from '../components/AboutLink';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner/Spinner';
import ErrorBoundary from '../components/ErrorBoundary';
import MainSection from '../components/MainSection';
import Pagination from '../components/Pagination';
import FlyoutElement from '../components/FlyoutElement';
import styles from './App.module.css';
import { useLocalStorage } from '../hooks';

function App() {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_ITEM_KEY, '');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [page, setPage] = useState(parsePageNumber(pageNumber));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigateToPage = useCallback((page: number) => {
    setPage(page);
    navigate(`/catalog/${page}`);
  }, []);

  const handleNextPageClick = useCallback(() => {
    const next = page + 1;
    const total = breeds ? getTotalPageCount(breeds) : page;

    const newPage = next <= total ? next : page;
    navigateToPage(newPage);
  }, [page, breeds, navigateToPage]);

  const handlePrevPageClick = useCallback(() => {
    const prev = page - 1;

    const newPage = prev > 0 ? prev : page;
    navigateToPage(newPage);
  }, [navigateToPage, page]);

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
    [navigateToPage, setSearchTerm]
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [fetchData, searchTerm]);

  const totalPageCount = getTotalPageCount(breeds);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <ThemeSelector />
        <AboutLink />
      </div>
      <h1>Breeds Cat-alog</h1>
      <SearchBar input={searchTerm} onSearch={fetchData} />
      <Spinner loading={loading} />
      <ErrorBoundary>
        <MainSection
          pageNumber={pageNumber || '1'}
          error={error}
          filteredBreeds={filterBreeds(breeds, page)}
        />
        {!loading && hasBreeds(breeds) && (
          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: page === 1,
              right: page === totalPageCount,
            }}
            nav={{ current: page, total: totalPageCount }}
          />
        )}
        <FlyoutElement items={breeds} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
