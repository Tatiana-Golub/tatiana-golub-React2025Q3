import { useNavigate, useParams } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useEffect, useState } from 'react';
import { fetchBreed } from '../api/API';
import Spinner from './Spinner';

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
    return <p className="error-message">Error: {error}</p>;
  }

  if (!data) {
    return <p className="error-message">Breed not found</p>;
  }

  return (
    <div className="details-card">
      <CloseButton onClick={handleCloseButton} />
      <>
        <h3 className="details-title">Breed Details: {data.name}</h3>
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
