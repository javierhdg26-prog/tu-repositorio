import { db } from "../firebase/initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const useDeletePieceCategory = () => {
  const deletePieceCategory = async (id) => {
    try {
      await deleteDoc(doc(db, "pieceCategories", id));
      return { success: true };
    } catch (error) {
      console.error("Error eliminando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return deletePieceCategory;
};

export default useDeletePieceCategory;
