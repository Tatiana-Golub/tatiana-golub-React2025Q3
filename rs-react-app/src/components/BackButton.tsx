import { useNavigate } from 'react-router-dom';
import { START_URL } from '../constants.tsx';

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(START_URL);
  }

  return (
    <button className="back-button" onClick={handleClick}>
      Back to Home
    </button>
  );
}

export default BackButton;
