import styles from './Pagination.module.css';

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

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
