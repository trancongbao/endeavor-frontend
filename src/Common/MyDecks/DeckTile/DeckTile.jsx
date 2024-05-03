import React from "react";
import "./DeckTile.scss";
import { NavLink } from "react-router-dom";

export default function DeckTile({ isTeacher, deck }) {
  //const [isTeacherUrl, setIsTeacherUrl] = useState(false);
  // useEffect(() => {
  //   if (window.location.href.includes("teacher")) {
  //     setIsTeacherUrl(true);
  //   }
  // }, []);
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
              <td className="row-title">
                {subDeck.chapter}. {subDeck.title}
              </td>
              <td className="row-new">{subDeck.new}</td>
              <td className="row-due">{subDeck.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="action-btns">
        {isTeacher ? (
          <NavLink className="inline-btn edit-btn" to={`${deck.id}`}>
            Browse
          </NavLink>
        ) : (
          <NavLink className="inline-btn" to={`${deck.id}`}>
            Study
          </NavLink>
        )}
      </div>
    </div>
  );
}
