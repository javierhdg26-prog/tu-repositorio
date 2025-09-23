import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useUpdateUser = () => {
  const updateUser = async (id, updatedData) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("Usuario no encontrado");

      const beforeData = userSnap.data();
      const allowedFields = ["name", "imageURL", "position", "role"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in updatedData) filteredData[f] = updatedData[f];
      });

      await updateDoc(userRef, filteredData);
      await logTransaction("users", "update", beforeData, filteredData);

      return { success: true };
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      return { success: false, error };
    }
  };

  return { updateUser };
};

export default useUpdateUser;
