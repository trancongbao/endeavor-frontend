import { boldNewWord } from '../../../../../../Common/Utils'

export default function Preview({ card }) {
  return (
    <div
      className="front-section"
      dangerouslySetInnerHTML={{
        __html: card ? boldNewWord(card[0].card_text) : '',
      }}
    ></div>
  )
}
