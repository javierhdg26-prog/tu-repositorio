import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchMachines = () => {
  const fetchMachines = async () => {
    try {
      const snapshot = await getDocs(collection(db, "machines"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo máquinas:", error);
      return [];
    }
  };

  return fetchMachines;
};

export default useFetchMachines;
