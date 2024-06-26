import React, { useEffect, useState } from 'react';
import './MyDecks.scss';
import TeacherDeckTile from '../../Teacher/MyDecks/DeckTile/DeckTile';
import StudentDeckTile from '../../Student/MyDecks/DeckTile/DeckTile';

export default function MyDecks({ isTeacher }) {
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
      {myDecks.map((deck) => {
        return isTeacher ? (
          <TeacherDeckTile key={deck.id} deck={deck} />
        ) : (
          <StudentDeckTile key={deck.id} deck={deck} />
        );
      })}
    </div>
  );
}

function getMyDecks() {
  return fetch('http://localhost:3000/teach', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      method: 'getDecks',
      params: {},
    }),
  })
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
