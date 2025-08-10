import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';
import { START_URL } from '../../constants';

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(START_URL);
  }

  return (
    <button className={styles.backButton} onClick={handleClick}>
      Back to Home
    </button>
  );
}

export default BackButton;
