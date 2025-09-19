import { db } from "../firebase/initFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useCreateUser = () => {
  const createUser = async (userData) => {
    try {
      await addDoc(collection(db, "users"), {
        ...userData,
        timestamp: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error creando usuario:", error);
      return { success: false, error };
    }
  };

  return createUser;
};

export default useCreateUser;
