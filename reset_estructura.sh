#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob
DELETE_PATTERNS=( "src" "public" "index.html" "vite.config.*" "tailwind.config.*" "postcss.config.*" "package-lock.json" )

echo "ADVERTENCIA: Se van a eliminar (si existen):"
for p in "${DELETE_PATTERNS[@]}"; do
  for f in $p; do
    echo "  - $f"
  done
done

read -p "¿Seguro que quieres continuar y eliminar estos archivos? (y/n): " confirm
if [[ $confirm != "y" ]]; then
  echo "Operación cancelada."
  exit 1
fi

echo "🧹 Borrando..."
for p in "${DELETE_PATTERNS[@]}"; do
  for f in $p; do
    if [ -e "$f" ]; then
      rm -rf "$f"
      echo "   ✅ Eliminado: $f"
    fi
  done
done

echo "📁 Creando nueva estructura..."
mkdir -p src/{firebase,pages,components,hooks,utils,styles}

# Archivos base
cat > src/App.jsx <<'JS'
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
JS

cat > src/main.jsx <<'JS'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
JS

cat > src/index.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;
CSS

cat > src/firebase/initFirebase.js <<'JS'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
JS

cat > src/pages/Login.jsx <<'JS'
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/initFirebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/config";
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">SmartFlow Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          className="w-full mb-4 p-3 border rounded-xl"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border rounded-xl"
          required
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">
          Ingresar
        </button>
      </form>
    </div>
  );
}
JS

cat > src/pages/Config.jsx <<'JS'
export default function Config() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Página de Configuración</h1>
      <p className="mt-4">Aquí irá el CRUD de usuarios, máquinas y piezas.</p>
    </div>
  );
}
JS

echo "✅ Estructura creada. Ahora ejecuta: npm install && npm run dev"
