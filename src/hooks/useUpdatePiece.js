import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useUpdatePiece = () => {
  const updatePiece = async (id, updatedData) => {
    try {
      const ref = doc(db, "pieces", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Pieza no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in updatedData) filteredData[f] = updatedData[f];
      });

      await updateDoc(ref, filteredData);
      await logTransaction("pieces", "update", beforeData, filteredData);

      return { success: true };
    } catch (error) {
      console.error("Error actualizando pieza:", error);
      return { success: false, error };
    }
  };

  return { updatePiece };
};

export default useUpdatePiece;
