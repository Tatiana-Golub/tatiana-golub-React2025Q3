import { useDispatch, useSelector } from 'react-redux';
import styles from './FlyoutElement.module.css';
import type { Breed } from '../CardList/CardList';
import { unselectAll } from '../../redux/cardSlice';
import { convertToCSV } from '../../utils/utils';
import type { RootState } from '../../redux/store';

interface Props {
  items: Breed[];
}

function FlyoutElement({ items }: Props) {
  const dispatch = useDispatch();
  const { selectedItemsIds } = useSelector(
    (state: RootState) => state.selectedItems
  );

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
