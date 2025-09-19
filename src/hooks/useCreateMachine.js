import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    try {
      await addDoc(collection(db, "machines"), {
        ...machineData,
        timestamp: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error creando máquina:", error);
      return { success: false, error };
    }
  };

  return createMachine;
};

export default useCreateMachine;

