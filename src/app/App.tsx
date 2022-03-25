import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../components/MainPage";
import LoginPage from "../components/LoginPage";
import EditPage from "../components/EditPage";
import Header from "../components/Header";
import "./global.css";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
