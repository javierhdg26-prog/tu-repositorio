import React from "react";
import { Settings } from "lucide-react";

const EntityColumn = ({ title, Icon, data, onEdit, onDelete, onGearClick }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 relative border border-gray-200">
      {/* Encabezado con título e icono de engranaje */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Engranaje visible */}
        <button
          onClick={onGearClick}
          className="p-2 text-gray-500 hover:text-blue-600 transition rounded-full hover:bg-blue-50"
          title="Configuración"
        >
          <Settings size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-3">
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-gray-700 font-medium">{item.name}</span>
              <div className="flex gap-2">
                <button
                  className="p-1 text-blue-600 hover:text-blue-800 transition"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="p-1 text-red-500 hover:text-red-700 transition"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay registros</p>
        )}
      </div>
    </div>
  );
};

export default EntityColumn;
