import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Card.module.css';
import type { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/cardSlice';
import SelectedCardCheckbox from '../SelectedCardCheckbox';

interface CardProps {
  id: string;
  pageNumber: string;
  name: string;
  description: string;
}

function Card({ id, pageNumber, name, description }: CardProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selectedItemsIds } = useSelector(
    (state: RootState) => state.selectedItems
  );

  function handleCardClick(): void {
    navigate(`/catalog/${pageNumber}/${id}`);
  }

  function onClickCheckbox(isChecked: boolean) {
    if (isChecked) {
      dispatch(selectItem(id));
    } else {
      dispatch(unselectItem(id));
    }
  }

  const isSelected = selectedItemsIds.includes(id);

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <SelectedCardCheckbox
          isSelected={isSelected}
          onClick={onClickCheckbox}
        />
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Card;
