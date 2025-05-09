'use client';

import React, { useState, useEffect, useRef } from 'react';

interface WebcamSessionProps {
  userId: string;
  userName: string;
  onSessionEnd: () => void;
  isFullScreen?: boolean;
}

const WebcamSession: React.FC<WebcamSessionProps> = ({ userId, userName, onSessionEnd, isFullScreen = false }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [remainingTime, setRemainingTime] = useState(60 * 60); // 1 heure en secondes
  const [isConnecting, setIsConnecting] = useState(true);
  
  // Formater le temps restant (HH:MM:SS)
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Simuler l'initialisation de la webcam
  useEffect(() => {
    let localStream: MediaStream | null = null;
    
    const setupWebcam = async () => {
      try {
        // Demander l'accès à la caméra et au microphone
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        // Stocker la référence au stream pour le nettoyage
        localStream = stream;
        
        // Afficher le flux local
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Dans une vraie implémentation, vous établiriez ici une connexion WebRTC
        // avec l'autre utilisateur en utilisant des signaux et des serveurs STUN/TURN
        
        // Simulation d'envoi de l'ID utilisateur au serveur de signalisation
        console.log(`Connexion à l'utilisateur ${userId} en cours...`);
        
        // Simuler une connexion réussie après 2 secondes
        setTimeout(() => {
          setIsConnecting(false);
          
          // Ici, dans une vraie application, vous recevriez le flux vidéo distant
          // Pour l'exemple, nous utiliserons le même flux local
          if (remoteVideoRef.current) {
            // Dans une vraie implémentation, ce serait le flux de l'autre utilisateur
            // Pour la démonstration, on utilise le même flux
            remoteVideoRef.current.srcObject = stream;
          }
        }, 2000);
      } catch (error) {
        console.error('Erreur lors de l\'accès à la webcam:', error);
      }
    };
    
    setupWebcam();
    
    // Démarrer le compte à rebours
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Nettoyer les ressources
    return () => {
      clearInterval(timer);
      
      // Arrêter tous les flux vidéo
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onSessionEnd, userId]);

  // Classes CSS conditionnelles en fonction du mode plein écran
  const containerClasses = isFullScreen
    ? "p-6 flex flex-col items-center"
    : "webcam-session";

  const videoContainerClasses = isFullScreen
    ? "flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto"
    : "video-container flex flex-col md:flex-row gap-4 w-full";

  const videoWrapperClasses = isFullScreen
    ? "relative w-full md:w-1/2 h-auto aspect-video"
    : "video-wrapper relative w-full md:w-1/2";

  const videoClasses = isFullScreen
    ? "w-full h-full bg-gray-800 rounded-lg"
    : "w-full h-64 md:h-80 bg-gray-800 rounded-lg";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-6 w-full">
        <h2 className="text-xl font-semibold">Session avec {userName}</h2>
        
        {isConnecting && (
          <div className="connecting-overlay flex items-center justify-center">
            <div className="animate-pulse text-lg">Connexion en cours...</div>
          </div>
        )}
        
        <div className={videoContainerClasses}>
          <div className={videoWrapperClasses}>
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline
              className={videoClasses}
            />
            <div className="absolute bottom-2 right-2 text-sm bg-gray-800 text-white px-2 py-1 rounded">
              {userName}
            </div>
          </div>
          
          <div className={videoWrapperClasses}>
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted
              className={videoClasses}
            />
            <div className="absolute bottom-2 right-2 text-sm bg-gray-800 text-white px-2 py-1 rounded">
              Vous
            </div>
          </div>
        </div>
        
        <div className="timer-container flex items-center justify-center w-full my-6">
          <div className="time-remaining bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
            <div className="text-sm">Temps restant</div>
            <div className="text-2xl font-mono">{formatTime(remainingTime)}</div>
          </div>
        </div>
        
        <button 
          onClick={onSessionEnd} 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Terminer la session
        </button>
      </div>
    </div>
  );
};

export default WebcamSession; 