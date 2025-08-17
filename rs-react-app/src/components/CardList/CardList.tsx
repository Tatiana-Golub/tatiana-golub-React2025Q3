import styles from './CardList.module.css';
import Card from '../Card/Card';
import type { CardListProps } from '../../types';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import DetailsCard from '../DetailsCard';
import { useEffect, useState } from 'react';

function CardList({ data }: CardListProps) {
  const [hydrated, setHydrated] = useState(false);
  const t = useTranslations('CardList');
  const { locale, pageNumber } = useParams<{
    locale: string;
    pageNumber: string[];
  }>();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [page, id] = pageNumber;

  if (!hydrated) {
    return <div className={styles.mainContainer}></div>;
  }

  if (data.length === 0)
    return <p className={styles.emptySearchMessage}>{t('error')}</p>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardList}>
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            pageNumber={pageNumber[0]}
            locale={locale}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
      {id && <DetailsCard pageNumber={page} id={id} />}
    </div>
  );
}

export default CardList;
