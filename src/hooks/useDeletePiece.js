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

