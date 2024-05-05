import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyDecks from "./Common/MyDecks/MyDecks";
import DeckStudy from "./Student/MyDecks/DeckStudy/DeckStudy";
import Student from "./Student/Student";
import SideBar from "./Common/SideBar/SideBar";
import "./App.scss";
import React from "react";
import Teacher from "./Teacher/Teacher";
import DeckBrowser from "./Student/MyDecks/DeckStudy/Card/Editing/Browser";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/teacher" />} />
          <Route path="/teacher" element={<Teacher />} >
            <Route path="my-decks" element={<MyDecks isTeacher={true} />} />
            <Route index element={<Navigate to="my-decks" />} />
            <Route end path={`my-decks/:deckId`} element={<DeckBrowser />} />
          </Route>
          <Route path="/student" element={<Student />}>
            <Route path="my-decks" element={<MyDecks isTeacher={false} />} />
            <Route index element={<Navigate to="my-decks" />} />
            <Route end path={`my-decks/:deckId`} element={<DeckStudy />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
