import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreateUser = () => {
  const createUser = async (userData) => {
    try {
      const allowedFields = ["name", "imageURL", "position", "role"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (userData[f]) filteredData[f] = userData[f];
      });

      const docRef = await addDoc(collection(db, "users"), {
        ...filteredData,
        timestamp: serverTimestamp(),
      });

      await logTransaction("users", "create", {}, { id: docRef.id, ...filteredData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando usuario:", error);
      return { success: false, error };
    }
  };

  return { createUser };
};

export default useCreateUser;
