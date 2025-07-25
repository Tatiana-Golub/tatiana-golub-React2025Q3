interface CardProps {
  name: string;
  description: string;
}

function Card({ name, description }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
