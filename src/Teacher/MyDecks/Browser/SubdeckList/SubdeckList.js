export default function DeckList({subdecks, selectedSubdeck, selectSubdeck}) {
  return (
    <section className="deck-list">
      <ul>
        {subdecks.map((deck) => (
          <li
            className={selectedSubdeck === deck.id ? "selected" : ""}
            key={deck.id}
            onClick={() => selectSubdeck(deck.id)}
          >
            {deck.title}
          </li>
        ))}
      </ul>
    </section>
  );
}