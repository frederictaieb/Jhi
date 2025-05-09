'use client';

import React from 'react';

interface UserProfileProps {
  name: string;
  age: number;
  city: string;
  country: string;
  likes?: number;
  photo?: string;
  bio?: string;
  interests?: string[];
  languages?: string[];
  comments?: string[];
  userId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  age,
  city,
  country,
  likes = 0,
  photo,
  bio = 'Aucune biographie disponible',
  interests = [],
  languages = [],
  comments = [],
}) => {
  return (
    <div className="user-profile p-4">
      <div className="user-profile-header flex flex-col md:flex-row gap-6 mb-6">
        <div className="user-profile-photo w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {photo ? (
            <img src={photo} alt={`Photo de ${name}`} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-xl">{name.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className="user-profile-basic-info">
          <h2 className="text-2xl font-bold">{name}, <span className="font-normal">{age} ans</span></h2>
          <p className="text-gray-600 mb-2">{city}, {country}</p>
          <p className="flex items-center gap-1">
            <span className="text-blue-500">❤️</span> {likes} likes
          </p>
        </div>
      </div>
      
      <div className="user-profile-details space-y-6">
        <div className="user-profile-section">
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-gray-700">{bio}</p>
        </div>
        
        {interests.length > 0 && (
          <div className="user-profile-section">
            <h3 className="text-lg font-semibold mb-2">Intérêts</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {languages.length > 0 && (
          <div className="user-profile-section">
            <h3 className="text-lg font-semibold mb-2">Langues</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {comments.length > 0 && (
          <div className="user-profile-section">
            <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  "{comment}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 