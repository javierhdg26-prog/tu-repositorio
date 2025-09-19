// src/components/ConfirmModal.jsx
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ConfirmModal({
  isOpen,
  message = "¿Estás seguro?",
  onConfirm = () => {},
  onCancel = () => {},
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
}) {
  return (
    <Transition show={!!isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition transform ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition transform ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <Dialog.Title className="text-lg font-semibold mb-2">
                Confirmación
              </Dialog.Title>

              <p className="text-sm text-gray-600 mb-6">{message}</p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  {confirmLabel}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
