#!/bin/bash
# =========================================
# Script para actualizar hooks de auditoría
# Usuarios | Máquinas | Piezas
# =========================================

echo "🔄 Actualizando auditorías en hooks..."

# ---------------------
# Users
# ---------------------
cat > src/hooks/useCreateUser.js << 'EOF'
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
EOF

cat > src/hooks/useUpdateUser.js << 'EOF'
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
EOF

cat > src/hooks/useDeleteUser.js << 'EOF'
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
EOF

# ---------------------
# Machines
# ---------------------
cat > src/hooks/useCreateMachine.js << 'EOF'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    try {
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (machineData[f]) filteredData[f] = machineData[f];
      });

      const docRef = await addDoc(collection(db, "machines"), {
        ...filteredData,
        timestamp: serverTimestamp(),
      });

      await logTransaction("machines", "create", {}, { id: docRef.id, ...filteredData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando máquina:", error);
      return { success: false, error };
    }
  };

  return { createMachine };
};

export default useCreateMachine;
EOF

cat > src/hooks/useUpdateMachine.js << 'EOF'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useUpdateMachine = () => {
  const updateMachine = async (id, updatedData) => {
    try {
      const ref = doc(db, "machines", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Máquina no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in updatedData) filteredData[f] = updatedData[f];
      });

      await updateDoc(ref, filteredData);
      await logTransaction("machines", "update", beforeData, filteredData);

      return { success: true };
    } catch (error) {
      console.error("Error actualizando máquina:", error);
      return { success: false, error };
    }
  };

  return { updateMachine };
};

export default useUpdateMachine;
EOF

cat > src/hooks/useDeleteMachine.js << 'EOF'
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useDeleteMachine = () => {
  const deleteMachine = async (id) => {
    try {
      const ref = doc(db, "machines", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Máquina no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "type", "description", "imageURL", "reference"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in beforeData) filteredData[f] = beforeData[f];
      });

      await deleteDoc(ref);
      await logTransaction("machines", "delete", filteredData, {});

      return { success: true };
    } catch (error) {
      console.error("Error eliminando máquina:", error);
      return { success: false, error };
    }
  };

  return { deleteMachine };
};

export default useDeleteMachine;
EOF

# ---------------------
# Pieces
# ---------------------
cat > src/hooks/useCreatePiece.js << 'EOF'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useCreatePiece = () => {
  const createPiece = async (pieceData) => {
    try {
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (pieceData[f]) filteredData[f] = pieceData[f];
      });

      const docRef = await addDoc(collection(db, "pieces"), {
        ...filteredData,
        timestamp: serverTimestamp(),
      });

      await logTransaction("pieces", "create", {}, { id: docRef.id, ...filteredData });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando pieza:", error);
      return { success: false, error };
    }
  };

  return { createPiece };
};

export default useCreatePiece;
EOF

cat > src/hooks/useUpdatePiece.js << 'EOF'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useUpdatePiece = () => {
  const updatePiece = async (id, updatedData) => {
    try {
      const ref = doc(db, "pieces", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Pieza no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in updatedData) filteredData[f] = updatedData[f];
      });

      await updateDoc(ref, filteredData);
      await logTransaction("pieces", "update", beforeData, filteredData);

      return { success: true };
    } catch (error) {
      console.error("Error actualizando pieza:", error);
      return { success: false, error };
    }
  };

  return { updatePiece };
};

export default useUpdatePiece;
EOF

cat > src/hooks/useDeletePiece.js << 'EOF'
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { logTransaction } from "../utils/logTransaction";

const useDeletePiece = () => {
  const deletePiece = async (id) => {
    try {
      const ref = doc(db, "pieces", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Pieza no encontrada");

      const beforeData = snap.data();
      const allowedFields = ["name", "category", "cycleTime", "description", "imageURL", "reference", "material"];
      const filteredData = {};
      allowedFields.forEach((f) => {
        if (f in beforeData) filteredData[f] = beforeData[f];
      });

      await deleteDoc(ref);
      await logTransaction("pieces", "delete", filteredData, {});

      return { success: true };
    } catch (error) {
      console.error("Error eliminando pieza:", error);
      return { success: false, error };
    }
  };

  return { deletePiece };
};

export default useDeletePiece;
EOF

echo "✅ Auditorías actualizadas con éxito."
