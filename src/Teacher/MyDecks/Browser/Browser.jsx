import {useEffect, useState} from "react";
import "./Browser.scss";
import {rpc} from "../../../rpc/rpc"
import {useParams} from "react-router-dom";
import SubdeckList from './SubdeckList/SubdeckList';
import CardList from './CardList/CardList';
import EditPane from './EditPane/EditPane';

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
      <CardList
        cards={cards}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
      <EditPane/>
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
      selectFirstCard(cards)
    })
  }

  function selectFirstCard(cards) {
    const firstCard = cards.find((card) => card.order === 0)
    setSelectedCard(firstCard.id)
  }
}
