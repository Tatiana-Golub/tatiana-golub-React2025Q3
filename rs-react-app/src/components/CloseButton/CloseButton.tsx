import styles from './CloseButton.module.css';

interface CloseButtonprops {
  onClick: () => void;
}

function CloseButton(props: CloseButtonprops) {
  return (
    <button className={styles.closeButton} onClick={props.onClick}>
      ✖
    </button>
  );
}

export default CloseButton;
