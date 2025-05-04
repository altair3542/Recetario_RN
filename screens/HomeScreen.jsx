// screens/HomeScreen.js
import React, { useState, useEffect, useContext } from 'react';  // <-- Asegúrate de importar useState
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';
import { fetchRecipesByIngredient } from '../services/api';
import RecipeItem from '../components/RecipeItem';
import { FavoritesContext } from '../context/FavoritesContext';

export default function HomeScreen({ navigation }) {
  // ① Declara 'recipes' y 'setRecipes'
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchRecipesByIngredient('chicken')
      .then(data => {
        setRecipes(data);      // <-- Aquí usas setRecipes
      })
      .catch(error => {
        console.error('Error al cargar recetas:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E86C1" testID="loading-indicator" />
      </SafeAreaView>
    );
  }

  if (!recipes.length) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay recetas.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <RecipeItem
            recipe={item}
            onPress={r => navigation.navigate('Detail', { recipe: r })}
            isFavorite={favorites.includes(item.idMeal)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyText: {
    fontSize: 18, color: '#555'
  },
  container: {
    flex: 1, backgroundColor: '#fff'
  },
  list: {
    paddingHorizontal: 16, paddingTop: 8
  }
});
