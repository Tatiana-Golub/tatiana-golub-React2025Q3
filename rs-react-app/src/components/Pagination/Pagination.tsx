'use client';

import { useTranslations } from 'next-intl';
import type { PaginationProps } from '../../types';
import styles from './Pagination.module.css';

function Pagination({
  onNextPageClick,
  onPrevPageClick,
  disable,
  nav,
}: PaginationProps) {
  const t = useTranslations('Pagination');

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        type="button"
        onClick={onPrevPageClick}
        disabled={disable.left}
      >
        {t('back')}
      </button>
      {nav && (
        <span className={styles.pageNumber}>
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={styles.paginationButton}
        type="button"
        onClick={onNextPageClick}
        disabled={disable.right}
      >
        {t('forward')}
      </button>
    </div>
  );
}

export default Pagination;
