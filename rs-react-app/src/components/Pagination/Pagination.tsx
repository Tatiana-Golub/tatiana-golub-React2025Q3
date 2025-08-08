import type { PaginationProps } from '../../types';
import styles from './Pagination.module.css';

const Pagination = ({
  onNextPageClick,
  onPrevPageClick,
  disable,
  nav,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        type="button"
        onClick={onPrevPageClick}
        disabled={disable.left}
      >
        Prev
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
        Next
      </button>
    </div>
  );
};

export default Pagination;
