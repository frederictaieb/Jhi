'use client';

import React, { useEffect, useState, useMemo } from 'react';
import '../styles/ThreeColumns.css';
import '../styles/Modal.css';
import UserList from './UserList';
import { fetchAllUsers, UserType } from '../lib/services/userService'; // Adjusted path

const ThreeColumnsContainer: React.FC = () => {
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchAllUsers();
        setAllUsers(fetchedUsers);
      } catch (e: Error | unknown) {
        console.error('Error loading users in ThreeColumnsContainer:', e instanceof Error ? e.message : 'Unknown error');
        setError('Failed to load user profiles.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const beginnerUsers = useMemo(() => 
    allUsers.filter(user => user.level === 'Beginner'), 
    [allUsers]
  );

  const intermediaryUsers = useMemo(() => 
    allUsers.filter(user => user.level === 'Intermediary'), 
    [allUsers]
  );

  const advancedUsers = useMemo(() => 
    allUsers.filter(user => user.level === 'Advanced'), 
    [allUsers]
  );

  if (loading) {
    return <div className="mainboard-container"><p>Loading user profiles...</p></div>;
  }

  if (error) {
    return <div className="mainboard-container"><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }

  return (
    <div>
      <div className="mainboard-container">
        <UserList 
          users={beginnerUsers} 
          columnType="left"
          title="Débutants" 
        />
        <UserList 
          users={intermediaryUsers} 
          columnType="center" 
          title="Intermédiaires"
        />
        <UserList 
          users={advancedUsers} 
          columnType="right" 
          title="Avancés"
        />
      </div>
    </div>
  );
};

export default ThreeColumnsContainer; 