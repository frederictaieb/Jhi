import { supabase } from '../supabaseClient';

export interface UserType {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  level: 'Beginner' | 'Intermediary' | 'Advanced';
  likes?: number;
  photo?: string;
  bio?: string;
  interests?: string[];
  languages?: string[];
  comments?: string[];
}

// Données mock pour le développement
const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Sophie Martin",
    age: 28,
    city: "Paris",
    country: "France",
    level: "Beginner",
    likes: 42,
    bio: "Passionnée de langues et cultures, je commence tout juste à apprendre le japonais.",
    interests: ["Voyages", "Cuisine", "Littérature"],
    languages: ["Français", "Anglais"],
    comments: ["Très sympa et à l'écoute!", "Progressera vite!"]
  },
  {
    id: "2",
    name: "Jean Dupont",
    age: 34,
    city: "Lyon",
    country: "France",
    level: "Intermediary",
    likes: 78,
    bio: "J'apprends le japonais depuis 2 ans. J'aime la culture des mangas et du cinéma japonais.",
    interests: ["Cinéma", "Mangas", "Histoire"],
    languages: ["Français", "Anglais", "Espagnol"]
  },
  {
    id: "3",
    name: "Marie Leroux",
    age: 25,
    city: "Marseille",
    country: "France",
    level: "Advanced",
    likes: 120,
    bio: "J'ai vécu au Japon pendant 4 ans et souhaite maintenir mon niveau.",
    interests: ["Art", "Randonnée", "Photographie"],
    languages: ["Français", "Anglais", "Japonais", "Coréen"]
  },
  {
    id: "4",
    name: "Thomas Bernard",
    age: 31,
    city: "Bordeaux",
    country: "France",
    level: "Beginner",
    likes: 15,
    bio: "Débutant motivé, fan de culture japonaise depuis l'enfance.",
    interests: ["Jeux vidéo", "Anime", "Musique"]
  },
  {
    id: "5",
    name: "Léa Petit",
    age: 29,
    city: "Toulouse",
    country: "France",
    level: "Intermediary",
    likes: 53,
    bio: "En apprentissage depuis 3 ans, je me spécialise dans la calligraphie.",
    interests: ["Calligraphie", "Poésie", "Thé"]
  },
  {
    id: "6",
    name: "Antoine Moreau",
    age: 36,
    city: "Nantes",
    country: "France",
    level: "Advanced",
    likes: 98,
    bio: "Traducteur franco-japonais, disponible pour des conversations avancées.",
    interests: ["Traduction", "Linguistique", "Littérature classique"],
    languages: ["Français", "Anglais", "Japonais", "Chinois"]
  }
];

/**
 * Récupère tous les utilisateurs
 */
export const fetchAllUsers = async (): Promise<UserType[]> => {
  // Simuler une requête API
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockUsers;
};

/**
 * Récupère un utilisateur par son ID
 */
export const fetchUserById = async (userId: string): Promise<UserType> => {
  // Simuler une requête API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }
  
  return user;
}; 