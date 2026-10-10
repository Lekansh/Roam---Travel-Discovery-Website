import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('roam_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load favorites', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('roam_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
