import { Outlet } from 'react-router-dom';
import styles from './CardList.module.css';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';

function CardList({ pageNumber, data }: CardListProps) {
  if (data.length === 0)
    return <p className={styles.emptySearchMessage}>Nothing in search.</p>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardList}>
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            pageNumber={pageNumber}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default CardList;
