import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FollowList from './components/follow/FollowList';

export default function FollowingScreen() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFollowing([
        {
          id: '1',
          username: 'usuario1',
          name: 'Ana García',
          avatar: 'https://via.placeholder.com/150',
          isFollowing: true
        },
        {
          id: '2', 
          username: 'usuario2',
          name: 'Carlos López',
          avatar: 'https://via.placeholder.com/150',
          isFollowing: true
        },
        {
          id: '3',
          username: 'usuario3', 
          name: 'María Rodríguez',
          avatar: 'https://via.placeholder.com/150',
          isFollowing: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FollowList 
        users={following}
        type="siguiendo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});