import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MyDecks from "./Common/MyDecks/MyDecks";
import DeckStudy from "./Student/MyDecks/DeckStudy/DeckStudy";
import Student from "./Student/Student";
import SideBar from "./Common/SideBar/SideBar";
import "./App.scss";
import React, {useEffect, useState} from "react";
import Teacher from "./Teacher/Teacher";
import DeckBrowser from "./Teacher/MyDecks/Browser/Browser";
import Login from "./Login/Login";
import {rpc} from "./rpc/rpc";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    rpc("auth", "currentUser", {})
    .then((user) => {
      if (user) {
        setUsername(user.username)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, []);

  if (isLoggedIn === null) {
    return <div>Authentication check...</div>; // Render a loading screen until authentication is checked
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
            <Route index element={<Navigate to="my-decks"/>}/>
            <Route path="my-decks" element={<MyDecks isTeacher={true}/>}/>
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
