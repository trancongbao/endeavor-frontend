import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MyDecks from "./Common/MyDecks/MyDecks";
import DeckStudy from "./Student/MyDecks/DeckStudy/DeckStudy";
import Student from "./Student/Student";
import SideBar from "./Common/SideBar/SideBar";
import "./App.scss";
import React, {useEffect, useState} from "react";
import Teacher from "./Teacher/Teacher";
import DeckBrowser from "./Student/MyDecks/DeckStudy/Card/Editing/Browser";
import Login from "./Login/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/auth',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              method: "currentUser",
              params: {}
            }),
          }
        )
        console.log(response)
        if (response.ok) {
          const body = await response.json();
          console.log(body)
          const result = body.result
          console.log(result)
          if (result) {
            console.log("setIsLoggedIn to true")
            setIsLoggedIn(true);
            setUsername(result.username)
            console.log("isLoggedIn: ", isLoggedIn)
          }
        } else {
          console.error('Calling /currentUser failed: ', response.statusText);
        }
      } catch (error) {
        console.error('Error checking cookie:', error);
      } finally {
        setLoading(false);
      }
    };

    currentUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading screen until authentication is checked
  }


  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar/>
        <Routes>
          {/* Routes for home/login page */}
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login setLoggedIn={setIsLoggedIn} setUsername={setUsername}/>}/>

          {/* Routes for teacher */}
          <Route path="/teacher" element={isLoggedIn ? <Teacher/> : <Navigate to="/login"/>}>
            <Route path="my-decks" element={<MyDecks isTeacher={true}/>}/>
            <Route index element={<Navigate to="my-decks"/>}/>
            <Route end path={`my-decks/:deckId`} element={<DeckBrowser/>}/>
          </Route>

          {/* Routes for teacher */}
          <Route path="/student" element={<Student/>}>
            <Route path="my-decks" element={<MyDecks isTeacher={false}/>}/>
            <Route index element={<Navigate to="my-decks"/>}/>
            <Route end path={`my-decks/:deckId`} element={<DeckStudy/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
