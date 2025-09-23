import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreateUser = () => {
  const createUser = async (userData) => {
    try {
      // Solo campos válidos para 'users'
      const validUserData = {
        name: userData.name,
        imageURL: userData.imageURL,
        position: userData.position,
        role: userData.role,
      };

      // Crear usuario en Firestore
      const docRef = await addDoc(collection(db, "users"), {
        ...validUserData,
        userID: "", // opcional, si quieres un userID aparte
        createdAt: serverTimestamp(),
      });

      // Auditoría: registrar solo los campos válidos
      await logTransaction("users", "create", {}, { id: docRef.id, ...validUserData });

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando usuario:", error);
      return { success: false, error };
    }
  };

  return { createUser };
};

export default useCreateUser;
