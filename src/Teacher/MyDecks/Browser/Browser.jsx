import {useEffect, useState} from "react";
import "./Browser.scss";
import {rpc} from "../../../rpc/rpc"
import {useParams} from "react-router-dom";
import CardList from './CardList/CardList';

export default function Browser() {
  const {deckId} = useParams()

  const [subdecks, setSubdecks] = useState([]);
  const [selectedSubdeck, setSelectedSubdeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    rpc("teach", "getSubdecks", {id: deckId})
    .then((subdecks) => {
      setSubdecks(subdecks)
      selectFirstSubdeck(subdecks)
    })
  }, [])

  return (
    <div className="browser">
      <section className="deck-list">
        <ul>
          {subdecks.map((deck) => (
            <li
              className={selectedSubdeck === deck.id ? "selected" : ""}
              key={deck.id}
              onClick={() => selectSubdeck(deck.id)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
      </section>

      <CardList cards={cards}/>
    </div>
  );

  function selectFirstSubdeck(subdecks) {
    const firstSubdeck = subdecks.find((subdeck) => subdeck.order === 0)
    selectSubdeck(firstSubdeck.id)
  }

  function selectSubdeck(subdeckId) {
    setSelectedSubdeck(subdeckId)
    rpc("teach", "getCards", {id: subdeckId})
    .then((cards) => {
      setCards(cards)
    })
  }
}
