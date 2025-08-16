'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Breed } from '../../../../types';
import { useLocalStorage } from '../../../../hooks';
import {
  useFetchAllQuery,
  useFetchSearchQuery,
} from '../../../../store/api/Api';
import { START_PAGE } from '../../../../constants';
import {
  filterBreeds,
  getErrorMessage,
  getTotalPageCount,
  hasBreeds,
} from '../../../../utils/helpers';
import ThemeSelector from '../../../../components/ThemeSelector';
import AboutLink from '../../../../components/AboutLink';
import SearchBar from '../../../../components/SearchBar';
import FlyoutElement from '../../../../components/FlyoutElement';
import MainSection from '../../../../components/MainSection';
import Pagination from '../../../../components/Pagination';
import RefreshButton from '../../../../components/RefreshButton';
import Spinner from './loading';
import ErrorBoundary from '../../../../components/ErrorBoundary';
import styles from './catalog-page-content.module.css';
import LocaleSwitcher from '../../../../components/LocaleSwitcher/LocaleSwitcher';
import { useTranslations } from 'next-intl';

interface Props {
  initialBreeds: Breed[];
  initialSearchTerm: string;
  initialPage: number;
}

export default function CatalogPageContent({
  initialBreeds,
  initialSearchTerm,
  initialPage,
}: Props) {
  const t = useTranslations('Catalog');
  const router = useRouter();
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const [searchTerm, setSearchTerm] = useLocalStorage(
    'search',
    initialSearchTerm
  );
  const [page, setPage] = useState(initialPage);

  const {
    data: allBreeds,
    error: allError,
    isFetching: allLoading,
    refetch: refetchAll,
  } = useFetchAllQuery('', {
    skip: searchTerm !== '',
  });

  const {
    data: searchedBreeds,
    error: searchError,
    isFetching: searchLoading,
    refetch: refetchSearch,
  } = useFetchSearchQuery(searchTerm, {
    skip: searchTerm === '',
  });

  const breeds: Breed[] = useMemo(() => {
    if (searchTerm === '') {
      return allBreeds ?? initialBreeds ?? [];
    }
    return searchedBreeds ?? [];
  }, [searchTerm, allBreeds, searchedBreeds, initialBreeds]);

  const loading = allLoading || searchLoading;
  const error = allError || searchError;

  const navigateToPage = useCallback(
    (page: number) => {
      setPage(page);
      router.push(`/catalog/${page}?search=${encodeURIComponent(searchTerm)}`);
    },
    [router, searchTerm]
  );

  const handleSearch = (input: string) => {
    setSearchTerm(input);
    navigateToPage(START_PAGE);
  };

  const handleRefresh = () => {
    if (searchTerm === '') refetchAll();
    else refetchSearch();
  };

  const handleNextPageClick = () => {
    const next = page + 1;
    const total = getTotalPageCount(breeds);
    navigateToPage(next <= total ? next : page);
  };

  const handlePrevPageClick = () => {
    const prev = page - 1;
    navigateToPage(prev > 0 ? prev : page);
  };

  const totalPageCount = getTotalPageCount(breeds);

  return (
    <div className={styles.app}>
      <LocaleSwitcher />
      <div className={styles.header}>
        <ThemeSelector />
        <AboutLink />
      </div>
      <h1 className={styles.heading}>{t('heading')}</h1>
      <SearchBar input={searchTerm} onSearch={handleSearch} />
      <RefreshButton onClick={handleRefresh} />
      <Spinner loading={loading} />
      <ErrorBoundary errorText={useTranslations('ErrorBoundary')('message')}>
        <MainSection
          pageNumber={pageNumber || '1'}
          error={getErrorMessage(error)}
          filteredBreeds={filterBreeds(breeds, page)}
        />
        {!loading && !error && hasBreeds(breeds) && (
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
