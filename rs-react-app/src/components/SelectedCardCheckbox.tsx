interface Props {
  isSelected: boolean;
  onClick: (isChecked: boolean) => void;
}

function SelectedCardCheckbox(props: Props) {
  function handleClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    props.onClick(!props.isSelected);
  }

  return (
    <input
      type="checkbox"
      className="card-checkbox"
      checked={props.isSelected}
      onClick={handleClick}
      onChange={() => {}}
    />
  );
}

export default SelectedCardCheckbox;
