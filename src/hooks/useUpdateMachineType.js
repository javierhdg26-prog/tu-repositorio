import { db } from "../firebase/initFirebase";
import { doc, updateDoc } from "firebase/firestore";

const useUpdateMachineType = () => {
  const updateMachineType = async (id, data) => {
    try {
      await updateDoc(doc(db, "machineTypes", id), data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return updateMachineType;
};

export default useUpdateMachineType;
