import { useNavigate } from 'react-router-dom';

interface CardProps {
  id: string;
  pageNumber: string;
  name: string;
  description: string;
}

function Card({ id, pageNumber, name, description }: CardProps) {
  const navigate = useNavigate();

  function handleCardClick(): void {
    navigate(`/catalog/${pageNumber}/${id}`);
  }

  return (
    <div className="card" onClick={handleCardClick}>
      <h3 className="card-title">{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
