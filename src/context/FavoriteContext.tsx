import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (showId: number) => void;
  isFavorite: (showId: number) => boolean; // Make sure this returns a boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (showId: number) => {
    setFavorites(prev => 
      prev.includes(showId)
        ? prev.filter(id => id !== showId)
        : [...prev, showId]
    );
  };

  // Ensure this function returns a boolean
  const isFavorite = (showId: number): boolean => favorites.includes(showId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
