import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/initFirebase";

/**
 * Registra una transacción en Firestore
 * @param {string} collectionName - Nombre de la colección afectada
 * @param {string} action - Acción: "create", "update", "delete"
 * @param {object} beforeData - Datos antes del cambio (opcional)
 * @param {object} afterData - Datos después del cambio (opcional)
 */
export async function logTransaction(collectionName, action, beforeData = {}, afterData = {}) {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, "transactionLogs"), {
      userId: user ? user.uid : "anonymous",
      collection: collectionName,
      action,
      beforeData,
      afterData,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error registrando log:", error);
  }
}
