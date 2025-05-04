import React, { useState, useEffect } from 'react'
import { 
  SafeAreaView, 
  View, 
  Text, 
  Button, 
  FlatList, 
  StyleSheet 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'

// Datos de ejemplo: tres recetas con ID y título
const RECIPES = [
  { id: '1', title: 'Spaghetti Bolognese' },
  { id: '2', title: 'Tacos al Pastor' },
  { id: '3', title: 'Sushi Roll' },
]
export default function App() {
  const [favorites, setFavorites] = useState([])
  
  // Al montar, leer el array de favoritos de AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Error leyendo los favoritos:', e );
      }
    }
    loadFavorites()
  }, [])
}

// funcion para marcar o desmarcar una receta como favorita

const toggleFavorite = async (recipeId) => {
  let newFavs
  if (favorites.includes(recipeId)) {
    newFavs = favorites.filter(id => id !== recipeId)
  } else {
    newFavs = [...favorites, recipeId]
  }
  setFavorites(newFavs)
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavs))
  } catch (e) {
    console.error('Error guardando los favoritos:', e)}
}