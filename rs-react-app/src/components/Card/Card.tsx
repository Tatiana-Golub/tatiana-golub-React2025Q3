import { useDispatch, useSelector } from 'react-redux';
import styles from './Card.module.css';
import {
  selectItem,
  selectSelectedItemsIds,
  unselectItem,
} from '../../store/slices/cardSlice';
import SelectedCardCheckbox from '../SelectedCardCheckbox';
import type { CardProps } from '../../types';
import Link from 'next/link';

function Card({ id, pageNumber, name, description, locale }: CardProps) {
  const dispatch = useDispatch();
  const selectedItemsIds = useSelector(selectSelectedItemsIds);

  function onClickCheckbox(isChecked: boolean) {
    if (isChecked) {
      dispatch(selectItem(id));
    } else {
      dispatch(unselectItem(id));
    }
  }

  const isSelected = selectedItemsIds.includes(id);

  return (
    <Link
      href={`/${locale}/catalog/${pageNumber}/${id}`}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <SelectedCardCheckbox
          isSelected={isSelected}
          onClick={onClickCheckbox}
        />
      </div>
      <p>{description}</p>
    </Link>
  );
}

export default Card;
