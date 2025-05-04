// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Datos de ejemplo: tres recetas con ID y título
const RECIPES = [
  { id: '1', title: 'Spaghetti Bolognese' },
  { id: '2', title: 'Tacos al Pastor' },
  { id: '3', title: 'Sushi Roll' },
];

export default function App() {
  const [favorites, setFavorites] = useState([]);

  // Al montar, leer el array de favoritos de AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Error leyendo favoritos:', e);
      }
    };
    loadFavorites();
  }, []);

  // Función para alternar favorito
  const toggleFavorite = async (recipeId) => {
    let newFavs;
    if (favorites.includes(recipeId)) {
      newFavs = favorites.filter(id => id !== recipeId);
    } else {
      newFavs = [...favorites, recipeId];
    }
    setFavorites(newFavs);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
    } catch (e) {
      console.error('Error guardando favoritos:', e);
    }
  };

  // Renderiza cada receta con botón para favorito
  const renderItem = ({ item }) => {
    const isFav = favorites.includes(item.id);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Button
          title={isFav ? '❤ Quitar' : '🤍 Favorito'}
          onPress={() => toggleFavorite(item.id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Recipe Explorer</Text>
      <FlatList
        data={RECIPES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  list: { paddingHorizontal: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9F9',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  title: { fontSize: 18 },
});
