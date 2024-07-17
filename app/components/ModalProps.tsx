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
    <div
      id="modal"
      className="fixed inset-0 flex items-center justify-center bg-opacity-50"
    >
      <div className="bg-gray-100 bg-opacity-80 p-8 rounded shadow-md w-1/3">
        <h2 className="text-2xl text-black font-bold mb-4">{province}</h2>
        <ol className="text-black list-disc pl-5 mb-4">
          {clubs.length > 0 ? (
            clubs.map((club, index) => <li key={index}>{club}</li>)
          ) : (
            <li className="text-black">Sin información disponible</li>
          )}
        </ol>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};


export default Modal;
