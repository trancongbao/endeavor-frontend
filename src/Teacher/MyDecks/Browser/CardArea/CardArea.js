import React from 'react';
import CardList from './CardList/CardList';
import EditPane from './EditPane/EditPane';
import "./CardArea.scss";

export default function CardArea({ cards, selectedCard, setSelectedCard }) {
  return (
    <div className="card-area">
      <CardList
        cards={cards}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <EditPane />
    </div>
  );
}
