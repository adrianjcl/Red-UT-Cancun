import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FollowItem from './FollowItem';

const FollowList = ({ users, type = 'seguidores' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'seguidores' ? 'Seguidores' : 'Siguiendo'}
      </Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FollowItem user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default FollowList;