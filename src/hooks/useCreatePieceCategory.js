import { db } from "../firebase/initFirebase";
import { collection, addDoc } from "firebase/firestore";

const useCreatePieceCategory = () => {
  const createPieceCategory = async (data) => {
    try {
      await addDoc(collection(db, "pieceCategories"), data);
      return { success: true };
    } catch (error) {
      console.error("Error creando categoría de pieza:", error);
      return { success: false, error };
    }
  };

  return createPieceCategory;
};

export default useCreatePieceCategory;
