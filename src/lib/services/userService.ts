import { supabase } from '../supabaseClient';

export interface UserType {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  likes: number;
  bio: string;
  level: 'Beginner' | 'Intermediary' | 'Advanced'; // Assuming these are the exact string values for level
}

export const fetchAllUsers = async (): Promise<UserType[]> => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching users from service:', error.message);
    throw error;
  }

  return data || [];
}; 