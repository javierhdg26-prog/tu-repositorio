import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useDeleteMachine = () => {
  const deleteMachine = async (id) => {
    try {
      const ref = doc(db, "machines", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Máquina no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in beforeData) filteredData[f] = beforeData[f];
      });

      await deleteDoc(ref);
      await logTransaction("machines", "delete", filteredData, {});

      return { success: true };
    } catch (error) {
      console.error("Error eliminando máquina:", error);
      return { success: false, error };
    }
  };

  return { deleteMachine };
};

export default useDeleteMachine;
