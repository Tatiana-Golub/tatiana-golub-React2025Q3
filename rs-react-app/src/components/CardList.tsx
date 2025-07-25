import Card from './Card';

export interface Breed {
  id: string;
  name: string;
  description: string;
}

export interface CardListProps {
  data: Breed[];
}

function CardList({ data: items }: CardListProps) {
  if (items.length === 0)
    return <p className="empty-search-message">Nothing in search.</p>;

  return (
    <div className="card-list">
      {items.map((item) => (
        <Card key={item.id} name={item.name} description={item.description} />
      ))}
    </div>
  );
}

export default CardList;
