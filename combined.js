// File: App.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/initFirebase";
import Login from "./pages/Login";
import Config from "./pages/Config";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={user ? <Navigate to="/config" /> : <Login />}
      />

      {/* Rutas privadas */}
      <Route
        path="/config"
        element={user ? <Config /> : <Navigate to="/login" />}
      />

      {/* Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

// File: ConfirmModal.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/ConfirmModal.jsx
// src/components/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

// File: EntityColumn.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/EntityColumn.jsx
// src/pages/Config.jsx
import React from "react";
import EntityColumn from "../components/EntityColumn";

const Config = () => {
  // 👇 Aquí definimos tus entidades principales
  const entities = [
    {
      name: "Usuario",
      fields: [
        { label: "Nombre", type: "text" },
        { label: "Correo", type: "email" },
        { label: "Contraseña", type: "password" },
      ],
    },
    {
      name: "Máquina",
      fields: [
        { label: "Nombre de máquina", type: "text" },
        { label: "Modelo", type: "text" },
        { label: "Ubicación", type: "text" },
      ],
    },
    {
      name: "Pieza",
      fields: [
        { label: "Nombre de pieza", type: "text" },
        { label: "Código", type: "text" },
        { label: "Dimensiones", type: "text" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {entities.map((entity, idx) => (
        <EntityColumn key={idx} entity={entity} />
      ))}
    </div>
  );
};

export default Config;

// File: EntityForm.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/EntityForm.jsx
// src/components/EntityForm.jsx
import React, { useState, useEffect } from "react";

const EntityForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded shadow-md mb-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        className="border rounded w-full px-2 py-1 mb-2"
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        className="border rounded w-full px-2 py-1 mb-2"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default EntityForm;

// File: MachineForm.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/forms/MachineForm.jsx
// src/components/forms/MachineForm.jsx
import React, { useState, useEffect } from "react";

const MachineForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", tipo: "", estado: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <input
        name="nombre"
        placeholder="Nombre máquina"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="tipo"
        placeholder="Tipo"
        value={formData.tipo}
        onChange={handleChange}
        required
      />
      <input
        name="estado"
        placeholder="Estado"
        value={formData.estado}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {onCancel && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default MachineForm;

// File: PieceForm.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/forms/PieceForm.jsx
// src/components/forms/PieceForm.jsx
import React, { useState, useEffect } from "react";

const PieceForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    referencia: "",
    material: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", referencia: "", material: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <input
        name="nombre"
        placeholder="Nombre pieza"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="referencia"
        placeholder="Referencia"
        value={formData.referencia}
        onChange={handleChange}
        required
      />
      <input
        name="material"
        placeholder="Material"
        value={formData.material}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {onCancel && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default PieceForm;

// File: UserForm.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/forms/UserForm.jsx
// src/components/forms/UserForm.jsx
import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", correo: "", rol: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        type="email"
        required
      />
      <input
        name="rol"
        placeholder="Rol"
        value={formData.rol}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {onCancel && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default UserForm;

// File: Header.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/Header.jsx
import React, { useState } from "react";
import logo from "../assets/logo.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pb-4 bg-white lg:pb-0 shadow">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Navbar desktop */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" title="SmartFlow" className="flex items-center">
              <img
                className="w-auto h-8 lg:h-10"
                src={logo}
                alt="SmartFlow Logo"
              />
            </a>
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {/* Icono hamburguesa */}
            {!menuOpen && (
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}

            {/* Icono X */}
            {menuOpen && (
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          {/* Links desktop */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <a
              href="#features"
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
            >
              Solutions
            </a>
            <a
              href="#resources"
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
            >
              Resources
            </a>
            <a
              href="#pricing"
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
            >
              Pricing
            </a>
          </div>

          {/* Botón desktop */}
          <a
            href="#start"
            className="items-center justify-center hidden px-4 py-2 ml-6 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700"
          >
            Get started
          </a>
        </nav>

        {/* Menú móvil desplegable */}
        {menuOpen && (
          <nav className="pt-4 pb-6 mt-2 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                <a
                  href="#features"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#solutions"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                >
                  Solutions
                </a>
                <a
                  href="#resources"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                >
                  Resources
                </a>
                <a
                  href="#pricing"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600"
                >
                  Pricing
                </a>
              </div>
            </div>
            <div className="px-6 mt-4">
              <a
                href="#start"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Get started
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}



// File: MachineFormModal.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/MachineFormModal.jsx
import React, { useState, useEffect } from "react";

export default function MachineFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    reference: "",
    description: "",
    imageURL: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        reference: initialData.reference || "",
        description: initialData.description || "",
        imageURL: initialData.imageURL || "",
      });
    } else {
      setForm({
        name: "",
        reference: "",
        description: "",
        imageURL: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? "Editar Máquina" : "Crear Máquina"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la máquina"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="reference"
            placeholder="Referencia"
            value={form.reference}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="imageURL"
            placeholder="URL de la imagen"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// File: Notification.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/Notification.jsx
// src/components/Notification.jsx
import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-4 right-4`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;

// File: PieceFormModal.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/PieceFormModal.jsx
import React, { useState, useEffect } from "react";

export default function PieceFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    reference: "",
    description: "",
    imageURL: "",
    cycleTime: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        reference: initialData.reference || "",
        description: initialData.description || "",
        imageURL: initialData.imageURL || "",
        cycleTime: initialData.cycleTime || 0,
      });
    } else {
      setForm({
        name: "",
        reference: "",
        description: "",
        imageURL: "",
        cycleTime: 0,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, cycleTime: Number(form.cycleTime) });
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? "Editar Pieza" : "Crear Pieza"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la pieza"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="reference"
            placeholder="Referencia"
            value={form.reference}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="imageURL"
            placeholder="URL de la imagen"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="cycleTime"
            placeholder="Tiempo de ciclo (minutos)"
            value={form.cycleTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// File: UserFormModal.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/components/UserFormModal.jsx
import React, { useState, useEffect } from "react";

export default function UserFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    imageURL: "",
    position: "",
    role: "Operario",
  });

  // Precargar datos si estamos editando
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        imageURL: initialData.imageURL || "",
        position: initialData.position || "",
        role: initialData.role || "Operario",
      });
    } else {
      setForm({
        name: "",
        imageURL: "",
        position: "",
        role: "Operario",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="imageURL"
            placeholder="URL de la imagen"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="position"
            placeholder="Cargo"
            value={form.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          {/* Select fijo para rol */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Gerente">Gerente</option>
            <option value="Calidad">Calidad</option>
            <option value="Operario">Operario</option>
          </select>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white transition ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// File: initFirebase.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/firebase/initFirebase.js
// src/firebase/initFirebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Exporta servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// File: index.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/index.js
// src/hooks/index.js
export { default as useFetchUsers } from "./useFetchUsers";
export { default as useCreateUser } from "./useCreateUser";
export { default as useUpdateUser } from "./useUpdateUser";
export { default as useDeleteUser } from "./useDeleteUser";

export { default as useFetchMachines } from "./useFetchMachines";
export { default as useCreateMachine } from "./useCreateMachine";
export { default as useUpdateMachine } from "./useUpdateMachine";
export { default as useDeleteMachine } from "./useDeleteMachine";

export { default as useFetchPieces } from "./useFetchPieces";
export { default as useCreatePiece } from "./useCreatePiece";
export { default as useUpdatePiece } from "./useUpdatePiece";
export { default as useDeletePiece } from "./useDeletePiece";

// File: useCreateMachine.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useCreateMachine.js
import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    try {
      await addDoc(collection(db, "machines"), {
        ...machineData,
        timestamp: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error creando máquina:", error);
      return { success: false, error };
    }
  };

  return createMachine;
};

export default useCreateMachine;


// File: useCreateMachineType.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useCreateMachineType.js
import { db } from "../firebase/initFirebase";
import { collection, addDoc } from "firebase/firestore";

const useCreateMachineType = () => {
  const createMachineType = async (data) => {
    try {
      await addDoc(collection(db, "machineTypes"), data);
      return { success: true };
    } catch (error) {
      console.error("Error creando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return createMachineType;
};

export default useCreateMachineType;

// File: useCreatePiece.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useCreatePiece.js
// src/hooks/useCreatePiece.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useCreatePiece() {
  const createPiece = async (data) => {
    try {
      await addDoc(collection(db, "pieces"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      console.log("Pieza creada exitosamente");
    } catch (error) {
      console.error("Error al crear pieza:", error);
    }
  };

  return { createPiece };
}

// File: useCreatePieceCategory.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useCreatePieceCategory.js
import { db } from "../firebase/initFirebase";
import { collection, addDoc } from "firebase/firestore";

const useCreatePieceCategory = () => {
  const createPieceCategory = async (data) => {
    try {
      await addDoc(collection(db, "pieceCategories"), data);
      return { success: true };
    } catch (error) {
      console.error("Error creando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return createPieceCategory;
};

export default useCreatePieceCategory;

// File: useCreateUser.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useCreateUser.js
import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useCreateUser = () => {
  const createUser = async (userData) => {
    try {
      await addDoc(collection(db, "users"), {
        ...userData,
        timestamp: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error creando usuario:", error);
      return { success: false, error };
    }
  };

  return createUser;
};

export default useCreateUser;

// File: useDeleteMachine.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useDeleteMachine.js
import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteMachine = () => {
  const deleteMachine = async (id) => {
    try {
      await deleteDoc(doc(db, "machines", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando máquina:", error);
      return { success: false, error };
    }
  };

  return deleteMachine;
};

export default useDeleteMachine;


// File: useDeleteMachineType.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useDeleteMachineType.js
import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteMachineType = () => {
  const deleteMachineType = async (id) => {
    try {
      await deleteDoc(doc(db, "machineTypes", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return deleteMachineType;
};

export default useDeleteMachineType;

// File: useDeletePiece.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useDeletePiece.js
// src/hooks/useDeletePiece.js
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useDeletePiece() {
  const deletePiece = async (id) => {
    try {
      const pieceRef = doc(db, "pieces", id);
      await deleteDoc(pieceRef);
      console.log("Pieza eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar pieza:", error);
    }
  };

  return { deletePiece };
}


// File: useDeletePieceCategory.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useDeletePieceCategory.js
import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeletePieceCategory = () => {
  const deletePieceCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "pieceCategories", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return deletePieceCategory;
};

export default useDeletePieceCategory;

// File: useDeleteUser.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useDeleteUser.js
import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteUser = () => {
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      return { success: false, error };
    }
  };

  return deleteUser;
};

export default useDeleteUser;

// File: useFetchCollection.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchCollection.js
// src/hooks/useFetchCollection.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useFetchCollection(colName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`📡 Intentando leer colección: ${colName}`);
    console.log("db en hook:", db);

    try {
      const ref = collection(db, colName);
      const unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(`✅ Datos recibidos de ${colName}:`, results);
          setData(results);
          setLoading(false);
        },
        (error) => {
          console.error(`❌ Error al escuchar ${colName}:`, error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("🔥 Error general en useFetchCollection:", err);
      setLoading(false);
    }
  }, [colName]);

  return { data, loading };
}

// File: useFetchMachines.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchMachines.js
import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchMachines = () => {
  const fetchMachines = async () => {
    try {
      const snapshot = await getDocs(collection(db, "machines"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo máquinas:", error);
      return [];
    }
  };

  return fetchMachines;
};

export default useFetchMachines;

// File: useFetchMachineTypes.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchMachineTypes.js
// src/hooks/useFetchMachines.js
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useFetchMachines() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMachines(data);
    });

    // 👇 Limpia el listener al desmontar
    return () => unsubscribe();
  }, []);

  return { machines };
}

// File: useFetchPieceCategories.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchPieceCategories.js
import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchPieceCategories = () => {
  const fetchPieceCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pieceCategories"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo categorías de piezas:", error);
      return [];
    }
  };

  return fetchPieceCategories;
};

export default useFetchPieceCategories;

// File: useFetchPieces.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchPieces.js
import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchPieces = () => {
  const fetchPieces = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pieces"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo piezas:", error);
      return [];
    }
  };

  return fetchPieces;
};

export default useFetchPieces;


// File: useFetchUsers.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useFetchUsers.js
import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchUsers = () => {
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      return [];
    }
  };

  return fetchUsers;
};

export default useFetchUsers;

// File: useUpdateMachine.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useUpdateMachine.js
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdateMachine() {
  const updateMachine = async (id, data) => {
    try {
      const ref = doc(db, "machines", id);
      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      console.log("Máquina actualizada:", id);
    } catch (error) {
      console.error("Error al actualizar máquina:", error);
    }
  };

  return { updateMachine };
}


// File: useUpdateMachineType.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useUpdateMachineType.js
import { db } from "../firebase/initFirebase";
import { doc, updateDoc } from "firebase/firestore";

const useUpdateMachineType = () => {
  const updateMachineType = async (id, data) => {
    try {
      await updateDoc(doc(db, "machineTypes", id), data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return updateMachineType;
};

export default useUpdateMachineType;

// File: useUpdatePiece.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useUpdatePiece.js
// src/hooks/useUpdatePiece.js
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdatePiece() {
  const updatePiece = async (id, data) => {
    try {
      const pieceRef = doc(db, "pieces", id);
      await updateDoc(pieceRef, {
        ...data,
        timestamp: serverTimestamp(),
      });
      console.log("Pieza actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar pieza:", error);
    }
  };

  return { updatePiece };
}


// File: useUpdatePieceCategory.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useUpdatePieceCategory.js
import { db } from "../firebase/initFirebase";
import { doc, updateDoc } from "firebase/firestore";

const useUpdatePieceCategory = () => {
  const updatePieceCategory = async (id, data) => {
    try {
      await updateDoc(doc(db, "pieceCategories", id), data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return updatePieceCategory;
};

export default useUpdatePieceCategory;

// File: useUpdateUser.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/hooks/useUpdateUser.js
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdateUser() {
  const updateUser = async (id, data) => {
    try {
      const ref = doc(db, "users", id);
      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      console.log("Usuario actualizado:", id);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return { updateUser };
}

// File: main.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/main.jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// File: Config.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/Config.jsx
// src/pages/Config.jsx
import React from "react";
import EntityColumn from "../components/EntityColumn";
import Header from "../components/Header";
import useFetchCollection from "../hooks/useFetchCollection";
import { User, Settings, Package } from "lucide-react";

export default function Config() {
  console.log("Config: render");

  const { data: users, loading: loadingUsers } = useFetchCollection("users");
  const { data: machines, loading: loadingMachines } = useFetchCollection("machines");
  const { data: pieces, loading: loadingPieces } = useFetchCollection("pieces");

  console.log("users:", users);
  console.log("machines:", machines);
  console.log("pieces:", pieces);

  const loading = loadingUsers || loadingMachines || loadingPieces;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-8 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Configuración del Sistema
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <EntityColumn title="Usuarios" Icon={User} data={users} />
          <EntityColumn title="Máquinas" Icon={Settings} data={machines} />
          <EntityColumn title="Piezas" Icon={Package} data={pieces} />
        </div>
      </main>
    </div>
  );
}

// File: Config_Ant.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/Config_Ant.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  User,
  Settings,
  Package,
  Search,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

import useFetchCollection from "../hooks/useFetchCollection";
import useCreateUser from "../hooks/useCreateUser";
import useUpdateUser from "../hooks/useUpdateUser";
import useDeleteUser from "../hooks/useDeleteUser";
import useCreateMachine from "../hooks/useCreateMachine";
import useUpdateMachine from "../hooks/useUpdateMachine";
import useDeleteMachine from "../hooks/useDeleteMachine";
import useCreatePiece from "../hooks/useCreatePiece";
import useUpdatePiece from "../hooks/useUpdatePiece";
import useDeletePiece from "../hooks/useDeletePiece";

import { Dialog } from "@headlessui/react";
import Notification from "../components/Notification";

// Modal para previsualizar imágenes
function ImagePreview({ url, onClose }) {
  return (
    <Dialog open={!!url} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
          <img src={url} alt="Preview" className="w-full h-auto rounded" />
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Cerrar
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Formulario genérico
function EntityForm({ type, initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      position: "",
      role: "Operario",
      imageURL: "",
      description: "",
      reference: "",
      type: "",
      cycleTime: "",
      category: "",
      material: "",
    }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "Usuario") {
      if (!formData.name || !formData.position || !formData.role) {
        setError("Nombre, Cargo y Rol son obligatorios");
        return;
      }
    }
    if (type === "Máquina") {
      if (!formData.name || !formData.type) {
        setError("Nombre y Tipo son obligatorios");
        return;
      }
    }
    if (type === "Pieza") {
      if (!formData.name || !formData.category) {
        setError("Nombre y Categoría son obligatorios");
        return;
      }

      const cycleTimeValue = Number(formData.cycleTime);
      if (isNaN(cycleTimeValue) || cycleTimeValue <= 0) {
        setError("El tiempo de ciclo debe ser un número mayor a 0");
        return;
      }
    }

    setError("");
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-bold mb-4">
            {initialData ? `Editar ${type}` : `Crear ${type}`}
          </Dialog.Title>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Usuarios */}
            {type === "Usuario" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Cargo"
                  value={formData.position || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="Gerente">Gerente</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Operario">Operario</option>
                </select>
                <input
                  type="text"
                  name="imageURL"
                  placeholder="URL de imagen"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </>
            )}
            {/* Máquinas */}
            {type === "Máquina" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Tipo"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="imageURL"
                  placeholder="URL de imagen"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="reference"
                  placeholder="Referencia"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </>
            )}
            {/* Piezas */}
            {type === "Pieza" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Categoría"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  name="cycleTime"
                  placeholder="Tiempo de ciclo (minutos)"
                  value={formData.cycleTime}
                  onChange={handleChange}
                  step="any"
                  min="0.01"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="imageURL"
                  placeholder="URL de imagen"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="reference"
                  placeholder="Referencia"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  name="material"
                  placeholder="Material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {initialData ? "Guardar" : "Crear"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Confirmación de eliminación
function ConfirmDelete({ isOpen, onClose, onConfirm, entityName }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
          <p className="mb-4">¿Está seguro de eliminar {entityName}?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// Columna genérica
function EntityColumn({ title, Icon, data, onCreate, onUpdate, onDelete }) {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState(null);

  const filtered = (data || [])
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCreate = async (formData) => {
    await onCreate(formData);
    setNotification(`${title.slice(0, -1)} creado exitosamente`);
  };

  const handleUpdate = async (id, formData) => {
    await onUpdate(id, formData);
    setNotification(`${title.slice(0, -1)} actualizado exitosamente`);
  };

  const handleDelete = async (id) => {
    await onDelete(id);
    setNotification(`${title.slice(0, -1)} eliminado exitosamente`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-blue-600" size={22} />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder={`Buscar ${title.toLowerCase()}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <ul className="flex-1 space-y-3 overflow-y-auto">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3">
              {item.imageURL ? (
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer"
                  onClick={() => setPreviewImage(item.imageURL)}
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  <Icon size={20} />
                </div>
              )}
              <span className="text-gray-700 font-medium">{item.name}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="p-1 text-blue-600 hover:text-blue-800 transition"
                onClick={() => {
                  setEditingItem(item);
                  setShowForm(true);
                }}
              >
                <Edit size={18} />
              </button>
              <button
                className="p-1 text-red-500 hover:text-red-700 transition"
                onClick={() => {
                  setDeleteItem(item);
                  setShowDelete(true);
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center">
            No se encontraron resultados
          </p>
        )}
      </ul>

      <button
        className="mt-6 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
        onClick={() => {
          setEditingItem(null);
          setShowForm(true);
        }}
      >
        <Plus size={18} /> Crear {title.slice(0, -1)}
      </button>

      {showForm && (
        <EntityForm
          type={title.slice(0, -1)}
          initialData={editingItem}
          onSubmit={(data) =>
            editingItem
              ? handleUpdate(editingItem.id, data)
              : handleCreate(data)
          }
          onClose={() => setShowForm(false)}
        />
      )}

      {showDelete && deleteItem && (
        <ConfirmDelete
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            handleDelete(deleteItem.id);
            setShowDelete(false);
          }}
          entityName={deleteItem.name}
        />
      )}

      {previewImage && (
        <ImagePreview url={previewImage} onClose={() => setPreviewImage(null)} />
      )}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

// Vista principal
export default function Config() {
  const users = useFetchCollection("users");
  const machines = useFetchCollection("machines");
  const pieces = useFetchCollection("pieces");

  const { createUser } = useCreateUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const { createMachine } = useCreateMachine();
  const { updateMachine } = useUpdateMachine();
  const { deleteMachine } = useDeleteMachine();

  const { createPiece } = useCreatePiece();
  const { updatePiece } = useUpdatePiece();
  const { deletePiece } = useDeletePiece();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-8 py-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Configuración del Sistema
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <EntityColumn
            title="Usuarios"
            Icon={User}
            data={users}
            onCreate={createUser}
            onUpdate={updateUser}
            onDelete={deleteUser}
          />
          <EntityColumn
            title="Máquinas"
            Icon={Settings}
            data={machines}
            onCreate={createMachine}
            onUpdate={updateMachine}
            onDelete={deleteMachine}
          />
          <EntityColumn
            title="Piezas"
            Icon={Package}
            data={pieces}
            onCreate={createPiece}
            onUpdate={updatePiece}
            onDelete={deletePiece}
          />
        </div>
      </main>
    </div>
  );
}

// File: Config_U.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/Config_U.jsx
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

// File: CreateUserForm.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/CreateUserForm.jsx
import React, { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import Notification from "../components/Notification";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    imageURL: "",
    role: "",
  });

  const { createUser, notification, setNotification } = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
    setFormData({ name: "", position: "", imageURL: "", role: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Cargo"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />

        <input
          type="url"
          placeholder="URL de la imagen de perfil"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        />

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Seleccione rol</option>
          <option value="Gerente">Gerente</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Operario">Operario</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Usuario
        </button>
      </form>

      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
}

// File: Login.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/Login.jsx
// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import logo from "../assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("⚠️ Ingresa tu correo y contraseña");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login correcto:", userCredential.user);
      navigate("/config"); // aquí redirige a tu panel
    } catch (err) {
      console.error("❌ Error en login:", err.code, err.message);

      switch (err.code) {
        case "auth/user-not-found":
          setError("❌ El usuario no existe");
          break;
        case "auth/wrong-password":
          setError("❌ Contraseña incorrecta");
          break;
        case "auth/invalid-email":
          setError("❌ El correo no es válido");
          break;
        case "auth/too-many-requests":
          setError("❌ Demasiados intentos fallidos, intenta más tarde");
          break;
        default:
          setError("❌ Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        
        {/* Logo + título */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="SmartFlow Logo" className="h-16 w-16 mb-2" />
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            SmartFlow
          </h1>
          <p className="mt-2 text-gray-600 text-center text-sm">
            Inicia sesión para descubrir cómo optimizar el{" "}
            <span className="font-semibold">OEE</span> y potenciar el rendimiento de tu empresa.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          />

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-transform transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Recuperar acceso */}
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Recuperar acceso
          </a>
        </p>
      </div>
    </div>
  );
}

// File: MachinesPage.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/MachinesPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // asegúrate que apunte a tu initFirebase.js
import MachineFormModal from "../components/MachineFormModal";
import ConfirmModal from "../components/ConfirmModal";
import Notification from "../components/Notification";

export default function MachinesPage() {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState(null);

  const machinesRef = collection(db, "machines");

  // 🔄 Cargar máquinas desde Firestore
  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    const snapshot = await getDocs(machinesRef);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setMachines(data);
  };

  // ➕ Crear / ✏️ Editar
  const handleSave = async (machineData) => {
    try {
      if (selectedMachine) {
        const docRef = doc(db, "machines", selectedMachine.id);
        await updateDoc(docRef, machineData);
        setNotification("Máquina actualizada con éxito ✅");
      } else {
        await addDoc(machinesRef, machineData);
        setNotification("Máquina creada con éxito ✅");
      }
      setShowForm(false);
      setSelectedMachine(null);
      fetchMachines();
    } catch (err) {
      console.error(err);
      setNotification("❌ Error al guardar la máquina");
    }
  };

  // 🗑️ Eliminar
  const handleDelete = async () => {
    try {
      const docRef = doc(db, "machines", selectedMachine.id);
      await deleteDoc(docRef);
      setNotification("Máquina eliminada ✅");
      setShowConfirm(false);
      setSelectedMachine(null);
      fetchMachines();
    } catch (err) {
      console.error(err);
      setNotification("❌ Error al eliminar la máquina");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Máquinas</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setSelectedMachine(null);
          setShowForm(true);
        }}
      >
        ➕ Nueva Máquina
      </button>

      <ul className="mt-4">
        {machines.map((m) => (
          <li key={m.id} className="flex justify-between border-b py-2">
            <span>{m.name} – {m.type}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => {
                  setSelectedMachine(m);
                  setShowForm(true);
                }}
              >
                Editar
              </button>
              <button
                className="text-red-500"
                onClick={() => {
                  setSelectedMachine(m);
                  setShowConfirm(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <MachineFormModal
          machine={selectedMachine}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message={`¿Eliminar la máquina "${selectedMachine?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}


// File: UsersPage.jsx
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/pages/UsersPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import UserFormModal from "../components/UserFormModal";
import ConfirmModal from "../components/ConfirmModal";
import Notification from "../components/Notification";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState(null);

  const usersRef = collection(db, "users");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const snapshot = await getDocs(usersRef);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUsers(data);
  };

  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        const docRef = doc(db, "users", selectedUser.id);
        await updateDoc(docRef, userData);
        setNotification("Usuario actualizado ✅");
      } else {
        await addDoc(usersRef, userData);
        setNotification("Usuario creado ✅");
      }
      setShowForm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setNotification("❌ Error al guardar el usuario");
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "users", selectedUser.id);
      await deleteDoc(docRef);
      setNotification("Usuario eliminado ✅");
      setShowConfirm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setNotification("❌ Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setSelectedUser(null);
          setShowForm(true);
        }}
      >
        ➕ Nuevo Usuario
      </button>

      <ul className="mt-4">
        {users.map((u) => (
          <li key={u.id} className="flex justify-between border-b py-2">
            <span>{u.name} – {u.role}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => {
                  setSelectedUser(u);
                  setShowForm(true);
                }}
              >
                Editar
              </button>
              <button
                className="text-red-500"
                onClick={() => {
                  setSelectedUser(u);
                  setShowConfirm(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <UserFormModal
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message={`¿Eliminar al usuario "${selectedUser?.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}


// File: useMachines.test.js
// Path: /c/Users/javie/OneDrive/Escritorio/App_SmartFlow/tu-repositorio/src/tests/useMachines.test.js
import { describe, it, expect, vi } from "vitest";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  onSnapshot: vi.fn((q, onNext) => {
    onNext({ docs: [] });
    return () => {};
  }),
  query: vi.fn(),
  orderBy: vi.fn(),
}));

describe("useMachines hook", () => {
  it("exposes CRUD functions", async () => {
    const mod = await import("../src/hooks/useMachines");
    const useMachines = mod.default;
    const hook = useMachines();
    expect(hook).toHaveProperty("createMachine");
    expect(hook).toHaveProperty("updateMachine");
    expect(hook).toHaveProperty("deleteMachine");
  });
});

