import { Outlet } from 'react-router-dom';
import styles from './CardList.module.css';
import Card from '../Card/Card';

export interface Breed {
  id: string;
  name: string;
  description: string;
}

export interface CardListProps {
  pageNumber: string;
  data: Breed[];
}

function CardList(props: CardListProps) {
  if (props.data.length === 0)
    return <p className={styles.emptySearchMessage}>Nothing in search.</p>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardList}>
        {props.data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            pageNumber={props.pageNumber}
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
