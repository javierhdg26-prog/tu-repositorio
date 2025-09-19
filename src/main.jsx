import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";  // 👈 Importa aquí tus estilos de Tailwind

const root = ReactDOM.createRoot(document.getElementById("root"));

const appContent = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

root.render(
  process.env.NODE_ENV === "development" ? (
    <React.StrictMode>{appContent}</React.StrictMode>
  ) : (
    appContent
  )
);
