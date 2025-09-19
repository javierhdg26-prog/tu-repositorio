import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SmartFlow</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/machines" className="hover:underline">Máquinas</Link>
        <Link to="/users" className="hover:underline">Usuarios</Link>
      </nav>
    </header>
  );
};

export default Header;
