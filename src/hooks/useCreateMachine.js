import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    try {
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (machineData[f]) filteredData[f] = machineData[f];
      });

      const docRef = await addDoc(collection(db, "machines"), {
        ...filteredData,
        timestamp: serverTimestamp(),
      });

      await logTransaction("machines", "create", {}, { id: docRef.id, ...filteredData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando máquina:", error);
      return { success: false, error };
    }
  };

  return { createMachine };
};

export default useCreateMachine;
