import { useState } from 'react'

const AddWord = (props) => {
  const [word, setWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [phonetic, setPhonetic] = useState('')
  const [partOfSpeech, setPartOfSpeech] = useState('')
  const handleCreateWord = (event) => {
    const newWord = {
      word: word,
      definition: definition,
      phonetic: phonetic,
      partOfSpeech: partOfSpeech,
    }
    props.createNewWordForCard(newWord)
  }
  return (
    <div className="popup-overlay">
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="word">Text</label>
        <input
          className="input-field"
          id="word"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
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
          <button onClick={handleCreateWord} className="popup-button add-button">
            Add Word
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddWord
