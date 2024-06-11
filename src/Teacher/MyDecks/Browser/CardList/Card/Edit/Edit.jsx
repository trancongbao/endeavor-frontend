import { useState, useRef } from 'react'
import { rpc } from '../../../../../../rpc/rpc'
import { RiDeleteBinLine } from 'react-icons/ri'
import AddWord from '../AddWord/AddWord'

export default function Edit({ card }) {
  const [cardText, setCardText] = useState(card[0].card_text)
  const [isSaveTextButtonShown, setIsSaveTextButtonShown] = useState(false)
  const [suggestedWords, setSuggestedWords] = useState([])
  const [wordSuggestionsPopupPosition, setwordSuggestionsPopupPosition] = useState({ x: 0, y: 0 })
  const [wordSuggestionsPopupVisible, setWordSuggestionsPopupVisible] = useState(false)
  const [isAddCardPopUpShown, setIsAddCardPopUpShown] = useState(false)
  const [draggingItem, setDraggingItem] = useState(null)

  const textInputRef = useRef(null)

  return (
    <div onClick={() => setWordSuggestionsPopupVisible(false)}>
      <h2>Text</h2>
      <input
        ref={textInputRef}
        className="front-section"
        type="text"
        value={cardText}
        onChange={onCardTextChanged}
        onSelect={onCardTextSelected}
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

      {isSaveTextButtonShown && (
        <button className="inline-btn" onClick={onSaveTextButtonClicked}>
          Save Text
        </button>
      )}

      <hr></hr>

      <h2>Words</h2>
      {card &&
        card.map((word, index) => (
          <div
            key={index}
            className={`back-section item ${word === draggingItem ? 'dragging' : ''}`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, word)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, word)}
          >
            <span className="word bold-text">{word.word_word} </span>
            <span className="definition">:: {word.word_definition}</span>
            <RiDeleteBinLine />
          </div>
        ))}

      <button className="inline-btn" onClick={() => setIsAddCardPopUpShown(true)}>
        Add word
      </button>

      {isAddCardPopUpShown && (
        <AddWord addWordToCard={addWordToCard} closeAddWordPopUp={() => setIsAddCardPopUpShown(false)} />
      )}
    </div>
  )

  function onCardTextChanged(event) {
    setCardText(event.target.value)
    setIsSaveTextButtonShown(true)
  }

  function onSaveTextButtonClicked() {
    console.log('card: ', card)
    rpc('teach', 'updateCardText', {
      courseId: card[0].course_id,
      lessonId: card[0].lesson_id,
      cardId: card[0].card_id,
      cardText: textInputRef.current.value,
    }).then((result) => {
      setIsSaveTextButtonShown(false)
    })
  }

  function onCardTextSelected() {
    const textInput = textInputRef.current
    const { selectionStart, selectionEnd } = textInput
    const selection = textInput.value.slice(selectionStart, selectionEnd)

    //onSelect also fires for empty selection
    if (selectionStart !== selectionEnd) {
      rpc('teach', 'searchWord', { searchTerm: selection }).then((result) => {
        setSuggestedWords(result)
      })
    }
  }

  function addWordToCard(word) {
    rpc('teach', 'addWordToCard', {
      cardId: card.id,
      wordId: word.word_id,
      wordOrder: 3, //TODO: determine order, re-order if neccessary
    })

    // add ## to new word in front text
  }

  function handleDragStart(e, item) {
    setDraggingItem(item)
    e.dataTransfer.setData('text/plain', '')
  }

  function handleDragEnd() {
    setDraggingItem(null)
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  function handleDrop(e, targetItem) {
    // TODO: https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
  }
}
