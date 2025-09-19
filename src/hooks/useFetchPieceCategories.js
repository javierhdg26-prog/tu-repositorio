import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchPieceCategories = () => {
  const fetchPieceCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pieceCategories"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo categorías de piezas:", error);
      return [];
    }
  };

  return fetchPieceCategories;
};

export default useFetchPieceCategories;
