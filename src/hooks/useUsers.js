// src/hooks/useUsers.js
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

// Recuerda que initFirebase.js ya inicializa la app y exporta `db`.
// Si prefieres usar getFirestore() aquí, lo dejamos por claridad.
import { db } from "../firebase/initFirebase";

/**
 * useUsers - hook para CRUD de users (Firestore)
 * Devuelve:
 *  - users: lista en tiempo real
 *  - loading: booleano
 *  - error: error object/string
 *  - createUser(data)
 *  - updateUser(id, partialData)
 *  - deleteUser(id)
 */
export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), orderBy("name", "asc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arr = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setUsers(arr);
          setLoading(false);
        },
        (err) => {
          console.error("users onSnapshot error:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data) => {
    try {
      // Validate minimal
      if (!data.name || !data.role) {
        throw new Error("El usuario debe tener nombre y role");
      }
      const colRef = collection(db, "users");
      const payload = {
        name: data.name,
        imageURL: data.imageURL || "",
        position: data.position || "",
        role: data.role,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(colRef, payload);
      return { id: docRef.id, ...payload };
    } catch (err) {
      console.error("createUser error", err);
      throw err;
    }
  }, []);

  const updateUser = useCallback(async (id, partial) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        ...partial,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error("updateUser error", err);
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error("deleteUser error", err);
      throw err;
    }
  }, []);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
}
