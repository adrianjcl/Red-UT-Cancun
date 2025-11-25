import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message, isMe }) {
  // Convertimos a booleano real por seguridad
  const amISender = Boolean(isMe);

  return (
    <View style={[
      styles.bubble, 
      amISender ? styles.rightBubble : styles.leftBubble
    ]}>
      <Text style={{ color: 'black' }}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { padding: 12, borderRadius: 15, marginVertical: 5, maxWidth: '80%' },
  leftBubble: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  rightBubble: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
});