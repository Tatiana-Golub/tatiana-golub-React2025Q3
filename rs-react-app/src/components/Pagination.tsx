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
    <div className="pagination">
      <button
        className="pagination-button"
        type="button"
        onClick={onPrevPageClick}
        disabled={disable.left}
      >
        Prev
      </button>
      {nav && (
        <span className="page-number">
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className="pagination-button"
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
