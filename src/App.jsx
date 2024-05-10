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
  /**
   * `authenticatedUser` equals `null` means authentication has not been checked
   * `authenticatedUser` equals `{}` means there is no authenticated session
   *  if there is a session, `authenticatedUser` is set to the authenticated user
   * */
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  useEffect(() => {
    rpc("auth", "currentUser", {}).then((user) =>
      setAuthenticatedUser(user)
    )
  }, []);

  if (authenticatedUser === null) {
    return <div></div>; //Render an invisible screen until authentication is checked
  }

  //TODO: navigate to the page appropriate to the userType
  return (
    <React.Fragment>
      <BrowserRouter>
        {authenticatedUser.username &&
          <SideBar authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser}/>}
        <Routes>
          {/* Routes for home/login page */}
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login setAuthenticatedUser={setAuthenticatedUser}/>}/>

          {/* Routes for teacher */}
          <Route path="/teacher" element={(authenticatedUser.username) ? <Teacher/> : <Navigate to="/login"/>}>
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
