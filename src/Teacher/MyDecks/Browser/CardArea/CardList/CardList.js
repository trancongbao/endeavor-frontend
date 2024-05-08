export default function CardList({cards, selectedCardId, setSelectedCardId}) {
  return (
    <section className="card-list">
      <ul>
        {cards.map((card) => (
          <li
            className={selectedCardId === card.id ? "selected" : ""}
            key={card.id}
            onClick={() => setSelectedCardId(card.id)}
          >
            {card.text}
          </li>
        ))}
      </ul>
    </section>
  );
}