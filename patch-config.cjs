// patch-config.cjs
const fs = require('fs');
const path = require('path');

// =================================================================
// 1. CONFIGURACIÓN
// =================================================================
const RELATIVE_CONFIG_PATH = 'src/pages/Config.jsx';
const ABSOLUTE_CONFIG_PATH = path.join(__dirname, RELATIVE_CONFIG_PATH);

// --- SNIPPETS para importaciones y lógica (generalmente deberían estar aplicados del primer parche) ---
const SNIPPET_FRAGMENT_IMPORT = 'import React, { useState, useEffect } from "react";';
const REPLACEMENT_FRAGMENT_IMPORT = 'import React, { useState, useEffect, Fragment } from "react";';

const SNIPPET_HEADLESS_UI_IMPORT = 'import { Dialog } from "@headlessui/react";';
const REPLACEMENT_HEADLESS_UI_IMPORT = 'import { Dialog, Transition } from "@headlessui/react";';

const SNIPPET_ENTITY_COLUMN_DEFINITION = 'function EntityColumn({ title, Icon, data, onCreate, onUpdate, onDelete }) {';
const REPLACEMENT_ENTITY_COLUMN_DEFINITION = 'function EntityColumn({ title, Icon, data, onCreate, onUpdate, onDelete, onOpenConfigModal }) {';

const SNIPPET_GEAR_CLICK = '  const handleGearClick = () => {\n    console.log(`Abrir configuración de ${title}`);\n  };';
const REPLACEMENT_GEAR_CLICK = '  const handleGearClick = () => {\n    onOpenConfigModal(title); // Ahora llama a la prop para abrir el modal principal\n  };';

const SNIPPET_FINAL_HOOK = '  const { deletePiece } = useDeletePiece();';

const NEW_CONFIG_HOOKS = `
  // Estados para controlar la visibilidad de los nuevos modales de configuración avanzada
  const [isUserConfigModalOpen, setIsUserConfigModalOpen] = useState(false);
  const [isMachineConfigModalOpen, setIsMachineConfigModalOpen] = useState(false);
  const [isPieceConfigModalOpen, setIsPieceConfigModalOpen] = useState(false);

  // Función para abrir el modal de configuración correcto según el título de la columna
  const handleOpenConfigModal = (entityTitle) => {
    if (entityTitle === "Usuarios") setIsUserConfigModalOpen(true);
    if (entityTitle === "Máquinas") setIsMachineConfigModalOpen(true);
    if (entityTitle === "Piezas") setIsPieceConfigModalOpen(true);
  };

  // Funciones para cerrar los modales
  const closeUserConfigModal = () => setIsUserConfigModalOpen(false);
  const closeMachineConfigModal = () => setIsMachineConfigModalOpen(false);
  const closePieceConfigModal = () => setIsPieceConfigModalOpen(false);

  // Funciones de guardado para los modales de configuración (placeholders por ahora)
  const handleSaveUserConfig = () => {
    console.log("Guardando configuración avanzada de usuario...");
    closeUserConfigModal();
  };
  const handleSaveMachineConfig = () => {
    console.log("Guardando configuración avanzada de máquina...");
    closeMachineConfigModal();
  };
  const handleSavePieceConfig = () => {
    console.log("Guardando configuración avanzada de pieza...");
    closePieceConfigModal();
  };
`;

const SNIPPET_CONFIRM_DELETE_END = /  \);\n\}\n\n\/\/ Columna genérica con engranaje agregado/
const NEW_SETTINGS_MODAL = `
  );
}

// =========================================================================
// NUEVO COMPONENTE: SettingsConfigModal para usar con Headless UI
// =========================================================================
function SettingsConfigModal({ isOpen, onClose, title, children, onSave }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  {children}
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onSave} 
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
// =========================================================================
// FIN DEL NUEVO COMPONENTE DE MODAL
// =========================================================================
// Columna genérica con engranaje agregado
`;

const SNIPPET_ENTITY_COLUMNS_END = /onDelete={deletePiece}\n\s+\/>\n\s+<\/div>/;
const REPLACEMENT_ENTITY_COLUMNS_END = `onDelete={deletePiece}
            onOpenConfigModal={handleOpenConfigModal} /* AÑADIDO */
          />
        </div>
      </main>

      {/* ========================================================================= */}
      {/* Modales de Configuración Avanzada (usan el nuevo SettingsConfigModal) */}
      {/* ========================================================================= */}
      <SettingsConfigModal
        isOpen={isUserConfigModalOpen} 
        onClose={closeUserConfigModal} 
        title="Configuración Avanzada de Usuarios"
        onSave={handleSaveUserConfig}
      >
        <p className="text-gray-700">Aquí irá el formulario de configuración avanzada para Usuarios.</p>
      </SettingsConfigModal>

      <SettingsConfigModal 
        isOpen={isMachineConfigModalOpen} 
        onClose={closeMachineConfigModal} 
        title="Configuración Avanzada de Máquinas"
        onSave={handleSaveMachineConfig}
      >
        <p className="text-gray-700">Aquí irá el formulario de configuración avanzada para Máquinas.</p>
      </SettingsConfigModal>

      <SettingsConfigModal 
        isOpen={isPieceConfigModalOpen} 
        onClose={closePieceConfigModal} 
        title="Configuración Avanzada de Piezas"
        onSave={handleSavePieceConfig}
      >
        <p className="text-gray-700">Aquí irá el formulario de configuración avanzada para Piezas.</p>
      </SettingsConfigModal>
      </main>`;


// --- SNIPPETS ESPECÍFICOS PARA EL CAMBIO DE ICONO (mejorado) ---
// Regex para encontrar la importación de lucide-react y añadir SlidersHorizontal si no está
const LUCIDE_IMPORT_REGEX = /(import\s+\{\s*[\w\s,]*)(from\s+"lucide-react");/;

// El patrón para encontrar tu SVG inlined exacto
const SNIPPET_INLINED_SVG_BUTTON = `          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15Z" />
          </svg>`;

const REPLACEMENT_SLIDERS_BUTTON_ICON_FULL = `          <SlidersHorizontal size={22} /> {/* <-- CAMBIADO: Ahora usa SlidersHorizontal para configuración avanzada */}`;

// =================================================================
// 2. FUNCIÓN DE PARCHEO
// =================================================================
function applyPatch() {
    console.log(`Buscando archivo en: ${ABSOLUTE_CONFIG_PATH}`);

    if (!fs.existsSync(ABSOLUTE_CONFIG_PATH)) {
        console.error(`\n❌ ERROR: No se encontró el archivo en la ruta: ${ABSOLUTE_CONFIG_PATH}`);
        console.log("Asegúrate de que estás ejecutando el script desde el directorio raíz del proyecto (tu-repositorio).");
        return;
    }

    let content = fs.readFileSync(ABSOLUTE_CONFIG_PATH, 'utf8');
    let originalContent = content; // Guardar el contenido original para la verificación
    let changesMade = false;

    // --- Aplicar o reconfirmar los cambios del primer parche ---
    if (content.includes(SNIPPET_FRAGMENT_IMPORT) && !content.includes('Fragment } from "react"')) {
        content = content.replace(SNIPPET_FRAGMENT_IMPORT, REPLACEMENT_FRAGMENT_IMPORT);
        console.log("-> Patch #1: React Fragment importado.");
        changesMade = true;
    }
    if (content.includes(SNIPPET_HEADLESS_UI_IMPORT) && !content.includes('Transition } from "@headlessui/react"')) {
        content = content.replace(SNIPPET_HEADLESS_UI_IMPORT, REPLACEMENT_HEADLESS_UI_IMPORT);
        console.log("-> Patch #1: Headless UI Transition importado.");
        changesMade = true;
    }
    const confirmDeleteEndRegex = /  \);\n\}\n\n\/\/ Columna genérica con engranaje agregado/;
    if (content.match(confirmDeleteEndRegex) && !content.includes('function SettingsConfigModal')) {
        content = content.replace(confirmDeleteEndRegex, NEW_SETTINGS_MODAL);
        console.log("-> Patch #1: Componente SettingsConfigModal insertado.");
        changesMade = true;
    }
    if (content.includes(SNIPPET_ENTITY_COLUMN_DEFINITION) && !content.includes('onOpenConfigModal')) {
        content = content.replace(SNIPPET_ENTITY_COLUMN_DEFINITION, REPLACEMENT_ENTITY_COLUMN_DEFINITION);
        console.log("-> Patch #1: EntityColumn prop 'onOpenConfigModal' añadida a definición.");
        changesMade = true;
    }
    if (content.includes(SNIPPET_GEAR_CLICK) && !content.includes('onOpenConfigModal(title);')) {
        content = content.replace(SNIPPET_GEAR_CLICK, REPLACEMENT_GEAR_CLICK);
        console.log("-> Patch #1: handleGearClick actualizado.");
        changesMade = true;
    }
    if (content.includes(SNIPPET_FINAL_HOOK) && !content.includes('isUserConfigModalOpen')) {
        content = content.replace(SNIPPET_FINAL_HOOK, SNIPPET_FINAL_HOOK + NEW_CONFIG_HOOKS);
        console.log("-> Patch #1: Hooks de estado de modales y funciones añadidas a Config.");
        changesMade = true;
    }
    
    const entityColumnPropRegex = /(<EntityColumn\n\s+title="([^"]+)"\n\s+Icon={([^}]+)}\n\s+data={([^}]+)}\n\s+onCreate={([^}]+)}\n\s+onUpdate={([^}]+)}\n\s+onDelete={([^}]+)}\n\s+\/>)/g;
    if (content.match(entityColumnPropRegex) && !content.includes('onOpenConfigModal={handleOpenConfigModal}')) {
        content = content.replace(entityColumnPropRegex, (match, p1, title, icon, data, create, update, deleteFunc) => {
            return `<EntityColumn\n            title="${title}"\n            Icon={${icon}}\n            data={${data}}\n            onCreate={${create}}\n            onUpdate={${update}}\n            onDelete={${deleteFunc}}\n            onOpenConfigModal={handleOpenConfigModal} /* AÑADIDO POR SCRIPT */\n          />`;
        });
        console.log("-> Patch #1: Prop 'onOpenConfigModal' añadida a instancias de EntityColumn.");
        changesMade = true;
    }

    const closingMainDivRegex = /\s+<\/main>\n\s+<\/div>/; 
    if (content.match(closingMainDivRegex) && !content.includes('<SettingsConfigModal')) { 
        content = content.replace(SNIPPET_ENTITY_COLUMNS_END, REPLACEMENT_ENTITY_COLUMNS_END);
        console.log("-> Patch #1: Modales de configuración avanzada insertados al final del JSX.");
        changesMade = true;
    }
    
    // --- Aplicar los cambios para el icono SlidersHorizontal (mejorado) ---
    // 1. Asegurarse de que SlidersHorizontal esté importado de lucide-react
    if (!content.includes('SlidersHorizontal')) { // Solo si no está ya importado
        content = content.replace(LUCIDE_IMPORT_REGEX, (match, p1, p2) => {
            // Añadir SlidersHorizontal y asegurarse de que haya una coma si no es el primer elemento
            if (p1.includes('Settings')) { // Asumiendo que Settings es un buen ancla o que ya existe
                 // Intentar insertar después de Settings, o al final de la lista si Settings no está ahí.
                const newP1 = p1.replace(/Settings(\s*,)?/, `Settings,\n  SlidersHorizontal,`);
                return newP1 + p2;
            } else if (p1.includes('User')) { // Si Settings no existe, intentar después de User
                const newP1 = p1.replace(/User(\s*,)?/, `User,\n  SlidersHorizontal,`);
                return newP1 + p2;
            }
            // Si no encuentra ni Settings ni User, simplemente insertarlo antes del 'from'
            return `${p1} SlidersHorizontal ${p2}`;
        });
        console.log("-> Patch #2: SlidersHorizontal importado en lucide-react (o asegurado).");
        changesMade = true;
    }

    // 2. Reemplazar el SVG inlined o el componente Settings por SlidersHorizontal
    const inlinedSvgRegex = /          <svg\s+xmlns="http:\/\/www.w3.org\/2000\/svg"[\s\S]*?<\/svg>/;
    const settingsComponentRegex = /<Settings size={22} \/>/;

    if (content.match(inlinedSvgRegex)) { 
        content = content.replace(inlinedSvgRegex, REPLACEMENT_SLIDERS_BUTTON_ICON_FULL);
        console.log("-> Patch #2: SVG inlined del icono de configuración reemplazado por 'SlidersHorizontal'.");
        changesMade = true;
    } else if (content.match(settingsComponentRegex)) {
        content = content.replace(settingsComponentRegex, REPLACEMENT_SLIDERS_BUTTON_ICON_FULL);
        console.log("-> Patch #2: Icono 'Settings' reemplazado por 'SlidersHorizontal'.");
        changesMade = true;
    }


    if (!changesMade && content === originalContent) {
        console.log("\n⚠️ Advertencia: No se detectaron cambios significativos. ¿El archivo ya fue parcheado con los últimos ajustes?");
        return;
    }

    try {
        fs.writeFileSync(ABSOLUTE_CONFIG_PATH, content, 'utf8');
        console.log(`\n✅ ÉXITO: El archivo ${RELATIVE_CONFIG_PATH} ha sido parcheado automáticamente.`);
        console.log("El icono de configuración ha sido actualizado a SlidersHorizontal y los modales están integrados.");
    } catch (e) {
        console.error("\n❌ ERROR al escribir el archivo:", e.message);
    }
}

applyPatch();