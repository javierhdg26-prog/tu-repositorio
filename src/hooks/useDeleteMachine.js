import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteMachine = () => {
  const deleteMachine = async (id) => {
    try {
      await deleteDoc(doc(db, "machines", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando máquina:", error);
      return { success: false, error };
    }
  };

  return deleteMachine;
};

export default useDeleteMachine;

