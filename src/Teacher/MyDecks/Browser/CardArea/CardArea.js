import React, {useEffect, useState} from 'react';
import CardList from './CardList/CardList';
import EditPane from './EditPane/EditPane';
import "./CardArea.scss";

export default function CardArea({cards}) {
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    //Select the first card
    const firstCard = cards.find((card) => card.order === 0)
    firstCard && setSelectedCardId(firstCard.id)
  }, [cards]);

  return (
    <div className="card-area">
      <CardList
        cards={cards}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
      />
      <EditPane card={cards[selectedCardId]}/>
    </div>
  );
}
