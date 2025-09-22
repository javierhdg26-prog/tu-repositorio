// src/hooks/useCreatePiece.js
import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function useCreatePiece() {
  const createPiece = async (data) => {
    try {
      await addDoc(collection(db, "pieces"), {
        name: data.name,
        description: data.description || "",
        reference: data.reference || "",
        category: data.category,
        cycleTime: Number(data.cycleTime),
        imageURL: data.imageURL || "",
        timestamp: serverTimestamp(),
      });
      console.log("✅ Pieza creada exitosamente");
    } catch (error) {
      console.error("❌ Error al crear pieza:", error);
    }
  };

  return { createPiece };
}
