'use client';

import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (comment: string) => void;
  onBack: () => void;
  userName: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, onBack, userName }) => {
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
  };

  return (
    <div className="feedback-container max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold text-center mb-6">
        Partagez votre expérience avec {userName}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-group">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Votre commentaire (optionnel)
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez vos impressions sur cette session..."
            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Retour
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm; 