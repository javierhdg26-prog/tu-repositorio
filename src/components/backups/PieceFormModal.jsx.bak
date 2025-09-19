import React, { useState, useEffect } from "react";

  const [form, setForm] = useState({
    name: "",
    reference: "",
    description: "",
    imageURL: "",
    cycleTime: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        reference: initialData.reference || "",
        description: initialData.description || "",
        imageURL: initialData.imageURL || "",
        cycleTime: initialData.cycleTime || 0,
      });
    } else {
      setForm({
        name: "",
        reference: "",
        description: "",
        imageURL: "",
        cycleTime: 0,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, cycleTime: Number(form.cycleTime) });
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? "Editar Pieza" : "Crear Pieza"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la pieza"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="reference"
            placeholder="Referencia"
            value={form.reference}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="imageURL"
            placeholder="URL de la imagen"
            value={form.imageURL}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="cycleTime"
            placeholder="Tiempo de ciclo (minutos)"
            value={form.cycleTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
