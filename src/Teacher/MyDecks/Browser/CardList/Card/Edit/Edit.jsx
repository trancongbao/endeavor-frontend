import { useState } from 'react'
import { rpc } from '../../../../../../rpc/rpc'

export default function Edit({ card }) {
  const [suggestedWords, setSuggestedWords] = useState([])
  const [wordSuggestionsPopupPosition, setwordSuggestionsPopupPosition] = useState({ x: 0, y: 0 })
  const [wordSuggestionsPopupVisible, setWordSuggestionsPopupVisible] = useState(false)
  const [isAddCardPopUpShown, setIsAddCardPopUpShown] = useState(false)

  return (
    <div onClick={() => setWordSuggestionsPopupVisible(false)}>
      <h2>Text</h2>
      <input
        className="front-section"
        type="text"
        value={card[0].card_text}
        onChange={() => {}}
        onDoubleClick={handleDoubleClick}
      />
      {/* Word Suggestions Popup */}
      {wordSuggestionsPopupVisible && (
        <div className="popup" style={{ top: wordSuggestionsPopupPosition.y, left: wordSuggestionsPopupPosition.x }}>
          <ul>
            {suggestedWords &&
              suggestedWords.map((word, index) => (
                <li
                  key={index}
                  onClick={(event) => {
                    event.preventDefault()
                    addWordToCard(word)
                  }}
                >
                  {word.word} :: {word.definition}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )

  function handleDoubleClick(event) {
    const word = window.getSelection().toString().trim()

    rpc('teach', 'searchWord', { searchTerm: word }).then((result) => {
      setSuggestedWords(result)
    })

    setwordSuggestionsPopupPosition({
      x: event.clientX / 1.5 + 200,
      y: event.clientY / 1.5 + 100,
    })
    setWordSuggestionsPopupVisible(true)
  }

  function addWordToCard(word) {
    rpc('teach', 'addWordToCard', {
      card_id: card.id,
      word_id: word.word_id,
      word_order: 3, //TODO: determine order, re-order if neccessary
    })

    // add ## to new word in front text
  }
}
