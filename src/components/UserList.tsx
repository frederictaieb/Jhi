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

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`column-body column-${columnType}`}>
      {title && <h2 className="column-title">{title}</h2>}
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          age={user.age}
          city={user.city}
          country={user.country}
          likes={user.likes}
          photo={user.photo}
          onClick={() => handleUserClick(user)}
        />
      ))}

      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Profil de ${selectedUser.name}`}
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
          />
        </Modal>
      )}
    </div>
  );
};

export default UserList; 