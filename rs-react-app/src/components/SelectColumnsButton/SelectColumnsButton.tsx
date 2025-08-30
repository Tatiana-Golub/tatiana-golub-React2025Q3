import './SelectColumnsButton.css';

interface ButtonProps {
  onClick: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

export const SelectColumnsButton = ({ onClick, buttonRef }: ButtonProps) => {
  return (
    <button ref={buttonRef} className="btn" onClick={onClick}>
      Select Columns
    </button>
  );
};
