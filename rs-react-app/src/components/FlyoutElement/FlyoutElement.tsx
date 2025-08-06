import { useDispatch, useSelector } from 'react-redux';
import styles from './FlyoutElement.module.css';
import type { Breed } from '../CardList/CardList';
import {
  selectSelectedItemsIds,
  unselectAll,
} from '../../store/slices/cardSlice';
import { convertToCSV } from '../../utils/utils';

interface Props {
  items: Breed[];
}

function FlyoutElement({ items }: Props) {
  const dispatch = useDispatch();
  const selectedItemsIds = useSelector(selectSelectedItemsIds);

  function onUnselectClick() {
    dispatch(unselectAll());
  }

  const selectedItemsCount = selectedItemsIds.length;

  if (selectedItemsCount === 0) return null;

  return (
    <div className={styles.flyoutElement}>
      <span className={styles.selectedItemsInfo}>
        Item(s) selected: {selectedItemsCount}
      </span>
      <div className={styles.flyoutButtons}>
        <button className={styles.flyoutButton} onClick={onUnselectClick}>
          Unselect all
        </button>
        <a
          href={convertToCSV(selectedItemsIds, items)}
          download={`${selectedItemsCount}_items.csv`}
          className={`${styles.flyoutButton} ${styles.downloadButton}`}
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default FlyoutElement;
