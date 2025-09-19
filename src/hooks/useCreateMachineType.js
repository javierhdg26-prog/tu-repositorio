import { db } from "../firebase/initFirebase";
import { collection, addDoc } from "firebase/firestore";

const useCreateMachineType = () => {
  const createMachineType = async (data) => {
    try {
      await addDoc(collection(db, "machineTypes"), data);
      return { success: true };
    } catch (error) {
      console.error("Error creando tipo de máquina:", error);
      return { success: false, error };
    }
  };

  return createMachineType;
};

export default useCreateMachineType;
