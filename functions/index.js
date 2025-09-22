const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Función genérica para auditar cambios en cualquier colección
async function logChange(changeType, collection, beforeData, afterData, userID) {
  const changes = [];

  if (changeType === "create") {
    for (const [field, value] of Object.entries(afterData)) {
      changes.push({
        field,
        initialValue: null,
        finalValue: value,
      });
    }
  } else if (changeType === "delete") {
    for (const [field, value] of Object.entries(beforeData)) {
      changes.push({
        field,
        initialValue: value,
        finalValue: null,
      });
    }
  } else if (changeType === "update") {
    for (const [field, newValue] of Object.entries(afterData)) {
      const oldValue = beforeData[field];
      if (oldValue !== newValue) {
        changes.push({
          field,
          initialValue: oldValue ?? null,
          finalValue: newValue ?? null,
        });
      }
    }
  }

  if (changes.length > 0) {
    await db.collection("transactionLogs").add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      userID: userID || "system",
      collection,
      action: changeType,
      changes,
    });
  }
}

// Helper para crear funciones onWrite
function createAuditTrigger(collection) {
  return functions.firestore
    .document(`${collection}/{docId}`)
    .onWrite(async (change, context) => {
      const beforeData = change.before.exists ? change.before.data() : null;
      const afterData = change.after.exists ? change.after.data() : null;

      let action = "unknown";
      if (!beforeData && afterData) action = "create";
      else if (beforeData && !afterData) action = "delete";
      else if (beforeData && afterData) action = "update";

      const userID = afterData?.userID || beforeData?.userID || "unknown";

      await logChange(action, collection, beforeData, afterData, userID);
    });
}

// Exportar triggers para users, machines y pieces
exports.auditUsers = createAuditTrigger("users");
exports.auditMachines = createAuditTrigger("machines");
exports.auditPieces = createAuditTrigger("pieces");
