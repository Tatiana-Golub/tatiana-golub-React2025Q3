import { Component } from 'react';
import Card from './Card';

export interface Breed {
  id: string;
  name: string;
  description: string;
}

interface CardListProps {
  data: Breed[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { data: items } = this.props;
    return (
      <div className="card-list">
        {items.map((item) => (
          <Card key={item.id} name={item.name} description={item.description} />
        ))}
      </div>
    );
  }
}

export default CardList;
