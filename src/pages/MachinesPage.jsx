// src/pages/MachinesPage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
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

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const snapshot = await getDocs(machinesRef);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMachines(data);
    } catch (err) {
      console.error("Error fetching machines:", err);
      setNotification("❌ Error cargando máquinas");
    }
  };

  const handleSave = async (machineData) => {
    try {
      const { name, reference, description, imageURL, type } = machineData;

      if (selectedMachine) {
        const docRef = doc(db, "machines", selectedMachine.id);
        await updateDoc(docRef, { name, reference, description, imageURL, type, timestamp: serverTimestamp() });
        setNotification("Máquina actualizada ✅");
      } else {
        await addDoc(machinesRef, { name, reference, description, imageURL, type, timestamp: serverTimestamp() });
        setNotification("Máquina creada ✅");
      }

      setShowForm(false);
      setSelectedMachine(null);
      fetchMachines();
    } catch (err) {
      console.error("Error saving machine:", err);
      setNotification("❌ Error al guardar la máquina");
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "machines", selectedMachine.id);
      await deleteDoc(docRef);
      setNotification("Máquina eliminada ✅");
      setShowConfirm(false);
      setSelectedMachine(null);
      fetchMachines();
    } catch (err) {
      console.error("Error deleting machine:", err);
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

