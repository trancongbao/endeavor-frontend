import React, {useEffect, useState} from 'react';
import Card from './Card/Card';
import "./CardList.scss";
import {rpc} from "../../../../rpc/rpc";

export default function CardList({selectedSubdeck}) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    rpc("teach", "getCards", {id: selectedSubdeck.id})
    .then((cards) => {
      setCards(cards)
      //Select the first card
      const firstCard = cards.find((card) => card.order === 0)
      firstCard && setSelectedCard(firstCard)
    })
  }, [])

  return (
    <div className="card-area">
      <section className="card-list">
        <ul>
          {cards.map((card) => (
            <li
              className={card === selectedCard ? "selected" : ""}
              key={card.id}
              onClick={() => setSelectedCard(card)}
            >
              {card.text}
            </li>
          ))}
        </ul>
      </section>

      <Card card={selectedCard}/>
    </div>
  );
}
