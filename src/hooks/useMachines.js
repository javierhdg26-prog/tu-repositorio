// src/hooks/useMachines.js
import { useEffect, useState, useCallback } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";

/**
 * useMachines - hook para CRUD de máquinas
 * Campos básicos:
 *  - name (nombre)
 *  - location (ubicación)
 *  - type (tipo de máquina)
 *  - status (activo/inactivo)
 */
export default function useMachines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "machines"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const arr = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMachines(arr);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const createMachine = useCallback(async (data) => {
    const colRef = collection(db, "machines");
    const payload = {
      name: data.name,
      location: data.location || "",
      type: data.type || "",
      status: data.status || "activo",
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(colRef, payload);
    return { id: docRef.id, ...payload };
  }, []);

  const updateMachine = useCallback(async (id, partial) => {
    const docRef = doc(db, "machines", id);
    await updateDoc(docRef, {
      ...partial,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const deleteMachine = useCallback(async (id) => {
    const docRef = doc(db, "machines", id);
    await deleteDoc(docRef);
  }, []);

  return {
    machines,
    loading,
    error,
    createMachine,
    updateMachine,
    deleteMachine,
  };
}
