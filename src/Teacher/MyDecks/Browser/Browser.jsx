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
      const subdecks = lodash.groupBy(rows, 'subdeck_order')
      setSubdecks(subdecks)
      //Select the first subdeck
      const minSubdeckOrder = lodash.min(Object.keys(subdecks).map(Number))
      const firstSubdeck = subdecks[minSubdeckOrder]
      firstSubdeck && setSelectedSubdeck(firstSubdeck)
    })
  }, [deckId])

  return (
    <div className="browser">
      <section className="deck-list">
        <button className="inline-btn add-sub-deck-btn">Add sub deck</button>
        <ul>
          {subdecks.map((subdeck) => (
            <li
              className={subdeck === selectedSubdeck ? 'selected' : ''}
              key={subdeck.id}
              onClick={() => setSelectedSubdeck(subdeck)}
            >
              {subdeck.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Render `CardList` only when `selectedSubdeck` is defined */}
      {selectedSubdeck && (
        <CardList deckId={deckId} selectedSubdeck={selectedSubdeck} />
      )}
    </div>
  )
}
