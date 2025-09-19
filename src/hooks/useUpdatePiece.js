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

