interface CloseButtonprops {
  onClick: () => void;
}

function CloseButton(props: CloseButtonprops) {
  return (
    <button className="close-button" onClick={props.onClick}>
      ✖
    </button>
  );
}

export default CloseButton;
