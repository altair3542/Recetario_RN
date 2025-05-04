import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

export default function RecipeItem({
    recipe,
    onPress,
    isFavorite,
    onToggleFavorite
}) {
    return (
        <TouchableOpacity
            onPress={() => onPress(recipe)}
            style={styles.container}
        >
            <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.thumbnail}
            />
            <Text style={styles.title}>{recipe.strMeal}</Text>
            <TouchableOpacity
                onPress={() => onToggleFavorite(recipe.idMeal)}
            >
                <Text style={styles.favorite}>
                    {isFavorite ? '❤️' : '🤍'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F4F6F7',
      padding: 12,
      marginVertical: 6,
      borderRadius: 6
    },
    thumbnail: {
      width: 50,
      height: 50,
      borderRadius: 4,
      marginRight: 12
    },
    title: {
      flex: 1,
      fontSize: 16
    },
    favorite: {
      fontSize: 18
    }
  });