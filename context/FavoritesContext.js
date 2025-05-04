import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('favorites')
          .then(data => {
            if (data) setFavorites(JSON.parse(data));
          })
          .catch(console.error);
      }, []);

      const toggleFavorite = async recipeId => {
        const isFav = favorites.includes(recipeId);
        const newFavs = isFav
          ? favorites.filter(id => id !== recipeId)
          : [...favorites, recipeId];
    
        setFavorites(newFavs);
        try {
          await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
        } catch (e) {
          console.error('Error guardando favoritos', e);
        }
      };

      return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
          {children}
        </FavoritesContext.Provider>
      );
    }