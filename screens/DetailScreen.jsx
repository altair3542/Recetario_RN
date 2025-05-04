import React, { useContext, useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    Button,
    ScrollView,
    StyleSheet
  } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

export default function DetailScreen({ route }) {
    const { recipe } = route.params;
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(favorites.includes(recipe.idMeal));
      }, [favorites]);

      return (
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={styles.image}
              resizeMode="cover"
            />
    
            <Text style={styles.title}>{recipe.strMeal}</Text>
    
            <View style={styles.button}>
              <Button
                title={isFav ? '💖 Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
                onPress={() => toggleFavorite(recipe.idMeal)}
              />
            </View>
    
            <Text style={styles.sectionHeader}>Instrucciones</Text>
            <Text style={styles.instructions}>
              {/* Si tuvieras instrucciones detalladas vendrían aquí */}
              Aquí irían las instrucciones de la receta. Al usar la API real,
              obtén la propiedad strInstructions.
            </Text>
          </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    container: {
      padding: 16,
      alignItems: 'center'
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 16
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center'
    },
    button: {
      width: '100%',
      marginBottom: 20
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: '600',
      alignSelf: 'flex-start',
      marginBottom: 8
    },
    instructions: {
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'left'
    }
  });