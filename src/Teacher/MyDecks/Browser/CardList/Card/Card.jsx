import './Card.scss'
import { useState } from 'react'
import Preview from './Preview/Preview'
import Edit from './Edit/Edit'

export default function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className="edit-place">
      <div className="btns">
        <button
          className={`inline-btn ${!isEditing ? 'edit-card-btn' : 'preview-card-btn'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Preview Cards' : 'Edit Cards'}
        </button>
      </div>

      {isEditing ? <Edit card={card}></Edit> : <Preview card={card}></Preview>}

      {/* {isEditing ? (
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
