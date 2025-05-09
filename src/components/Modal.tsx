'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  userId?: string;   // ID de l'utilisateur sélectionné pour une session
  userName?: string; // Nom de l'utilisateur sélectionné pour une session
  isUserProfile?: boolean; // Indique si le modal affiche un profil utilisateur
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  userId,
  userName,
  isUserProfile = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Empêche le scroll sur le body quand la modale est ouverte
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Rétablit le scroll sur le body
    };
  }, [isOpen, onClose]);

  const handleStartSession = () => {
    // Rediriger vers la page de session en plein écran
    if (userId) {
      router.push(`/session/${userId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div 
        className="modal-container bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[90vh] overflow-hidden w-[90vw] max-w-2xl" 
        ref={modalRef}
      >
        <div className="modal-header flex items-center justify-between p-4 border-b">
          {title && <h2 className="modal-title text-lg font-semibold">{title}</h2>}
          <button 
            className="modal-close h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>
        <div className="modal-content p-4 overflow-y-auto max-h-[calc(90vh-130px)]">
          {children}
        </div>
        {isUserProfile && userId && userName && (
          <div className="modal-footer border-t p-4 flex justify-end">
            <button
              onClick={handleStartSession}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Rejoindre
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 