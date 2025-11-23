import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import FollowList from './components/follow/FollowList';

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = "507f1f77bcf86cd799439011";

  const loadFollowers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/followers/${currentUserId}');
      const data = await response.json();
      
      if (response.ok) {
        const formattedFollowers = data.followers.map(follow => ({
          id: follow.followerId,
          username: 'user_${follow.followerId}',
          name: 'Usuario ${follow.followerId}',
          avatar: 'https://via.placeholder.com/150',
          isFollowing: true
        }));
        setFollowers(formattedFollowers);
      } else {
        setError('Error cargando seguidores');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowers();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando seguidores...</Text>
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
      <Text style={styles.title}>Seguidores</Text>
      <Text style={styles.count}>{followers.length} seguidores</Text>
      <FollowList
        users={followers}
        type="seguidores"
        onFollowChange={loadFollowers}
      />
    </View>
  );
};

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

export default FollowersScreen;