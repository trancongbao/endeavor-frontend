import { boldNewWord } from '../../../../../../Common/Utils'

export default function Preview({ card }) {
  console.log('card: ', card)
  return (
    <>
      <div
        className="front-section"
        dangerouslySetInnerHTML={{
          __html: card ? boldNewWord(card[0].card_text) : '',
        }}
      ></div>
      <hr></hr>
      {card &&
        card.map((word, index) => (
          <div key={index} className="back-section item">
            <div>
              <span className="word bold-text">{word.word_word} </span>
              <span className="definition">:: {word.word_definition}</span>
            </div>
          </div>
        ))}
    </>
  )
}
