import { useParams, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./DeckStudy.scss";
import Card from "./Card/Card";
import StudyFinish from "./StudyFinish/StudyFinish";

export default function DeckStudy() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    getCards(deckId)
      .then((data) => {
        setCards(data.cards);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error.message);
      });
  }, []);

  return (
    <div className="deck-study">
      <NavLink to={`/student/my-decks`} className="inline-btn">
        Back to Deck List
      </NavLink>
      {cardIndex < cards.length ? (
        <Card
          card={cards[cardIndex]}
          showNextCard={() => setCardIndex(cardIndex + 1)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

const getCards = (deckId) => {
  const url = `http://localhost:4000/decks/${deckId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching decks:", error.message);
      throw error;
    });
};
