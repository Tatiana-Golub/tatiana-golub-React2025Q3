interface SpinnerProps {
  loading: boolean;
}

function Spinner(props: SpinnerProps) {
  if (!props.loading) {
    return null;
  }

  return (
    <div className="loader">
      <div className="inner-circle"></div>
    </div>
  );
}

export default Spinner;
