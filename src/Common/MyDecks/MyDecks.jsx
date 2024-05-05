import React, {useEffect, useState} from "react";
import "./MyDecks.scss";
import DeckTile from "./DeckTile/DeckTile";
import TeacherDeckTile from "../../Teacher/MyDecks/DeckTile/DeckTile";

export default function MyDecks({isTeacher}) {
  const [myDecks, setMyDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyDecks(); // Call getMyDecks after login
        setMyDecks(data.result);
      } catch (error) {
        console.error('Error fetching decks:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-decks-grid-container">
      {myDecks.map((deck) => (
        <DeckTile key={deck.id} isTeacher={isTeacher} deck={deck}/>
      ))}
    </div>
  );
}

function getMyDecks() {
  return fetch(
    'http://localhost:3000/teach',
    {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "method": "getMyDecks",
        "params": {}
      })
    }
  )
  .then((response) => {
    if (!response.ok) {
      console.log(`Response is not successful: status = ${response.status}.`);
      return [];
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error fetching decks:', error.message);
    return [];
  });
}