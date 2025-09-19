import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdateMachine() {
  const updateMachine = async (id, data) => {
    try {
      const ref = doc(db, "machines", id);
      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      console.log("✅ Máquina actualizada:", id);
    } catch (error) {
      console.error("❌ Error al actualizar máquina:", error);
    }
  };

  return { updateMachine };
}
