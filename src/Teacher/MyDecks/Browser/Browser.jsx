import {useEffect, useState} from "react";
import "./Browser.scss";
import {rpc} from "../../../rpc/rpc"
import {useParams} from "react-router-dom";
import CardList from './CardList/CardList';

export default function Browser() {
  const {deckId} = useParams()

  const [subdecks, setSubdecks] = useState([]);
  const [selectedSubdeck, setSelectedSubdeck] = useState(null);

  useEffect(() => {
    rpc("teach", "getSubdecks", {id: deckId})
    .then((subdecks) => {
      setSubdecks(subdecks)
      //Select the first subdeck
      const firstSubdeck = subdecks.find((subdeck) => subdeck.order === 0)
      setSelectedSubdeck(firstSubdeck.id)
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
              onClick={() => setSelectedSubdeck(deck.id)}
            >
              {deck.title}
            </li>
          ))}
        </ul>
      </section>

      <CardList subdeckId={selectedSubdeck}/>
    </div>
  );
}
