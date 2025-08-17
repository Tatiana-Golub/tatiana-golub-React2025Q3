'use client';

import styles from './DetailsCard.module.css';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';
import { useFetchBreedQuery } from '../../store/api/Api';
import RefreshButton from '../RefreshButton';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface DetailsPageProps {
  id: string;
  pageNumber: string;
}

function DetailsCard({ id, pageNumber }: DetailsPageProps) {
  const t = useTranslations('DetailsCard');
  const router = useRouter();

  const { data, error, isFetching, refetch } = useFetchBreedQuery(id ?? '', {
    skip: !id,
  });

  const handleCloseButton = (): void => {
    router.push(`/catalog/${pageNumber}`);
  };

  const handleRefreshButton = (): void => {
    refetch();
  };

  if (!id) return null;

  if (isFetching) {
    return (
      <div className={styles.loaderWrapper}>
        <Spinner loading={isFetching} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{t('error')}</p>
        <RefreshButton onClick={handleRefreshButton} />
      </div>
    );
  }

  if (!data) {
    return <p className={styles.errorMessage}>{t('message')}</p>;
  }

  return (
    <div className={styles.detailsCard}>
      <CloseButton onClick={handleCloseButton} />
      <div className={styles.detailsContent}>
        <h3 className={styles.detailsTitle}>
          {t('title')}: {data.name}
        </h3>
        <p>
          {t('temperament')}: {data.temperament}
        </p>
        <p>
          {t('origin')}: {data.origin}
        </p>
        <p>
          {t('lifespan')}: {data.life_span}
        </p>
        <p>
          Wikipedia:{' '}
          <a href={data.wikipedia_url} target="_blank" rel="noreferrer">
            {data.wikipedia_url}
          </a>
        </p>
      </div>
      <RefreshButton onClick={handleRefreshButton} />
    </div>
  );
}

export default DetailsCard;
