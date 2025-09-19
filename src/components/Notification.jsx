// src/components/Notification.jsx
import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-4 right-4`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;
