import { useNavigate } from 'react-router-dom';
import SelectedCardCheckbox from './SelectedCardCheckbox';

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
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
        <SelectedCardCheckbox />
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Card;
