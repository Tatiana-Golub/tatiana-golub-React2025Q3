import type { SelectedCardCheckboxProps } from '../../types';
import styles from './SelectedCardCheckbox.module.css';

function SelectedCardCheckbox({
  isSelected,
  onClick,
}: SelectedCardCheckboxProps) {
  function handleClick(e: { stopPropagation: () => void }) {
    onClick(!isSelected);
  }

  return (
    <input
      type="checkbox"
      className={styles.cardCheckbox}
      checked={isSelected}
      onChange={handleClick}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

export default SelectedCardCheckbox;
