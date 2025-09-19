import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteMachineType = () => {
  const deleteMachineType = async (id) => {
    try {
      await deleteDoc(doc(db, "machineTypes", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return deleteMachineType;
};

export default useDeleteMachineType;
