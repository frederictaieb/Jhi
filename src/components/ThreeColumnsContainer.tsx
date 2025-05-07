'use client';

import React from 'react';
import '../styles/ThreeColumns.css';
import '../styles/Modal.css';
import UserList from './UserList';

// Données factices pour tester (à remplacer par des données réelles plus tard)
const usersLeft = [
  {
    id: '1',
    name: 'Alphonse',
    age: 32,
    city: 'Paris',
    country: 'France',
    likes: 10,
    bio: 'Passionné de voyages et de nouvelles technologies.',
    interests: ['Voyages', 'Technologie', 'Photographie'],
    languages: ['Français', 'Anglais'],
    comments: ['Français', 'Anglais']
  },
  {
    id: '2',
    name: 'Sophie',
    age: 28,
    city: 'Lyon',
    country: 'France',
    likes: 15,
    bio: 'J\'adore les animaux et la cuisine.',
    interests: ['Cuisine', 'Animaux', 'Randonnée'],
    languages: ['Français', 'Espagnol'],
    comments: ['Français', 'Espagnol']
  },
  {
    id: '3',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '4',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '5',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '6',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '7',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '8',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  },
  {
    id: '9',
    name: 'Marc',
    age: 35,
    city: 'Bordeaux',
    country: 'France',
    likes: 8,
    bio: 'Fan de sports extrêmes et de cinéma.',
    interests: ['Sport', 'Cinéma', 'Musique'],
    languages: ['Français', 'Anglais', 'Allemand'],
    comments: ['Français', 'Anglais', 'Allemand']
  }
];

const usersCenter = [
  {
    id: '4',
    name: 'Émilie',
    age: 30,
    city: 'Marseille',
    country: 'France',
    bio: 'Artiste peintre et amoureuse de la nature.',
    interests: ['Art', 'Nature', 'Lecture'],
    languages: ['Français', 'Italien'],
    comments: ['Français', 'Italien']
  },
  {
    id: '5',
    name: 'Thomas',
    age: 27,
    city: 'Lille',
    country: 'France',
    bio: 'Développeur web, passionné de blockchain.',
    interests: ['Programmation', 'Blockchain', 'Jeux vidéo'],
    languages: ['Français', 'Anglais'],
    comments: ['Français', 'Anglais']
  }
];

const usersRight = [
  {
    id: '6',
    name: 'Jeanne',
    age: 33,
    city: 'Nantes',
    country: 'France',
    bio: 'Professeur de yoga et voyageuse.',
    interests: ['Yoga', 'Voyages', 'Méditation'],
    languages: ['Français', 'Anglais', 'Sanskrit'],
    comments: ['Français', 'Anglais', 'Sanskrit']
  },
  {
    id: '7',
    name: 'Lucas',
    age: 31,
    city: 'Toulouse',
    country: 'France',
    bio: 'Ingénieur en informatique, amateur de cuisine.',
    interests: ['Informatique', 'Cuisine', 'Échecs'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    comments: ['Français', 'Anglais', 'Espagnol']
  }
];

const ThreeColumnsContainer: React.FC = () => {
  return (
    <div>
      <div className="mainboard-container">
        <UserList users={usersLeft} columnType="left"/>
        <UserList users={usersCenter} columnType="center" />
        <UserList users={usersRight} columnType="right" />
      </div>
    </div>
  );
};

export default ThreeColumnsContainer; 