import { Component } from 'react';

class Spinner extends Component<never> {
  render() {
    return (
      <div className="loader">
        <div className="inner-circle"></div>
      </div>
    );
  }
}

export default Spinner;
