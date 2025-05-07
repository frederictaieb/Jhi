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
    <div className="user-profile">
      <div className="user-profile-header">
        <div className="user-profile-photo">
          {photo || 'Photo'}
        </div>
        <div className="user-profile-basic-info">
          <h2 className="user-profile-name">{name}, <span className="user-profile-age">{age} ans</span></h2>
          <p className="user-profile-location">{city}, {country}</p>
          <p className="user-profile-likes">&#128153; {likes} likes</p>
        </div>
      </div>
      
      <div className="user-profile-details">
        <div className="user-profile-section">
          <h3 className="user-profile-section-title">Bio</h3>
          <p className="user-profile-bio">{bio}</p>
        </div>
        
        {interests.length > 0 && (
          <div className="user-profile-section">
            <h3 className="user-profile-section-title">Intérêts</h3>
            <div className="user-profile-interests">
              {interests.map((interest, index) => (
                <span key={index} className="user-profile-interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {languages.length > 0 && (
          <div className="user-profile-section">
            <h3 className="user-profile-section-title">Langues</h3>
            <div className="user-profile-languages">
              {languages.map((language, index) => (
                <span key={index} className="user-profile-language">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {comments.length > 0 && (
          <div className="user-profile-section">
            <h3 className="user-profile-section-title">Commentaires</h3>
            <div className="user-profile-comments">
              {comments.map((comment, index) => (
                <span key={index} className="user-profile-comment">
                  {comment}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="user-profile-section user-profile-actions">
          <button className="user-profile-contact-btn">Contact</button>
          <button className="user-profile-like-btn">Like</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 