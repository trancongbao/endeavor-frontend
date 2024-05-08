export default function CardList({cards, selectedCard, setSelectedCard}) {
  return (
    <section className="card-list">
      <ul>
        {cards.map((card) => (
          <li
            className={selectedCard === card.id ? "selected" : ""}
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
          >
            {card.text}
          </li>
        ))}
      </ul>
    </section>
  );
}