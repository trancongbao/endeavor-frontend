import { RiDeleteBinLine } from 'react-icons/ri';

const Back = (props) => {
  return (
    <>
      {props.isEditing ? <h2>Words</h2> : ''}
      {props.card
        ? props.card.map((word, index) => (
            <div
              key={index}
              className={`back-section item ${
                word === props.draggingItem ? 'dragging' : ''
              }`}
              draggable="true"
              onDragStart={(e) => props.handleDragStart(e, word)}
              onDragEnd={props.handleDragEnd}
              onDragOver={props.handleDragOver}
              onDrop={(e) => props.handleDrop(e, word)}
            >
              <div>
                <span className="word bold-text">{word.word_word} </span>
                <span className="definition">:: {word.word_definition}</span>
              </div>
              {props.isEditing ? <RiDeleteBinLine /> : ''}
            </div>
          ))
        : ''}
    </>
  );
};
export default Back;
