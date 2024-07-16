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
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        zIndex: 1000,
        maxHeight: '50vh',
        overflowY: 'auto',
      }}
    >
      <h2>{province}</h2>
      <ul>
        {clubs.length > 0 ? (
          clubs.map((club, index) => <li key={index}>{club}</li>)
        ) : (
          <li>Sin información disponible</li>
        )}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
