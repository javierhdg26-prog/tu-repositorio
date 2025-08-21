import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Busca el elemento en el DOM con el ID 'root'
const rootElement = document.getElementById('root');

// Crea una raíz de React y renderiza el componente App
// Esta línea es la que hace que tu aplicación aparezca en la página
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);