import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useDeleteUser = () => {
  const deleteUser = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("Usuario no encontrado");

      const beforeData = userSnap.data();
      const allowedFields = ["name", "imageURL", "position", "role"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in beforeData) filteredData[f] = beforeData[f];
      });

      await deleteDoc(userRef);
      await logTransaction("users", "delete", filteredData, {});

      return { success: true };
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      return { success: false, error };
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
