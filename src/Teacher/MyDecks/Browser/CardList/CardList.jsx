import React, {useEffect, useState} from 'react';
import EditPane from './EditPane/EditPane';
import "./CardList.scss";
import {rpc} from "../../../../rpc/rpc";

export default function CardList({subdeckId}) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    rpc("teach", "getCards", {id: subdeckId})
    .then((cards) => {
      setCards(cards)
      //Select the first card
      const firstCard = cards.find((card) => card.order === 0)
      firstCard && setSelectedCard(firstCard)
    })
  }, [subdeckId]);

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
