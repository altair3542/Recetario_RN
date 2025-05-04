import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>
          🍽️ ¡Hola, Recipe Explorer!
        </Text>
        <Text style={styles.subtitle}>
          Tu recetario móvil
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E86C1'
  },
  subtitle: { 
    fontSize: 18, 
    color: '#555', 
    marginTop: 8 
  }
});