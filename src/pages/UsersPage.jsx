import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
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

