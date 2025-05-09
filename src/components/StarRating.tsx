'use client';

import React, { useState } from 'react';

interface StarRatingProps {
  onSubmit: (rating: number) => void;
  userName: string;
}

const StarRating: React.FC<StarRatingProps> = ({ onSubmit, userName }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleMouseEnter = (star: number) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  // Rendu des étoiles
  const renderStars = () => {
    const stars = [];
    const displayRating = hoveredRating || rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-10 h-10 cursor-pointer transition-colors ${
            i <= displayRating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="rating-container flex flex-col items-center gap-6 max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold text-center">Évaluez votre session avec {userName}</h2>
      
      <p className="text-center text-gray-600">
        Comment s&apos;est passée votre session ? Votre évaluation nous aide à améliorer l&apos;expérience pour tous.
      </p>
      
      <div className="stars-container flex justify-center gap-2 my-4">
        {renderStars()}
      </div>
      
      <div className="rating-label text-center font-medium">
        {rating === 1 && "Décevant"}
        {rating === 2 && "Moyen"}
        {rating === 3 && "Satisfaisant"}
        {rating === 4 && "Très bien"}
        {rating === 5 && "Excellent"}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={`px-6 py-2 rounded-lg transition-colors ${
          rating === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Continuer
      </button>
    </div>
  );
};

export default StarRating; 