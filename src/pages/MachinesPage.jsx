import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/initFirebase"; // asegúrate que apunte a tu initFirebase.js
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

