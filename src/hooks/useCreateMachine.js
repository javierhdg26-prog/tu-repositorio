import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    const { name, reference, description, imageURL, type } = machineData;

    await addDoc(collection(db, "machines"), {
      name,
      reference,
      description,
      imageURL,
      type,
      timestamp: serverTimestamp(),
    });
  };

  return { createMachine }; // ✅ Devuelve un objeto con createMachine
};

export default useCreateMachine;
