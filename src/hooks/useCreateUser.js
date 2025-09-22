import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function useCreateUser() {
  const createUser = async (data) => {
    try {
      await addDoc(collection(db, "users"), {
        userID: data.userID || "",
        name: data.name || "",
        imageURL: data.imageURL || "",
        position: data.position || "",
        role: data.role || "",
        createdAt: serverTimestamp(),
      });
      console.log("Usuario creado:", data.name);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };
  return { createUser };
}
