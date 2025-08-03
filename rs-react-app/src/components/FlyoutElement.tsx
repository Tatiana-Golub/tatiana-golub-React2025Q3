import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { unselectAll } from '../redux/cardSlice';
import type { Breed } from './CardList';
import { convertToCSV } from '../utils/utils';

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
    <div className="flyout-element">
      <span className="selected-items-info">
        Item(s) selected: {selectedItemsCount}
      </span>
      <div className="flyout-buttons">
        <button className="flyout-button" onClick={onUnselectClick}>
          Unselect all
        </button>
        <a
          href={convertToCSV(selectedItemsIds, items)}
          download={`${selectedItemsCount}_items.csv`}
          className="flyout-button"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default FlyoutElement;
