function FlyoutElement() {
  return (
    <div className="flyout-element">
      <span className="selected-items-info">Item(s) selected: {1}</span>
      <div className="flyout-buttons">
        <button className="flyout-button" onClick={() => console.debug(true)}>
          Unselect all
        </button>
        <button className="flyout-button" onClick={() => console.debug(true)}>
          Download
        </button>
      </div>
    </div>
  );
}

export default FlyoutElement;
