import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props;
    return (
      <div className="card">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

export default Card;
