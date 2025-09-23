import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreatePiece = () => {
  const createPiece = async (pieceData) => {
    try {
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (pieceData[f]) filteredData[f] = pieceData[f];
      });

      const docRef = await addDoc(collection(db, "pieces"), {
        ...filteredData,
        timestamp: serverTimestamp(),
      });

      await logTransaction("pieces", "create", {}, { id: docRef.id, ...filteredData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando pieza:", error);
      return { success: false, error };
    }
  };

  return { createPiece };
};

export default useCreatePiece;
