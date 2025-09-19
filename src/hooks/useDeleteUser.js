import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteUser = () => {
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      return { success: false, error };
    }
  };

  return deleteUser;
};

export default useDeleteUser;
