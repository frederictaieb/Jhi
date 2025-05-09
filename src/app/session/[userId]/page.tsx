'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SessionManager from '@/components/SessionManager';
import { fetchUserById } from '@/lib/services/userService';

interface User {
  id: string;
  name: string;
  // autres propriétés requises...
}

const SessionPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userId = typeof params.userId === 'string' ? params.userId : '';
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setError('ID utilisateur invalide');
        setIsLoading(false);
        return;
      }

      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error('Erreur lors du chargement des données utilisateur:', err);
        setError('Impossible de charger les données de l\'utilisateur');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleClose = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold animate-pulse">Chargement de la session...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold text-red-500 mb-4">
          {error || 'Utilisateur non trouvé'}
        </div>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="session-fullscreen-container min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <SessionManager
        userId={user.id}
        userName={user.name}
        onClose={handleClose}
        isFullScreen={true}
      />
    </div>
  );
};

export default SessionPage; 