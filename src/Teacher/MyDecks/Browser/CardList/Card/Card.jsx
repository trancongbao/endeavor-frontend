import './Card.scss'
import { useState } from 'react'
import { rpc } from '../../../../../rpc/rpc'
import Front from './Front/Front'
import Back from './Back/Back'
import AddWord from './AddWord/AddWord'

export default function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draggingItem, setDraggingItem] = useState(null)
  const [suggestedWords, setSuggestedWords] = useState([])
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [popupVisible, setPopupVisible] = useState(false)
  const [isAddingCard, setIsAddingCard] = useState(false)

  const addWordsToCard = (word) => {
    rpc('teach', 'addWordsToCard', {
      card_id: card.id,
      words: [{ id: word.id, order: card.words.length + 1 }],
    })

    // update card word after adding words
    // update front text, add ## to new word added
    // create word, id is not auto increament yet
  }

  const createNewWordForCard = (word) => {
    rpc('teach', 'createWord', word).then((result) => {
      addWordsToCard(result)
    })
  }

  const handleEditBtnClick = (event) => {
    setIsEditing(!isEditing)
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

  const handleClickOutside = () => {
    setPopupVisible(false)
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

  const togglePopup = () => {
    setIsAddingCard(!isAddingCard)
  }

  const handleDrop = (e, targetItem) => {
    // TODO: https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
  }

  return (
    <section className="edit-place" onClick={handleClickOutside}>
      <div className="btns">
        <button
          className={`inline-btn ${!isEditing ? 'edit-card-btn' : 'preview-card-btn'}`}
          onClick={() => handleEditBtnClick()}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>
      <Front
        isEditing={isEditing}
        card={card}
        popupVisible={popupVisible}
        popupPosition={popupPosition}
        suggestedWords={suggestedWords}
        handleDoubleClick={handleDoubleClick}
        addWordsToCard={addWordsToCard}
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
          <button className="inline-btn" onClick={togglePopup}>
            Add word
          </button>
        </>
      ) : (
        ''
      )}
      {isAddingCard && (
        <AddWord
          togglePopup={togglePopup}
          createNewWordForCard={createNewWordForCard}
        />
      )}
    </section>
  )
}
