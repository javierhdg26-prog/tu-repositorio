// src/components/forms/PieceForm.jsx
import React, { useState, useEffect } from "react";

const PieceForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    referencia: "",
    material: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", referencia: "", material: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <input
        name="nombre"
        placeholder="Nombre pieza"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="referencia"
        placeholder="Referencia"
        value={formData.referencia}
        onChange={handleChange}
        required
      />
      <input
        name="material"
        placeholder="Material"
        value={formData.material}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      {onCancel && <button onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

