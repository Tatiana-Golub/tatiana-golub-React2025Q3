import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './DetailsCard.module.css';
import { fetchBreed } from '../../api';
import CloseButton from '../CloseButton';
import Spinner from '../Spinner';
import type { DetailsCardProps } from '../../types';

function DetailsCard() {
  const navigate = useNavigate();
  const { id, pageNumber } = useParams();
  const [data, setData] = useState<DetailsCardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCloseButton = (): void => {
    navigate(`/catalog/${pageNumber}`);
  };

  const fetchData = (id: string) => {
    setLoading(true);
    setError(null);

    fetchBreed(id)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: DetailsCardProps) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  if (!id) return null;

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Spinner loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  if (!data) {
    return <p className={styles.errorMessage}>Breed not found</p>;
  }

  return (
    <div className={styles.detailsCard}>
      <CloseButton onClick={handleCloseButton} />
      <>
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
      </>
    </div>
  );
}

export default DetailsCard;
