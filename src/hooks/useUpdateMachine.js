import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useUpdateMachine = () => {
  const updateMachine = async (id, updatedData) => {
    try {
      const ref = doc(db, "machines", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Máquina no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in updatedData) filteredData[f] = updatedData[f];
      });

      await updateDoc(ref, filteredData);
      await logTransaction("machines", "update", beforeData, filteredData);

      return { success: true };
    } catch (error) {
      console.error("Error actualizando máquina:", error);
      return { success: false, error };
    }
  };

  return { updateMachine };
};

export default useUpdateMachine;
