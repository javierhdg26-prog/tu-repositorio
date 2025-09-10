// src/pages/Config.jsx
import React, { useState } from "react";
import useUsers from "../hooks/useUsers";

/**
 * Config page: grid 2x3 (A1-B3)
 * A1: Crear Usuario
 * B1: Buscar/Editar Usuarios
 * A2/B2/A3/B3: placeholders para Máquinas y Piezas
 */

function UserForm({ onCreate }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("operario");
  const [imageURL, setImageURL] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      await onCreate({ name, position, role, imageURL });
      setName("");
      setPosition("");
      setRole("operario");
      setImageURL("");
    } catch (error) {
      setErr(error.message || "Error creando usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-3">Crear Usuario</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Cargo / posición"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="URL de imagen (opcional)"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="operario">Operario</option>
          <option value="supervisor">Supervisor</option>
          <option value="gerente">Gerente</option>
        </select>

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <button
          type="submit"
          className="w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}

function UsersTable({ users, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [local, setLocal] = useState({ name: "", position: "", role: "" });

  const startEdit = (u) => {
    setEditingId(u.id);
    setLocal({ name: u.name || "", position: u.position || "", role: u.role || "operario" });
  };

  const save = async () => {
    if (!editingId) return;
    await onUpdate(editingId, local);
    setEditingId(null);
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow overflow-auto max-h-[420px]">
      <h3 className="text-lg font-semibold mb-3">Usuarios</h3>
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left">
            <th className="py-2">Nombre</th>
            <th>Cargo</th>
            <th>Rol</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="py-2">
                {editingId === u.id ? (
                  <input
                    className="p-1 border rounded w-full"
                    value={local.name}
                    onChange={(e) => setLocal((s) => ({ ...s, name: e.target.value }))}
                  />
                ) : (
                  u.name
                )}
              </td>
              <td>
                {editingId === u.id ? (
                  <input
                    className="p-1 border rounded w-full"
                    value={local.position}
                    onChange={(e) => setLocal((s) => ({ ...s, position: e.target.value }))}
                  />
                ) : (
                  u.position
                )}
              </td>
              <td>
                {editingId === u.id ? (
                  <select
                    className="p-1 border rounded"
                    value={local.role}
                    onChange={(e) => setLocal((s) => ({ ...s, role: e.target.value }))}
                  >
                    <option value="operario">Operario</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="gerente">Gerente</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>
              <td className="text-right">
                {editingId === u.id ? (
                  <>
                    <button
                      className="mr-2 px-3 py-1 rounded bg-green-500 text-white"
                      onClick={save}
                    >
                      Guardar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-gray-300"
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="mr-2 px-3 py-1 rounded bg-yellow-400"
                      onClick={() => startEdit(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white"
                      onClick={() => onDelete(u.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Config() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Página de Configuración</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* A1 */}
        <div className="col-span-1">
          <UserForm onCreate={createUser} />
        </div>

        {/* B1 */}
        <div className="col-span-1">
          {loading ? (
            <div className="p-4 bg-white rounded-2xl shadow">Cargando usuarios...</div>
          ) : error ? (
            <div className="p-4 bg-red-50 rounded-2xl text-red-600">Error cargando usuarios</div>
          ) : (
            <UsersTable users={users} onUpdate={updateUser} onDelete={deleteUser} />
          )}
        </div>

        {/* A2 */}
        <div className="col-span-1">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Crear Máquina</h3>
            <p className="text-sm text-gray-500">Formulario de máquinas - pendiente</p>
          </div>
        </div>

        {/* B2 */}
        <div className="col-span-1">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Máquinas</h3>
            <p className="text-sm text-gray-500">Listado/Edición de máquinas - pendiente</p>
          </div>
        </div>

        {/* A3 */}
        <div className="col-span-1">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Crear Pieza</h3>
            <p className="text-sm text-gray-500">Formulario de piezas - pendiente</p>
          </div>
        </div>

        {/* B3 */}
        <div className="col-span-1">
          <div className="p-4 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-2">Piezas</h3>
            <p className="text-sm text-gray-500">Listado/Edición de piezas - pendiente</p>
          </div>
        </div>
      </div>
    </div>
  );
}


