import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const FollowButton = ({ isFollowing, onPress, loading = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isFollowing ? styles.unfollow : styles.follow,
        loading && styles.disabled
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" />
      ) : (
        <Text style={[
          styles.buttonText,
          isFollowing ? styles.unfollowText : styles.followText
        ]}>
          {isFollowing ? 'Siguiendo' : 'Seguir'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  follow: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unfollow: {
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  followText: {
    color: '#FFFFFF',
  },
  unfollowText: {
    color: '#007AFF',
  },
});

export default FollowButton;