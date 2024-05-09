import React, {useEffect, useState} from 'react';
import CardList from './CardList/CardList';
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
      <CardList
        cards={cards}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <EditPane card={selectedCard}/>
    </div>
  );
}
