'use client'
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { fetchAllUsers, UserType } from '../../lib/services/userService'; // Import from the new service

// interface UserType { // This will be imported from userService
//   id: string;
//   name: string;
//   age: number;
// }

export default function TestPage() { // Renamed component to follow PascalCase convention for components
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Optional: for displaying errors

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchAllUsers();
        console.log('Fetched users in component:', fetchedUsers);
        setUsers(fetchedUsers);
      } catch (e: Error | unknown) {
        console.error('Error loading users in component:', e instanceof Error ? e.message : 'Unknown error');
        setError('Failed to load users. Please try again later.'); // Set an error message for the UI
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; // Display error message

  return (
    <div>
      <h1>TEST</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
