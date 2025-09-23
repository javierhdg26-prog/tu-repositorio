#!/bin/bash
# Archivo: aplicar_hooks_maquinas.sh
# Uso: bash aplicar_hooks_maquinas.sh

# Crear carpeta hooks si no existe
mkdir -p src/hooks

# Sobrescribir useCreateMachine.js
cat > src/hooks/useCreateMachine.js << 'EOF'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

const useCreateMachine = () => {
  const createMachine = async (machineData) => {
    try {
      // Filtrar solo los campos válidos
      const { name, reference, description, imageURL, type } = machineData;

      const docRef = await addDoc(collection(db, "machines"), {
        name,
        reference,
        description,
        imageURL,
        type,
        timestamp: serverTimestamp(),
      });

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creando máquina:", error);
      return { success: false, error };
    }
  };

  return createMachine;
};

export default useCreateMachine;
EOF

echo "Hook useCreateMachine.js actualizado correctamente."
