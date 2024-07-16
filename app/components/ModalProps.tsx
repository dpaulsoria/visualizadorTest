'use client';
import React from 'react';

interface ModalProps {
  visible: boolean;
  province: string | null;
  clubs: string[];
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, province, clubs, onClose }) => {
  if (!visible || !province) {
    return null;
  }

  return (
    <div className="fixed bottom-10 right-10 bg-white p-6 rounded-lg shadow-lg z-50 max-h-50vh overflow-y-auto w-80">
      <h2 className="text-2xl font-bold mb-4">{province}</h2>
      <ul className="list-none p-0 m-0">
        {clubs.length > 0 ? (
          clubs.map((club, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {club}
            </li>
          ))
        ) : (
          <li className="text-gray-500">Sin información disponible</li>
        )}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
