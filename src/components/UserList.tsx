'use client';

import React, { useState } from 'react';
import UserCard from './UserCard';
import Modal from './Modal';
import UserProfile from './UserProfile';

// Type pour représenter un utilisateur
interface User {
  id: string;
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

interface UserListProps {
  users: User[];
  columnType: 'left' | 'center' | 'right';
  title?: string;
}

const UserList: React.FC<UserListProps> = ({ users, columnType, title }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUserClick = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`column-container column-${columnType}`}>
      {/* Titre fixe */}
      {title && <div className="column-header">
        <h2 className="column-title">{title}</h2>
      </div>}
      
      {/* Contenu défilant */}
      <div className="column-content">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
            city={user.city}
            country={user.country}
            likes={user.likes}
            photo={user.photo}
            onClick={handleUserClick}
          />
        ))}
      </div>

      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Profil de ${selectedUser.name}`}
          userId={selectedUser.id}
          userName={selectedUser.name}
          isUserProfile={true}
        >
          <UserProfile
            name={selectedUser.name}
            age={selectedUser.age}
            city={selectedUser.city}
            country={selectedUser.country}
            likes={selectedUser.likes}
            photo={selectedUser.photo}
            bio={selectedUser.bio}
            interests={selectedUser.interests}
            languages={selectedUser.languages}
            comments={selectedUser.comments}
            userId={selectedUser.id}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserList; 