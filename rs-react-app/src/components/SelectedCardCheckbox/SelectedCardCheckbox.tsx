import type { SelectedCardCheckboxProps } from '../../types';
import styles from './SelectedCardCheckbox.module.css';

function SelectedCardCheckbox({
  isSelected,
  onClick,
}: SelectedCardCheckboxProps) {
  function handleClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    onClick(!isSelected);
  }

  return (
    <input
      type="checkbox"
      className={styles.cardCheckbox}
      checked={isSelected}
      onClick={handleClick}
    />
  );
}

export default SelectedCardCheckbox;
