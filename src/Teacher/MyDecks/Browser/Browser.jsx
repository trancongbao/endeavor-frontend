import { useEffect, useState } from 'react';
import './Browser.scss';
import { rpc } from '../../../rpc/rpc';
import { useParams } from 'react-router-dom';
import CardList from './CardList/CardList';

export default function Browser() {
  const { deckId } = useParams();

  const [subdecks, setSubdecks] = useState([]);
  const [selectedSubdeck, setSelectedSubdeck] = useState(null);

  useEffect(() => {
    rpc('teach', 'getSubdecks', { id: deckId }).then((subdecks) => {
      setSubdecks(subdecks);
      //Select the first subdeck
      const firstSubdeck = subdecks.find((subdeck) => subdeck.order === 0);
      setSelectedSubdeck(firstSubdeck);
    });
  }, [deckId]);

  return (
    <div className="browser">
      <section className="deck-list">
        <ul>
          {subdecks.map((subdeck) => (
            <li
              className={subdeck === selectedSubdeck ? 'selected' : ''}
              key={subdeck.id}
              onClick={() => setSelectedSubdeck(subdeck)}
            >
              {subdeck.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Render `CardList` only when `selectedSubdeck` is defined */}
      {selectedSubdeck && <CardList selectedSubdeck={selectedSubdeck} />}
    </div>
  );
}
