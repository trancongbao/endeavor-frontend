import './Card.scss';
import { boldNewWord } from '../../../../../Common/Utils';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { rpc } from '../../../../../rpc/rpc';

export default function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const handleEditBtnClick = (event) => {
    setIsEditing(!isEditing);
  };

  const handleDoubleClick = (event) => {
    const word = window.getSelection().toString().trim();

    rpc('teach', 'searchWord', { searchTerm: word }).then((result) => {
      setSuggestedWords(result);
    });

    setPopupPosition({
      x: event.clientX + 30,
      y: event.clientY + 30,
    });
    setPopupVisible(true);
  };

  const handleClickOutside = () => {
    setPopupVisible(false);
  };

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const togglePopup = () => {
    setIsAddingCard(!isAddingCard);
  };

  const handleDrop = (e, targetItem) => {
    // TODO: https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
  };

  return (
    <section className="edit-place" onClick={handleClickOutside}>
      <div className="btns">
        <button
          className="inline-btn edit-card-btn"
          onClick={() => handleEditBtnClick()}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>
      <h2>↓ Front </h2>
      {isEditing ? (
        <input
          className="front-section"
          type="text"
          value={card.text}
          onChange={() => {}}
          onDoubleClick={handleDoubleClick}
        />
      ) : (
        <div
          className="front-section"
          dangerouslySetInnerHTML={{
            __html: card ? boldNewWord(card.text) : '',
          }}
        ></div>
      )}
      {/* POPUP WORD SUGGESTIONS */}
      {popupVisible && (
        <div
          className="popup"
          style={{ top: popupPosition.y, left: popupPosition.x }}
        >
          <ul>
            {suggestedWords &&
              suggestedWords.map((word, index) => (
                <li key={index}>
                  {word.word} :: {word.definition}
                </li>
              ))}
          </ul>
        </div>
      )}
      <h2>↓ Back </h2>
      {card
        ? card.words.map((item, index) => (
            <div
              key={item.id}
              className={`back-section item ${
                item === draggingItem ? 'dragging' : ''
              }`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
            >
              <div>
                <span className="word bold-text">{item.word_word} </span>
                <span className="definition">:: {item.word_definition}</span>
              </div>
              <RiDeleteBinLine />
            </div>
          ))
        : ''}
      {isEditing ? (
        <>
          <button className="inline-btn edit-card-btn" onClick={togglePopup}>
            Add word
          </button>
        </>
      ) : (
        ''
      )}
      {isAddingCard && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="word">Word</label>
            <input id="word" type="text"></input>
            <label htmlFor="definition">Definition</label>
            <input id="definition" type="text"></input>
            <button onClick={togglePopup} className="close-popup-button">
              Close Popup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
