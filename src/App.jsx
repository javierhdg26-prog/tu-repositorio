import React from "react"; // 👈 NECESARIO para evitar el error
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Config from "./pages/Config";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </Router>
  );
}
