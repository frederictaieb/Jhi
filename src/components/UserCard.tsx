'use client';

import React from 'react';

interface UserProps {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  likes?: number;
  photo?: string;
  onClick: (userId: string) => void;
}

const UserCard: React.FC<UserProps> = ({
  id,
  name,
  age,
  city,
  country,
  likes,
  photo,
  onClick
}) => {
  return (
    <div 
      className="user-row user-card-clickable" 
      onClick={() => onClick(id)}
    >
      <div className="user-photo">{photo || 'photo'}</div>
      <div className="user-data">
        <div className="user-line">
          <div className="user-name">{name}</div>
          <div className="user-age">{age} ans</div>
        </div>
        <div className="user-line">
          <div className="user-city">{city}</div>
          <div className="user-country">{country}</div>
        </div>
        {likes !== undefined && (
          <div className="user-line">
            <div className="user-likes">&#128153; {likes}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard; 