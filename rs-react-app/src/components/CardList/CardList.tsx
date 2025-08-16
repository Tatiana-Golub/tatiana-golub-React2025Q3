import { Outlet } from 'react-router-dom';
import styles from './CardList.module.css';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';
import { useTranslations } from 'next-intl';

function CardList({ pageNumber, data }: CardListProps) {
  const t = useTranslations('CardList');

  if (data.length === 0)
    return <p className={styles.emptySearchMessage}>{t('error')}</p>;

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
