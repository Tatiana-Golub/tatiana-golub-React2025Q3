import { useState } from 'react';

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
      <button className="error-button" onClick={handleClick}>
        Error Button
      </button>
    </div>
  );
}

export default ErrorButton;
