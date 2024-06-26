import React from 'react';
import './DeckTile.scss';
import { NavLink } from 'react-router-dom';

export default function DeckTile({ deck }) {
  return (
    <div className="deck-card">
      <h2 className="title">{deck.title}</h2>
      <table className="sub-decks-table">
        <thead className="table-head">
          <tr>
            <th scope="col"></th>
            <th scope="col">New</th>
            <th scope="col">Due</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {deck.subDecks.map((subDeck) => (
            <tr className="body-row" key={subDeck.id}>
              <td className="row-title">{subDeck.title}</td>
              <td className="row-new">{subDeck.new}</td>
              <td className="row-due">{subDeck.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="action-btns">
        <NavLink className="inline-btn" to={`${deck.id}`}>
          {' '}
          Study{' '}
        </NavLink>
      </div>
    </div>
  );
}
