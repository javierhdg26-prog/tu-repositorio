import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useUpdateUser() {
  const updateUser = async (id, data) => {
    try {
      const ref = doc(db, "users", id);
      await updateDoc(ref, {
        userID: data.userID || "",
        name: data.name || "",
        imageURL: data.imageURL || "",
        position: data.position || "",
        role: data.role || "",
        updatedAt: serverTimestamp(),
      });
      console.log("Usuario actualizado:", id);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };
  return { updateUser };
}
