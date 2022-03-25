import React from "react";
import { useAppSelector } from "./hooks";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainPage from "../components/MainPage";
import LoginPage from "../components/LoginPage";
import EditPage from "../components/EditPage";
import Header from "../components/Header";
import "./global.css";

function App() {
  const token = useAppSelector((state) => state.users.token);

  const local = localStorage.getItem("stayLogged");

  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/login" && <Header />}
      <Routes>
        {token || local ? (
          <Route path="/" element={<MainPage />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {token || local ? (
          <Route path="/edit" element={<EditPage />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        {!token && <Route path="/login" element={<LoginPage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
