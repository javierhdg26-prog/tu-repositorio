import React, { useState } from "react";
import useCreateUser from "../hooks/useCreateUser";
import Notification from "../components/Notification";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    imageURL: "",
    role: "",
  });

  const { createUser, notification, setNotification } = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
    setFormData({ name: "", position: "", imageURL: "", role: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Cargo"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />

        <input
          type="url"
          placeholder="URL de la imagen de perfil"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        />

        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Seleccione rol</option>
          <option value="Gerente">Gerente</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Operario">Operario</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Usuario
        </button>
      </form>

      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
}
