import './Card.scss'
import { useState } from 'react'
import { rpc } from '../../../../../rpc/rpc'
import Preview from './Preview/Preview'
import Edit from './Edit/Edit'
import Front from './Front/Front'
import Back from './Back/Back'
import AddWord from './AddWord/AddWord'

export default function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draggingItem, setDraggingItem] = useState(null)
  const [suggestedWords, setSuggestedWords] = useState([])
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [popupVisible, setPopupVisible] = useState(false)
  const [isAddCardPopUpShown, setIsAddCardPopUpShown] = useState(false)

  const addWordToCard = (word) => {
    rpc('teach', 'addWordToCard', {
      card_id: card.id,
      word_id: word.word_id,
      word_order: 3, //TODO: determine order, re-order if neccessary
    })

    // add ## to new word in front text
  }

  const handleDoubleClick = (event) => {
    const word = window.getSelection().toString().trim()

    rpc('teach', 'searchWord', { searchTerm: word }).then((result) => {
      setSuggestedWords(result)
    })

    setPopupPosition({
      x: event.clientX / 1.5 + 200,
      y: event.clientY / 1.5 + 100,
    })
    setPopupVisible(true)
  }

  const handleDragStart = (e, item) => {
    setDraggingItem(item)
    e.dataTransfer.setData('text/plain', '')
  }

  const handleDragEnd = () => {
    setDraggingItem(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetItem) => {
    // TODO: https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
  }

  //TODO: isEditing ? CardPreview : CardEdit
  return (
    <section className="edit-place" onClick={() => setPopupVisible(false)}>
      <div className="btns">
        <button
          className={`inline-btn ${!isEditing ? 'edit-card-btn' : 'preview-card-btn'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Preview Cards' : 'Edit Cards'}
        </button>
      </div>

      {isEditing ? <Edit></Edit> : <Preview card={card}></Preview>}

      {/* <Front
        isEditing={isEditing}
        card={card}
        popupVisible={popupVisible}
        popupPosition={popupPosition}
        suggestedWords={suggestedWords}
        handleDoubleClick={handleDoubleClick}
        addWordsToCard={addWordToCard}
      />
      <hr></hr>
      <Back
        isEditing={isEditing}
        card={card}
        draggingItem={draggingItem}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
      {isEditing ? (
        <>
          <button className="inline-btn" onClick={() => setIsAddCardPopUpShown(true)}>
            Add word
          </button>
        </>
      ) : (
        ''
      )}
      {isAddCardPopUpShown && (
        <AddWord addWordToCard={addWordToCard} closeAddWordPopUp={() => setIsAddCardPopUpShown(false)} />
      )} */}
    </section>
  )
}
