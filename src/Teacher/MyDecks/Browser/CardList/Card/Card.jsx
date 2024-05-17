import './Card.scss';
import { boldNewWord } from '../../../../../Common/Utils';

export default function Card({ card }) {
  return (
    <section className="edit-place">
      <div
        className="front-section"
        dangerouslySetInnerHTML={{
          __html: card ? boldNewWord(card.text) : '',
        }}
      ></div>
    </section>
  );
}
