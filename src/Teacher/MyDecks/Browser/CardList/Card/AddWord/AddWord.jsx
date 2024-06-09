import { useState } from 'react'
import { rpc } from '../../../../../../rpc/rpc'

const AddWord = (props) => {
  const [text, setText] = useState('')
  const [definition, setDefinition] = useState('')
  const [phonetic, setPhonetic] = useState('')
  const [partOfSpeech, setPartOfSpeech] = useState('')
  return (
    <div className="popup-overlay">
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="word">Text</label>
        <input
          className="input-field"
          id="word"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <label htmlFor="definition">Definition</label>
        <input
          className="input-field"
          id="definition"
          type="text"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        ></input>
        <label htmlFor="phonetic">Phonetic</label>
        <input
          className="input-field"
          id="phonetic"
          type="text"
          value={phonetic}
          onChange={(e) => setPhonetic(e.target.value)}
        ></input>
        <label htmlFor="part_of_speech">Part of Speech</label>
        <input
          className="input-field"
          id="part_of_speech"
          type="text"
          value={partOfSpeech}
          onChange={(e) => setPartOfSpeech(e.target.value)}
        ></input>
        <div className="popup-buttons">
          <button onClick={props.closeAddWordPopUp} className="popup-button close-button">
            Close
          </button>
          <button
            onClick={() => {
              const word = rpc('teach', 'createWord', {
                word: text,
                definition: definition,
                phonetic: phonetic,
                part_of_speech: partOfSpeech,
              })
              props.addWordToCard(word)
              props.closeAddWordPopUp()
            }}
            className="popup-button add-button"
          >
            Add Word
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddWord
