'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface WebcamSessionProps {
  userId: string;
  userName: string;
  onSessionEnd: () => void;
}

const WebcamSession: React.FC<WebcamSessionProps> = ({ userId, userName, onSessionEnd }) => {
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
    const setupWebcam = async () => {
      try {
        // Demander l'accès à la caméra et au microphone
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        // Afficher le flux local
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Dans une vraie implémentation, vous établiriez ici une connexion WebRTC
        // avec l'autre utilisateur en utilisant des signaux et des serveurs STUN/TURN
        
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
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onSessionEnd]);

  return (
    <div className="webcam-session">
      <div className="flex flex-col items-center gap-6 w-full">
        <h2 className="text-xl font-semibold">Session avec {userName}</h2>
        
        {isConnecting && (
          <div className="connecting-overlay flex items-center justify-center">
            <div className="animate-pulse text-lg">Connexion en cours...</div>
          </div>
        )}
        
        <div className="video-container flex flex-col md:flex-row gap-4 w-full">
          <div className="video-wrapper relative w-full md:w-1/2">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline
              className="w-full h-64 md:h-80 bg-gray-800 rounded-lg"
            />
            <div className="absolute bottom-2 right-2 text-sm bg-gray-800 text-white px-2 py-1 rounded">
              {userName}
            </div>
          </div>
          
          <div className="video-wrapper relative w-full md:w-1/2">
            <video 
              ref={localVideoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-64 md:h-80 bg-gray-800 rounded-lg"
            />
            <div className="absolute bottom-2 right-2 text-sm bg-gray-800 text-white px-2 py-1 rounded">
              Vous
            </div>
          </div>
        </div>
        
        <div className="timer-container flex items-center justify-center w-full">
          <div className="time-remaining bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
            <div className="text-sm">Temps restant</div>
            <div className="text-2xl font-mono">{formatTime(remainingTime)}</div>
          </div>
        </div>
        
        <button 
          onClick={onSessionEnd} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Terminer la session
        </button>
      </div>
    </div>
  );
};

export default WebcamSession; 