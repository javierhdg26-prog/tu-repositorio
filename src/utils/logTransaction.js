import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/initFirebase";

/**
 * Registra una transacción en Firestore (colección transactionLogs)
 */
export async function logTransaction(collectionName, action, beforeData = {}, afterData = {}) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    let changes = [];

    if (action === "create") {
      changes = Object.keys(afterData).map(field => ({
        field,
        initialValue: null,
        finalValue: afterData[field]
      }));
    } else if (action === "delete") {
      changes = Object.keys(beforeData).map(field => ({
        field,
        initialValue: beforeData[field],
        finalValue: null
      }));
    } else if (action === "update") {
      changes = Object.keys(afterData).reduce((acc, field) => {
        if (beforeData[field] !== afterData[field]) {
          acc.push({
            field,
            initialValue: beforeData[field] ?? null,
            finalValue: afterData[field] ?? null
          });
        }
        return acc;
      }, []);
    }

    await addDoc(collection(db, "transactionLogs"), {
      timestamp: serverTimestamp(),
      userID: user.uid,
      collection: collectionName,
      action,
      changes
    });
  } catch (error) {
    console.error("Error registrando log:", error);
  }
}
