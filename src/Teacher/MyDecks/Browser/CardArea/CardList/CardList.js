export default function CardList({cards, selectedCard, setSelectedCard}) {
  return (
    <section className="card-list">
      <ul>
        {cards.map((card) => (
          <li
            className={selectedCard === card ? "selected" : ""}
            key={card.id}
            onClick={() => setSelectedCard(card)}
          >
            {card.text}
          </li>
        ))}
      </ul>
    </section>
  );
}