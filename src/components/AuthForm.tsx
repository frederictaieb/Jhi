'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import GoogleIcon from './icons/GoogleIcon';

// Styles à externaliser dans un fichier CSS
const formStyles = {
  container: 'max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8',
  title: 'text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white',
  input: 'w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
  button: 'w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300',
  socialButton: 'w-full flex items-center justify-center bg-white text-gray-800 py-2 px-4 rounded-md border hover:bg-gray-50 transition duration-300 mt-4',
  divider: 'my-4 border-b border-gray-300 dark:border-gray-600',
  toggle: 'mt-4 text-center text-sm',
  errorMsg: 'text-red-500 text-sm mb-4',
};

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let result;
      
      if (isSignUp) {
        result = await signUp(email, password);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Échec de la connexion avec Google. Veuillez réessayer.');
      console.error(err);
    }
  };

  return (
    <div className={formStyles.container}>
      <h2 className={formStyles.title}>
        {isSignUp ? 'Créer un compte' : 'Se connecter'}
      </h2>
      
      {error && <p className={formStyles.errorMsg}>{error}</p>}
      
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formStyles.input}
          required
        />
        
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={formStyles.input}
          required
        />
        
        <button 
          type="submit" 
          className={formStyles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : isSignUp ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </form>
      
      <div className={formStyles.divider}></div>
      
      <button 
        onClick={handleGoogleSignIn} 
        className={formStyles.socialButton}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        Se connecter avec Google
      </button>
      
      <p className={formStyles.toggle}>
        {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-2 text-blue-600 hover:underline"
        >
          {isSignUp ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </p>
    </div>
  );
} 