import { useState } from 'react';

function SelectedCardCheckbox() {
  const [isSelected, setIsSelected] = useState(false);

  function handleClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setIsSelected(!isSelected);
  }

  return (
    <input
      type="checkbox"
      className="card-checkbox"
      checked={isSelected}
      onClick={handleClick}
      onChange={() => {}}
    />
  );
}

export default SelectedCardCheckbox;
