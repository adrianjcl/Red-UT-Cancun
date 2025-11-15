import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FollowersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seguidores</Text>
      <Text>¡Archivo creado correctamente!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});