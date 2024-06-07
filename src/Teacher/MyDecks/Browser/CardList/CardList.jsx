import React, { useEffect, useState } from 'react';
import Card from './Card/Card';
import './CardList.scss';
import { rpc } from '../../../../rpc/rpc';
import { boldNewWord } from '../../../../Common/Utils';
import lodash from 'lodash';

export default function CardList({ deckId, selectedSubdeck }) {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    rpc('teach', 'getCards', {
      courseId: 1,
      lessonId: selectedSubdeck.id,
    }).then((rows) => {
      console.log(JSON.stringify(rows));
      const cards = lodash.groupBy(rows, 'card_order');
      console.log('grouped: ', cards);
      setCards(cards);
      //Select the first card
      const minCardOrder = lodash.min(Object.keys(cards).map(Number));
      console.log("minCardOrder", minCardOrder)
      const firstCard = cards[minCardOrder]
      console.log("firstCard", firstCard)
      firstCard && setSelectedCard(firstCard);
    });
  }, []);

  return (
    <div className="card-area">
      <section className="card-list">
        <button className="inline-btn add-card-btn">Add Card</button>
        <ul>
          {cards.map((card) => (
            <li
              className={card === selectedCard ? 'selected' : ''}
              key={card.id}
              onClick={() => setSelectedCard(card)}
              dangerouslySetInnerHTML={{ __html: boldNewWord(card.text) }}
            ></li>
          ))}
        </ul>
      </section>
      <Card card={selectedCard} />
    </div>
  );
}
