import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const FollowButton = ({ followerId, followingId, isFollowing: initialIsFollowing, onFollowChange }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);

    const handleFollowPress = async () => {
        setLoading(true);
        try {
            if (isFollowing) {
                // Dejar de seguir
                await fetch('http://localhost:3000/api/unfollow', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        followerId: followerId,
                        followingId: followingId
                    })
                });
                setIsFollowing(false);
                Alert.alert('Éxito', 'Has dejado de seguir a este usuario');
            } else {
                // Seguir
                await fetch('http://localhost:3000/api/follow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        followerId: followerId,
                        followingId: followingId
                    })
                });
                setIsFollowing(true);
                Alert.alert('Éxito', 'Ahora sigues a este usuario');
            }
            
            if (onFollowChange) {
                onFollowChange(!isFollowing);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo completar la acción');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isFollowing ? styles.unfollow : styles.follow,
                loading && styles.disabled
            ]}
            onPress={handleFollowPress}
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