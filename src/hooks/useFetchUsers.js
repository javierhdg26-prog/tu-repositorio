import { db } from "../firebase/initFirebase";
import { collection, getDocs } from "firebase/firestore";

const useFetchUsers = () => {
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      return [];
    }
  };

  return fetchUsers;
};

export default useFetchUsers;
