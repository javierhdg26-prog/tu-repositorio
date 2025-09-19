import React from "react";

const MachineList = ({ machines, onEdit, onDelete }) => {
  if (!machines || machines.length === 0) {
    return <p className="text-gray-600">No hay máquinas registradas.</p>;
  }

  return (
    <div className="grid gap-4">
      {machines.map((machine) => (
        <div
          key={machine.id}
          className="border border-gray-300 rounded-lg p-4 shadow-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">{machine.name}</h3>
            <p className="text-sm text-gray-600">{machine.reference}</p>
            <p className="text-sm text-gray-500">{machine.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(machine)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(machine.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MachineList;
