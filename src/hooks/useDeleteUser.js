import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useDeleteUser() {
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      console.log("✅ Usuario eliminado:", id);
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  return { deleteUser };
}
