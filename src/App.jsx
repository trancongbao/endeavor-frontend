import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyDecks from "./Student/MyDecks/MyDecks";
import DeckStudy from "./Student/MyDecks/DeckStudy/DeckStudy";
import Student from "./Student/Student";
import SideBar from "./Common/SideBar/SideBar";
import "./App.scss";
import React from "react";
import Teacher from "./Teacher/Teacher";
import Editing from "./Student/MyDecks/DeckStudy/Card/Editing/Editing";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/student" element={<Student />}>
            <Route path="my-decks" element={<MyDecks />} />
            <Route index element={<Navigate to="my-decks" />} />
            <Route end path={`my-decks/:deckId`} element={<DeckStudy />} />
          </Route>
          <Route path="/" element={<Navigate to="/student" />} />
          <Route path="/teacher" element={<Teacher />} >
            <Route path="my-decks" element={<MyDecks />} />
            <Route index element={<Navigate to="my-decks" />} />
            <Route end path={`my-decks/:deckId`} element={<DeckStudy />} />
            <Route end path={`my-decks/edit/:deckId`} element={<Editing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
