import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/initFirebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/config"); // Redirección a Configuración
    } catch (err) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {/* Encabezado */}
        <h2 className="mb-2 text-center text-3xl font-extrabold text-gray-800">
          SmartFlow
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Ingresa tus credenciales para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 sm:text-sm"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 sm:text-sm"
              placeholder="********"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © 2025 SmartFlow. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
