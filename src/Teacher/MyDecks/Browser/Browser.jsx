import { useEffect, useState } from 'react'
import './Browser.scss'
import { rpc } from '../../../rpc/rpc'
import { useParams } from 'react-router-dom'
import CardList from './CardList/CardList'
import lodash from 'lodash'

export default function Browser() {
  const { deckId } = useParams()

  const [subdecks, setSubdecks] = useState([])
  const [selectedSubdeck, setSelectedSubdeck] = useState(null)

  useEffect(() => {
    rpc('teach', 'getSubdecks', { deckId: deckId }).then((rows) => {
      // For a deckId, each subdeck_order must be unique
      const subdecks = lodash.keyBy(rows, 'subdeck_order')
      setSubdecks(subdecks)
      //Select the subdeck with the lowest order
      const lowestSubdeckOrder = lodash.min(Object.keys(subdecks).map(Number))
      setSelectedSubdeck(subdecks[lowestSubdeckOrder])
    })
  }, [deckId])

  return (
    <div className="browser">
      <section className="deck-list">
        <button className="inline-btn add-sub-deck-btn">Add sub deck</button>
        <ul>
          {Object.keys(subdecks).map((subdeckOrder) => (
            <li
              className={subdeckOrder === selectedSubdeck.subdeck_order ? 'selected' : ''}
              key={subdeckOrder}
              onClick={() => setSelectedSubdeck(subdecks[subdeckOrder])}
            >
              {subdecks[subdeckOrder].subdeck_title}
            </li>
          ))}
        </ul>
      </section>

      {/* Render `CardList` only when `selectedSubdeck` is defined */}
      {selectedSubdeck && <CardList deckId={deckId} selectedSubdeck={selectedSubdeck} />}
    </div>
  )
}
