import {useEffect, useState} from "react";
import "./Browser.scss";
import {useParams} from "react-router-dom";

export default function Browser() {
  const {deckId} = useParams();
  const [deckList, setDeckList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [selectedSubDeck, setSelectedSubDeck] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getDeck()
      .then((data) => {
        setDeckList(data.subDecks);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error.message);
      });
  }, []);

  const getDeck = () => {
    const url = "http://localhost:4000/myDecks/" + deckId;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching decks:", error.message);
        throw error;
      });
  };

  const getCardList = (event, id) => {
    event.preventDefault();
    setSelectedSubDeck(id);
    const url = "http://localhost:4000/subdecks/" + id;
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Network response was not ok");
          setCardList([]);
        }
        return response.json();
      })
      .then((data) => {
        setCardList(data.cards);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error.message);
        throw error;
      });
  };

  const getCardDetail = (event, id) => {
    event.preventDefault();
    setSelectedCard(id);
  };

  return (
    <div className="edit-container">
      <section className="deck-list">
        <ul>
          {deckList.map((deck) => (
            <li
              className={selectedSubDeck === deck.id ? "selected" : ""}
              key={deck.id}
              onClick={(event) => getCardList(event, deck.id)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
      </section>
      <section className="card-list">
        <ul>
          {cardList.map((card) => (
            <li
              className={selectedCard === card.id ? "selected" : ""}
              key={card.id}
              onClick={(event) => getCardDetail(event, card.id)}
            >
              {card.front.text}
            </li>
          ))}
        </ul>
      </section>
      {selectedCard ? (
        <section className="edit-place">
          <div className="front-section">
            <h1>FRONT</h1>
            <input type="text"></input>
          </div>
          <div className="back-section">
            <h1>BACK</h1>
            <textarea type="text"></textarea>
          </div>
        </section>
      ) : (
        ``
      )}
    </div>
  );
};
