import { RiDeleteBinLine } from 'react-icons/ri';

const Back = (props) => {
  return (
    <>
      {props.isEditing ? <h2>Words</h2> : ''}
      {props.card
        ? props.card.words.map((item, index) => (
            <div
              key={index}
              className={`back-section item ${
                item === props.draggingItem ? 'dragging' : ''
              }`}
              draggable="true"
              onDragStart={(e) => props.handleDragStart(e, item)}
              onDragEnd={props.handleDragEnd}
              onDragOver={props.handleDragOver}
              onDrop={(e) => props.handleDrop(e, item)}
            >
              <div>
                <span className="word bold-text">{item.word_word} </span>
                <span className="definition">:: {item.word_definition}</span>
              </div>
              {props.isEditing ? <RiDeleteBinLine /> : ''}
            </div>
          ))
        : ''}
    </>
  );
};
export default Back;
