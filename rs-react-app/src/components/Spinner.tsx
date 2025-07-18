import { Component } from 'react';

interface SpinnerProps {
  loading: boolean;
}

class Spinner extends Component<SpinnerProps> {
  render() {
    if (!this.props.loading) return null;

    return (
      <div className="loader">
        <div className="inner-circle"></div>
      </div>
    );
  }
}

export default Spinner;
