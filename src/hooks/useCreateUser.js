import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function useCreateUser() {
  const createUser = async (data) => {
    try {
      await addDoc(collection(db, "users"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      console.log("✅ Usuario creado exitosamente");
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
    }
  };

  return { createUser };
}
