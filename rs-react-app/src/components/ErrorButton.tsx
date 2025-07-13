import { Component } from 'react';

class ErrorButton extends Component {
  state = {
    isClicked: false,
  };

  handleClick = () => {
    this.setState({
      isClicked: true,
    });
  };

  render() {
    if (this.state.isClicked === true) {
      throw new Error('Simulated error.');
    }
    return (
      <div>
        <button className="error-button" onClick={this.handleClick}>
          Error Button
        </button>
      </div>
    );
  }
}

export default ErrorButton;
