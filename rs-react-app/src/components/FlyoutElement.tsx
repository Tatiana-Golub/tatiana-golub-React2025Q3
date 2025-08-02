import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { unselectAll } from '../redux/cardSlice';

function FlyoutElement() {
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
        <button className="flyout-button" onClick={() => console.debug(true)}>
          Download
        </button>
      </div>
    </div>
  );
}

export default FlyoutElement;
