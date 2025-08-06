import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './DetailsCard.module.css';
import { fetchBreed } from '../../api';
import Spinner from '../Spinner/Spinner';
import CloseButton from '../CloseButton';

interface DetailedCardProps {
  name: string;
  temperament: string;
  origin: string;
  life_span: string;
  wikipedia_url: string;
}

function DetailsCard() {
  const navigate = useNavigate();
  const { id, pageNumber } = useParams();
  const [data, setData] = useState<DetailedCardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCloseButton = (): void => {
    navigate(`/catalog/${pageNumber}`);
  }

  const fetchData = (id: string) => {
    setLoading(true);
    setError(null);

    fetchBreed(id)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: DetailedCardProps) => {
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
    return <Spinner loading={loading} />;
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
