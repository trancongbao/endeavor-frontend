import React, { useEffect, useState } from 'react'
import Card from './Card/Card'
import './CardList.scss'
import { rpc } from '../../../../rpc/rpc'
import { boldNewWord } from '../../../../Common/Utils'
import lodash from 'lodash'

export default function CardList({ selectedSubdeck }) {
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    if (!selectedSubdeck || !selectedSubdeck.subdeck_id) return
    rpc('teach', 'getCards', {
      courseId: selectedSubdeck.deck_id,
      lessonId: selectedSubdeck.subdeck_id,
    }).then((rows) => {
      const cards = lodash.groupBy(rows, 'card_order')
      setCards(cards)
      //Select the first card
      const minCardOrder = lodash.min(Object.keys(cards).map(Number))
      const firstCard = cards[minCardOrder]
      firstCard && setSelectedCard(firstCard)
    })
  }, [selectedSubdeck])

  return (
    <div className="card-area">
      <section className="card-list">
        <button className="inline-btn add-card-btn">Add Card</button>
        <ul>
          {Object.keys(cards).map((cardOrder) => (
            <li
              className={cardOrder === selectedCard.card_order ? 'selected' : ''}
              key={cardOrder}
              onClick={() => setSelectedCard(cards[cardOrder])}
              dangerouslySetInnerHTML={{
                __html: boldNewWord(cards[cardOrder][0].card_text),
              }}
            ></li>
          ))}
        </ul>
      </section>
      <Card card={selectedCard} />
    </div>
  )
}
