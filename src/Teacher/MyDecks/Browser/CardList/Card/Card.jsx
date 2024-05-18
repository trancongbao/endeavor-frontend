import './Card.scss';
import { boldNewWord } from '../../../../../Common/Utils';
import { useRef, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isNewWord, setIsNewWord] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);
  const inputRef = useRef(null);

  const handleEditBtnClick = (event) => {
    setIsEditing(!isEditing);
  };
  const handleDoubleClick = (event) => {
    setIsNewWord(!isNewWord);

    const input = inputRef.current;
    if (!input) return;

    const text = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start !== end) {
      const before = text.slice(0, start).lastIndexOf(' ') + 1;
      const after = text.indexOf(' ', start);
      let word = text.slice(before, after === -1 ? undefined : after);

      word = word.replaceAll('#', '');
      console.log('Double-clicked word:', word);

      // TODO: call api to suggest word
    }
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

  const handleDrop = (e, targetItem) => {
    // TODO: https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
  };

  return (
    <section className="edit-place">
      <div className="btns">
        <button
          className="inline-btn edit-card-btn"
          onClick={() => handleEditBtnClick()}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
        {isNewWord ? (
          <button className="inline-btn mark-new-word-btn">
            Mark as new word
          </button>
        ) : (
          ''
        )}
      </div>
      <h2>↓ Front </h2>
      {isEditing ? (
        <input
          className="front-section"
          type="text"
          value={card.text}
          ref={inputRef}
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
    </section>
  );
}
