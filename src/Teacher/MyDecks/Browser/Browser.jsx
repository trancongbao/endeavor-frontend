import {useEffect, useState} from "react";
import "./Browser.scss";
import {rpc} from "../../../rpc/rpc"
import {useParams} from "react-router-dom";
import SubdeckList from './SubdeckList/SubdeckList';
import CardArea from './CardArea/CardArea';

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
    <div className="edit-container">
      <SubdeckList
        subdecks={subdecks}
        selectedSubdeck={selectedSubdeck}
        selectSubdeck={selectSubdeck}
      />
      <CardArea cards={cards}/>
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
