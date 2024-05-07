import {useEffect, useState} from "react";
import "./Browser.scss";
import {rpc} from "../../../rpc/rpc"
import {useParams} from "react-router-dom";

export default function Browser() {
  const {deckId} = useParams()

  const [subdecks, setSubdecks] = useState([]);
  const [selectedSubdeck, setSelectedSubdeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    rpc("teach", "getSubdecks", {id: deckId})
    .then((subdecks) => {
      setSubdecks(subdecks)
      //Select the first subdeck
      const firstSubdeckId = subdecks.find((subdeck) => subdeck.order === 0).id
      if (firstSubdeckId) {
        setSelectedSubdeck(firstSubdeckId)
        getCards(firstSubdeckId)
        .then((cards) => {
          setCards(cards)
          //Select the first card
          const firstCardId = cards.find((card) => card.order === 0).id
          setSelectedCard(firstCardId)
        })
      }
    })
  }, [])

  return (
    <div className="edit-container">
      <section className="deck-list">
        <ul>
          {subdecks.map((deck) => (
            <li
              className={selectedSubdeck === deck.id ? "selected" : ""}
              key={deck.id}
              onClick={(event) => selectSubdeck(event, deck.id)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
      </section>
      <section className="card-list">
        <ul>
          {cards.map((card) => (
            <li
              className={selectedCard === card.id ? "selected" : ""}
              key={card.id}
              onClick={(event) => selectCard(event, card.id)}
            >
              {card.text}
            </li>
          ))}
        </ul>
      </section>
      {selectedCard ? (
        <section className="edit-place">
          <div className="front-section">
            <h1>Text</h1>
            <input type="text"></input>
          </div>
        </section>
      ) : (
        ``
      )}
    </div>
  )

  function getCards(subdeckId) {
    return rpc("teach", "getCards", {id: subdeckId})
  }

  function selectSubdeck(event, id) {
    event.preventDefault();
    setSelectedSubdeck(id)
    getCards(id)
    .then((cards) => {
      setCards(cards)
      //Select the first card
      const firstCardId = cards.find((card) => card.order === 0).id
      setSelectedCard(firstCardId)
    })
  }

  function selectCard(event, id) {
    event.preventDefault();
    setSelectedCard(id);
  }
}
