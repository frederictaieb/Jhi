'use client';

import React, { useState } from 'react';
import WebcamSession from './WebcamSession';
import StarRating from './StarRating';
import FeedbackForm from './FeedbackForm';
import TipForm from './TipForm';
import { useRouter } from 'next/navigation';

// Types pour les différentes étapes du processus
type SessionStep = 'webcam' | 'rating' | 'feedback' | 'tip' | 'complete';

// Interface pour les données collectées pendant le processus
interface SessionData {
  userId: string;
  userName: string;
  rating?: number;
  comment?: string;
  tipAmount?: number;
}

interface SessionManagerProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ userId, userName, onClose }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SessionStep>('webcam');
  const [sessionData, setSessionData] = useState<SessionData>({
    userId,
    userName
  });

  // Gestionnaires d'événements pour chaque étape
  const handleSessionEnd = () => {
    setCurrentStep('rating');
  };

  const handleRatingSubmit = (rating: number) => {
    setSessionData(prev => ({ ...prev, rating }));
    setCurrentStep('feedback');
  };

  const handleFeedbackSubmit = (comment: string) => {
    setSessionData(prev => ({ ...prev, comment }));
    setCurrentStep('tip');
  };

  const handleTipSubmit = (tipAmount: number) => {
    setSessionData(prev => ({ ...prev, tipAmount }));
    
    // Enregistrer toutes les données de la session
    saveSessionData({ ...sessionData, tipAmount });
    
    // Rediriger vers le tableau de bord
    router.push('/dashboard');
  };

  const handleBackToRating = () => {
    setCurrentStep('rating');
  };

  const handleBackToFeedback = () => {
    setCurrentStep('feedback');
  };

  // Fonction pour enregistrer les données de session
  const saveSessionData = async (data: SessionData) => {
    // Dans une vraie implémentation, vous enverriez ces données à votre backend
    console.log('Données de session à enregistrer:', data);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Si la transaction XRP a été effectuée, vous pourriez vouloir enregistrer le hash de transaction ici
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données de session:', error);
    }
  };

  // Rendu du composant approprié en fonction de l'étape actuelle
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'webcam':
        return (
          <WebcamSession
            userId={userId}
            userName={userName}
            onSessionEnd={handleSessionEnd}
          />
        );
      case 'rating':
        return (
          <StarRating
            userName={userName}
            onSubmit={handleRatingSubmit}
          />
        );
      case 'feedback':
        return (
          <FeedbackForm
            userName={userName}
            onSubmit={handleFeedbackSubmit}
            onBack={handleBackToRating}
          />
        );
      case 'tip':
        return (
          <TipForm
            userName={userName}
            onSubmit={handleTipSubmit}
            onBack={handleBackToFeedback}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="session-manager">
      {renderCurrentStep()}
    </div>
  );
};

export default SessionManager; 