import { useNavigate } from 'react-router-dom';
import { START_URL } from '../constants.ts';

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(START_URL);
  }

  return (
    <div>
      <button className="back-button" onClick={handleClick}>
        Back to Home
      </button>
    </div>
  );
}

export default BackButton;
