'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Effet pour initialiser les données du formulaire (à implémenter plus tard avec Supabase)
  useEffect(() => {
    // On pourrait charger les données de profil depuis Supabase ici
    // Pour l'instant, on utilise simplement les données de l'utilisateur connecté
    if (user) {
      setDisplayName(user.email?.split('@')[0] || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Ici, vous pourriez enregistrer les données dans Supabase
      // Par exemple: await supabase.from('profiles').upsert({ id: user.id, name: displayName, bio, level })
      
      // Simulation d'un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage('Profil mis à jour avec succès!');
      
      // Redirection vers le tableau de bord après un court délai
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error);
      setSaveMessage('Erreur lors de la sauvegarde du profil. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AuthGuard>
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
          
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium mb-1">Nom d'affichage</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Votre nom d'affichage"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={4}
                placeholder="Parlez-nous de vous..."
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="level" className="block text-sm font-medium mb-1">Niveau d'expertise</label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Beginner">Débutant</option>
                <option value="Intermediary">Intermédiaire</option>
                <option value="Advanced">Avancé</option>
              </select>
            </div>
            
            {saveMessage && (
              <div className={`p-3 rounded-md mb-4 ${saveMessage.includes('succès') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {saveMessage}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSaving ? 'Sauvegarde en cours...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ProfilePage; 