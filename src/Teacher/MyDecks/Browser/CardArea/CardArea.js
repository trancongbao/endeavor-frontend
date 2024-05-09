import React, {useEffect, useState} from 'react';
import EditPane from './EditPane/EditPane';
import "./CardArea.scss";

export default function CardArea({cards}) {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    //Select the first card
    const firstCard = cards.find((card) => card.order === 0)
    firstCard && setSelectedCard(firstCard)
  }, [cards]);

  return (
    <div className="card-area">
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

      <EditPane card={selectedCard}/>
    </div>
  );
}
