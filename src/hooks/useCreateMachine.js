import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function useCreateMachine() {
  const createMachine = async (data) => {
    try {
      await addDoc(collection(db, "machines"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      console.log("✅ Máquina creada exitosamente");
    } catch (error) {
      console.error("❌ Error al crear máquina:", error);
    }
  };

  return { createMachine };
}
