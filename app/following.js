import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import FollowList from './components/follow/FollowList';

export default function FollowingScreen() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = "507f1f77bcf86cd799439011";

  const loadFollowing = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/following/${currentUserId}');
      const data = await response.json();
      
      if (response.ok) {
        const formattedFollowing = data.following.map(follow => ({
          id: follow.followingId,
          username: 'user_${follow.followingId}',
          name: 'Usuario ${follow.followingId}',
          avatar: 'https://via.placeholder.com/150',
          isFollowing: true
        }));
        setFollowing(formattedFollowing);
      } else {
        setError('Error cargando seguidos');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowing();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando seguidos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Siguiendo</Text>
      <Text style={styles.count}>{following.length} seguidos</Text>
      <FollowList
        users={following}
        type="siguiendo"
        onFollowChange={loadFollowing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  count: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});