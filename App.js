import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, BackHandler, StatusBar, SafeAreaView, LogBox } from 'react-native';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

// Ignora advertencias amarillas molestas
LogBox.ignoreAllLogs();

// ==========================================
// 1. SERVICIO DE CHAT (BLINDADO)
// ==========================================
const API_URL = 'http://192.168.1.89:5000/chatHub'; 

class ChatService {
  constructor() {
    this.connection = null;
  }
  
  async connect() {
    // Si ya existe y está conectado, no hacemos nada
    if (this.connection && this.connection.state === HubConnectionState.Connected) {
      return;
    }

    try {
      // Si no existe, la creamos
      if (!this.connection) {
        this.connection = new HubConnectionBuilder()
          .withUrl(API_URL)
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect() // <--- ¡MAGIA! Se reconecta solo
          .build();
      }

      // Si está desconectado, iniciamos
      if (this.connection.state === HubConnectionState.Disconnected) {
        await this.connection.start();
        console.log("✅ Conectado a SignalR");
      }
    } catch (err) {
      console.log("❌ Error conexión (Revisa que tu PC esté prendida):", err);
    }
  }

  async sendMessage(userName, text) {
    // PROTECCIÓN: Solo enviamos si está conectado
    if (this.connection && this.connection.state === HubConnectionState.Connected) {
      try {
        await this.connection.invoke("SendMessage", userName, text);
      } catch (err) { console.error(err); }
    } else {
      console.log("⚠️ Esperando conexión...");
      // Intentamos reconectar por si acaso
      await this.connect();
    }
  }

  onReceiveMessage(callback) {
    if (!this.connection) return;
    // Evitamos duplicar listeners
    this.connection.off("ReceiveMessage");
    this.connection.on("ReceiveMessage", (user, message) => {
      callback({ user, message });
    });
  }
}
const chatService = new ChatService();


// ==========================================
// 2. COMPONENTES
// ==========================================

function PantallaLista({ onNavigate }) {
  const USERS = [
    { id: '1', name: 'Kevin A.', lastMsg: 'Hola bro', time: '8:00' },
    { id: '2', name: 'Primo', lastMsg: 'Que onda', time: '9:00' },
    { id: '3', name: 'Red UT', lastMsg: 'Aviso', time: 'ayer' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensajes</Text>
      </View>
      <FlatList 
        data={USERS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => onNavigate('chat', { userName: item.name })}
          >
            <View style={styles.avatar}>
               <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name.substring(0,2)}</Text>
            </View>
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.msg}>{item.lastMsg}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function PantallaChat({ params, onBack }) {
  const userName = params?.userName || 'Chat';
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const backAction = () => { onBack(); return true; };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    const iniciarChat = async () => {
        await chatService.connect();
        setIsConnected(true);
        
        chatService.onReceiveMessage((msg) => {
            const newMsg = {
              id: Date.now() + Math.random(),
              text: msg.message,
              sender: msg.user === 'Yo' ? 'me' : 'them',
            };
            setMessages((prev) => [...prev, newMsg]);
        });
    };
    iniciarChat();

    return () => backHandler.remove();
  }, []);

  const handleSend = async () => {
    if (text.trim() === '') return;
    
    const tempMsg = { id: Date.now(), text: text, sender: 'me' };
    setMessages(prev => [...prev, tempMsg]);
    
    await chatService.sendMessage('Yo', text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={{padding: 10}}>
          <Text style={styles.backBtn}>{"< Volver"}</Text>
        </TouchableOpacity>
        <Text style={styles.subTitle}>{userName}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.bubble, 
            item.sender === 'me' ? styles.rightBubble : styles.leftBubble
          ]}>
            <Text style={{ color: 'black' }}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      
      <View style={styles.inputArea}>
        <TextInput 
            style={styles.input}
            value={text} 
            onChangeText={setText} 
            placeholder="Escribe..."
            placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
           <Text style={{color: 'white', fontWeight: 'bold'}}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==========================================
// 3. APP PRINCIPAL
// ==========================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('lista');
  const [screenParams, setScreenParams] = useState({});

  const navigate = (screenName, params = {}) => {
    setScreenParams(params);
    setCurrentScreen(screenName);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {currentScreen === 'lista' ? (
        <PantallaLista onNavigate={navigate} />
      ) : (
        <PantallaChat params={screenParams} onBack={() => setCurrentScreen('lista')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { padding: 20, paddingTop: 10, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#eee' },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#009688' },
  subTitle: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  backBtn: { color: '#009688', fontWeight: 'bold', fontSize: 16, marginRight: 10 },
  item: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#009688', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  name: { fontWeight: 'bold', fontSize: 16 },
  msg: { color: 'gray' },
  inputArea: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, color: 'black' },
  sendBtn: { backgroundColor: '#009688', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  bubble: { padding: 12, borderRadius: 15, marginVertical: 5, maxWidth: '80%' },
  leftBubble: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  rightBubble: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
});