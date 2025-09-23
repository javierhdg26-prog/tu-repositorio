import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useDeletePiece = () => {
  const deletePiece = async (id) => {
    try {
      const ref = doc(db, "pieces", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Pieza no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in beforeData) filteredData[f] = beforeData[f];
      });

      await deleteDoc(ref);
      await logTransaction("pieces", "delete", filteredData, {});

      return { success: true };
    } catch (error) {
      console.error("Error eliminando pieza:", error);
      return { success: false, error };
    }
  };

  return { deletePiece };
};

export default useDeletePiece;
