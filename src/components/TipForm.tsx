'use client';

import React, { useState } from 'react';

interface TipFormProps {
  onSubmit: (amount: number) => void;
  onBack: () => void;
  userName: string;
}

const TipForm: React.FC<TipFormProps> = ({ onSubmit, onBack, userName }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const predefinedAmounts = [5, 10, 20, 50];
  
  const handlePredefinedAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Accepter uniquement les nombres
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = selectedAmount !== null ? selectedAmount : parseFloat(customAmount) || 0;
    
    if (amount > 0) {
      setIsProcessing(true);
      
      try {
        // Simuler une transaction blockchain (dans une vraie implémentation, vous appelleriez ici votre API XRP)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        onSubmit(amount);
      } catch (error) {
        console.error('Erreur lors du traitement du tip:', error);
        setIsProcessing(false);
      }
    }
  };
  
  return (
    <div className="tip-container max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold text-center mb-2">
        Récompensez {userName}
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        Si vous avez apprécié cette session, vous pouvez envoyer un pourboire en XRP.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="predefined-amounts grid grid-cols-2 gap-3 mb-4">
          {predefinedAmounts.map(amount => (
            <button
              key={amount}
              type="button"
              className={`py-3 rounded-lg border transition-colors ${
                selectedAmount === amount
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => handlePredefinedAmountClick(amount)}
            >
              {amount} XRP
            </button>
          ))}
        </div>
        
        <div className="custom-amount mb-4">
          <label htmlFor="customAmount" className="block text-sm font-medium mb-2">
            Ou saisissez un montant personnalisé
          </label>
          <div className="relative">
            <input
              id="customAmount"
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="0.00"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 ${
                customAmount !== '' ? 'bg-blue-50 border-blue-300' : ''
              }`}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              XRP
            </span>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Retour
          </button>
          
          <button
            type="submit"
            disabled={isProcessing || (selectedAmount === null && !parseFloat(customAmount))}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[120px] ${
              isProcessing || (selectedAmount === null && !parseFloat(customAmount))
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement...
              </>
            ) : (
              'Envoyer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TipForm; 