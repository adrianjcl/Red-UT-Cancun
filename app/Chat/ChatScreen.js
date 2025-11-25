import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import ChatService from './ChatService'; 

export default function ChatScreen({ route, navigation }) {
  const { userName } = route.params || { userName: 'Chat' };
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
        ChatService.connect();
        ChatService.onReceiveMessage((msg) => {
          const newMsg = {
            id: Date.now() + Math.random(),
            text: msg.message,
            sender: msg.user === 'Yo' ? 'me' : 'them',
          };
          setMessages((prev) => [...prev, newMsg]);
        });
    } catch(e) { console.log(e); }
  }, []);

  const handleSend = async () => {
    if (text === '') return;
    const tempMsg = { id: Date.now(), text: text, sender: 'me' };
    setMessages(prev => [...prev, tempMsg]);
    await ChatService.sendMessage('Yo', text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ChatBubble message={item} isMe={item.sender === 'me'} />}
        contentContainerStyle={{ padding: 10 }}
      />
      <View style={styles.inputArea}>
        <TextInput 
            style={styles.input}
            value={text} 
            onChangeText={setText} 
            placeholder="Escribe..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
           <Text style={{color: 'white', fontWeight: 'bold'}}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    inputArea: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
    input: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10 },
    sendBtn: { backgroundColor: '#009688', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});