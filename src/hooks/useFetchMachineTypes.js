// src/hooks/useFetchMachines.js
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

export default function useFetchMachines() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMachines(data);
    });

    // 👇 Limpia el listener al desmontar
    return () => unsubscribe();
  }, []);

  return { machines };
}
