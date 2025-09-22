import { db } from "../firebase/initFirebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function useCreateUser() {
  const createUser = async (data) => {
    try {
      const newDoc = doc(collection(db, "users"));
      await setDoc(newDoc, {
        userID: newDoc.id,
        name: data.name,
        imageURL: data.imageURL || "",
        position: data.position || "",
        role: data.role || "Operario",
        timestamp: serverTimestamp(),
      });
      console.log("✅ Usuario creado con ID:", newDoc.id);
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
    }
  };

  return { createUser };
}
