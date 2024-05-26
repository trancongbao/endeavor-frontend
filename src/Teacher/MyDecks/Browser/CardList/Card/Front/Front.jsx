import { boldNewWord } from '../../../../../../Common/Utils';
const Front = (props) => {
  return (
    <>
      {props.isEditing ? <h2>Text</h2> : ''}
      {props.isEditing ? (
        // TODO: highlight new word in input text
        <input
          className="front-section"
          type="text"
          value={props.card.text}
          onChange={() => {}}
          onDoubleClick={props.handleDoubleClick}
        />
      ) : (
        <div
          className="front-section"
          dangerouslySetInnerHTML={{
            __html: props.card ? boldNewWord(props.card.text) : '',
          }}
        ></div>
      )}
      {/* POPUP WORD SUGGESTIONS */}
      {props.popupVisible && (
        <div
          className="popup"
          style={{ top: props.popupPosition.y, left: props.popupPosition.x }}
        >
          <ul>
            {props.suggestedWords &&
              props.suggestedWords.map((word, index) => (
                <li
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    props.addWordsToCard(word);
                  }}
                >
                  {word.word} :: {word.definition}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default Front;
