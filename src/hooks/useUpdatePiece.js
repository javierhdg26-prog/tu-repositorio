// src/hooks/useUpdatePiece.js
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdatePiece() {
  const updatePiece = async (id, data) => {
    try {
      const ref = doc(db, "pieces", id);
      await updateDoc(ref, {
        name: data.name,
        description: data.description || "",
        reference: data.reference || "",
        category: data.category,
        cycleTime: Number(data.cycleTime),
        imageURL: data.imageURL || "",
        updatedAt: serverTimestamp(),
      });
      console.log("✅ Pieza actualizada:", id);
    } catch (error) {
      console.error("❌ Error al actualizar pieza:", error);
    }
  };

  return { updatePiece };
}
