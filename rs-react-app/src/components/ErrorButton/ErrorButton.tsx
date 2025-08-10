import { useState } from 'react';
import styles from './ErrorButton.module.css';

function ErrorButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  if (isClicked === true) {
    throw new Error('Simulated error.');
  }

  return (
    <div>
      <button className={styles.errorButton} onClick={handleClick}>
        Error Button
      </button>
    </div>
  );
}

export default ErrorButton;
