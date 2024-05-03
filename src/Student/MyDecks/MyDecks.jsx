import React, { useEffect, useState } from "react";
import "./MyDecks.scss";
import DeckTile from "./DeckTile/DeckTile";

export default function MyDecks() {
  const [myDecks, setMyDecks] = useState([]);

  useEffect(() => {
    getMyDecks()
      .then((data) => {
        setMyDecks(data);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error.message);
      });
  }, []);

  return (
    <div className="my-decks-grid-container">
      {myDecks.map((deck) => (
        <DeckTile key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

const getMyDecks = () => {
  const url = 'http://localhost:4000/myDecks';

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching decks:', error.message);
      throw error;
    });
};
