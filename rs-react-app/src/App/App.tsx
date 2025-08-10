import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  filterBreeds,
  getTotalPageCount,
  hasBreeds,
  parsePageNumber,
} from './helpers';
import { SEARCH_ITEM_KEY, START_PAGE } from './constants';
import ThemeSelector from '../components/ThemeSelector';
import AboutLink from '../components/AboutLink';
import SearchBar from '../components/SearchBar';
import ErrorBoundary from '../components/ErrorBoundary';
import MainSection from '../components/MainSection';
import Pagination from '../components/Pagination';
import FlyoutElement from '../components/FlyoutElement';
import styles from './App.module.css';
import { useLocalStorage } from '../hooks';
import Spinner from '../components/Spinner';
import type { Breed } from '../types';
import { useFetchAllQuery, useFetchSearchQuery } from '../store/api/Api';
import RefreshButton from '../components/RefreshButton/RefreshButton';

function App() {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(SEARCH_ITEM_KEY, '');
  const [page, setPage] = useState(parsePageNumber(pageNumber));

  const {
    data: allBreeds,
    error: allError,
    isFetching: allLoading,
    refetch: refetchAll,
  } = useFetchAllQuery('', { skip: searchTerm !== '' });

  const {
    data: searchedBreeds,
    error: searchError,
    isFetching: searchLoading,
    refetch: refetchSearch,
  } = useFetchSearchQuery(searchTerm, { skip: searchTerm === '' });

  const breeds: Breed[] = useMemo(
    () => (searchTerm === '' ? (allBreeds ?? []) : (searchedBreeds ?? [])),
    [searchTerm, allBreeds, searchedBreeds]
  );

  const loading = allLoading || searchLoading;
  const error = allError || searchError;

  const handleSearch = (input: string) => {
    setSearchTerm(input);
    navigateToPage(START_PAGE);
  };

  const handleRefresh = () => {
    if (searchTerm === '') {
      refetchAll();
    } else {
      refetchSearch();
    }
  };

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

  const totalPageCount = getTotalPageCount(breeds);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <ThemeSelector />
        <AboutLink />
      </div>
      <h1>Breeds Cat-alog</h1>
      <SearchBar input={searchTerm} onSearch={handleSearch} />
      <RefreshButton onClick={handleRefresh} />
      <Spinner loading={loading} />
      <ErrorBoundary>
        <MainSection
          pageNumber={pageNumber || '1'}
          error={error ? String(error) : null}
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
