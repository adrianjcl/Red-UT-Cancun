import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FollowButton from './components/follow/FollowButton';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = "507f1f77bcf86cd799439011";

  const sampleUsers = [
    { id: '507f1f77bcf86cd799439012', username: 'usuario1', name: 'Ana García' },
    { id: '507f1f77bcf86cd799439013', username: 'usuario2', name: 'Carlos López' },
    { id: '507f1f77bcf86cd799439014', username: 'usuario3', name: 'María Rodríguez' },
    { id: '507f1f77bcf86cd799439015', username: 'usuario4', name: 'Pedro Martínez' },
  ];

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersWithFollowStatus = await Promise.all(
        sampleUsers.map(async (user) => {
          try {
            const response = await fetch('http://localhost:3000/api/check-follow/${currentUserId}/${user.id}');
            const data = await response.json();
            return {
              ...user,
              avatar: 'https://via.placeholder.com/150',
              isFollowing: data.isFollowing
            };
          } catch (error) {
            return {
              ...user,
              avatar: 'https://via.placeholder.com/150',
              isFollowing: false
            };
          }
        })
      );
      setUsers(usersWithFollowStatus);
    } catch (error) {
      setError('Error cargando usuarios');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>@{item.username}</Text>
      </View>
      <FollowButton
        followerId={currentUserId}
        followingId={item.id}
        isFollowing={item.isFollowing}
        onFollowChange={loadUsers}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando usuarios...</Text>
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
      <Text style={styles.title}>Usuarios</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        style={styles.list}
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
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});