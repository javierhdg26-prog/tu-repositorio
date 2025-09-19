import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchPieces = () => {
  const fetchPieces = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pieces"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo piezas:", error);
      return [];
    }
  };

  return fetchPieces;
};

export default useFetchPieces;

