import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useDeleteMachine() {
  const deleteMachine = async (id) => {
    try {
      await deleteDoc(doc(db, "machines", id));
      console.log("✅ Máquina eliminada:", id);
    } catch (error) {
      console.error("❌ Error al eliminar máquina:", error);
    }
  };

  return { deleteMachine };
}
