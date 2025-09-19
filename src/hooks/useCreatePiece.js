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
