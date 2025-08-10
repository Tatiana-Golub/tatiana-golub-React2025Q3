import { useNavigate, useParams } from 'react-router-dom';
import styles from './DetailsCard.module.css';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';
import { useFetchBreedQuery } from '../../store/api/Api';
import RefreshButton from '../RefreshButton';

function DetailsCard() {
  const navigate = useNavigate();
  const { id, pageNumber } = useParams();

  const { data, error, isFetching, refetch } = useFetchBreedQuery(id ?? '', {
    skip: !id,
  });

  const handleCloseButton = (): void => {
    navigate(`/catalog/${pageNumber}`);
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
      <div>
        <p className={styles.errorMessage}>Error loading breed details</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <p className={styles.errorMessage}>Breed not found</p>;
  }

  return (
    <div className={styles.detailsCard}>
      <CloseButton onClick={handleCloseButton} />
      <div className={styles.detailsContent}>
        <h3 className={styles.detailsTitle}>Breed Details: {data.name}</h3>
        <p>Temperament: {data.temperament}</p>
        <p>Origin: {data.origin}</p>
        <p>Lifespan: {data.life_span}</p>
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
