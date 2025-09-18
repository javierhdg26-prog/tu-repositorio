import React, { useState } from "react";

// Hooks de CRUD
import useCreateUser from "../hooks/useCreateUser";
import useCreateMachine from "../hooks/useCreateMachine";
import useCreatePiece from "../hooks/useCreatePiece";

// Modal
import CreateUserModal from "../components/CreateUserModal";

export default function Config() {
  // Estados de búsqueda
  const [userSearch, setUserSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");
  const [pieceSearch, setPieceSearch] = useState("");

  // Estado modal usuario
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Hooks de creación
  const {
    createUser,
    loading: loadingUser,
    error: errorUser,
    success: successUser,
  } = useCreateUser();

  const {
    createMachine,
    loading: loadingMachine,
    error: errorMachine,
    success: successMachine,
  } = useCreateMachine();

  const {
    createPiece,
    loading: loadingPiece,
    error: errorPiece,
    success: successPiece,
  } = useCreatePiece();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Configuración del Sistema
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* ===================== USERS ===================== */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Usuarios</h2>
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Buscar usuarios..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botón ahora abre modal */}
          <button
            onClick={() => setIsUserModalOpen(true)}
            disabled={loadingUser}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingUser ? "Creando..." : "➕ Crear Usuario"}
          </button>
          {errorUser && <p className="text-red-500 mt-2">{errorUser}</p>}
          {successUser && <p className="text-green-500 mt-2">{successUser}</p>}
        </div>

        {/* ===================== MACHINES ===================== */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Máquinas</h2>
          <input
            type="text"
            value={machineSearch}
            onChange={(e) => setMachineSearch(e.target.value)}
            placeholder="Buscar máquinas..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botón de creación rápida */}
          <button
            onClick={() =>
              createMachine({
                name: "Nueva Máquina",
                reference: "REF-001",
                description: "Máquina de prueba",
                imageURL: "https://via.placeholder.com/40",
              })
            }
            disabled={loadingMachine}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingMachine ? "Creando..." : "➕ Crear Máquina"}
          </button>
          {errorMachine && <p className="text-red-500 mt-2">{errorMachine}</p>}
          {successMachine && <p className="text-green-500 mt-2">{successMachine}</p>}
        </div>

        {/* ===================== PIECES ===================== */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Piezas</h2>
          <input
            type="text"
            value={pieceSearch}
            onChange={(e) => setPieceSearch(e.target.value)}
            placeholder="Buscar piezas..."
            className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botón de creación rápida */}
          <button
            onClick={() =>
              createPiece({
                name: "Nueva Pieza",
                reference: "PIEZA-001",
                description: "Pieza de prueba",
                imageURL: "https://via.placeholder.com/40",
                cycleTime: 5,
              })
            }
            disabled={loadingPiece}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingPiece ? "Creando..." : "➕ Crear Pieza"}
          </button>
          {errorPiece && <p className="text-red-500 mt-2">{errorPiece}</p>}
          {successPiece && <p className="text-green-500 mt-2">{successPiece}</p>}
        </div>
      </div>

      {/* Modal de creación de usuario */}
      <CreateUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onCreate={(data) => createUser(data)}
      />
    </div>
  );
}
