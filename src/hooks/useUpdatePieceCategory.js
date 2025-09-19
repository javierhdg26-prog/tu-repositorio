import { db } from "../firebase/initFirebase";
import { doc, updateDoc } from "firebase/firestore";

const useUpdatePieceCategory = () => {
  const updatePieceCategory = async (id, data) => {
    try {
      await updateDoc(doc(db, "pieceCategories", id), data);
      return { success: true };
    } catch (error) {
      console.error("Error actualizando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return updatePieceCategory;
};

export default useUpdatePieceCategory;
