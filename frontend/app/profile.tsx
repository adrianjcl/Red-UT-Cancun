import { View, Text, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function ProfileScreen() {
  const currentUserId = 1;
  const followedId = 2;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const res = await fetch(`http://192.168.1.8:3000/api/follow/${followedId}, {`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followerId: currentUserId })
      });
      const data = await res.json();
      Alert.alert(data.message);
      setIsFollowing(true);
    } catch (error) {
      Alert.alert('Error al seguir');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Perfil del usuario {followedId}</Text>
      <Button
        title={isFollowing ? 'Siguiendo' : 'Seguir'}
        onPress={handleFollow}
        disabled={isFollowing}
      />
    </View>
  );
}