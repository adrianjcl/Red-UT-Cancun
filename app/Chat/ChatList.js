import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const USERS = [
  { id: 1, name: 'Kevin A.', lastMsg: 'Hola bro', time: '8:00' },
  { id: 2, name: 'Primo', lastMsg: 'Que onda', time: '9:00' },
  { id: 3, name: 'Red UT', lastMsg: 'Aviso', time: 'ayer' },
];

export default function ChatList({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.title}>Mensajes</Text>
      </View>
      
      <FlatList 
        data={USERS}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => navigation.navigate('ChatDetalle', { userName: item.name })}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { padding: 20, paddingTop: 50, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#009688' },
  item: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#f0f0f0', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#009688', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  name: { fontWeight: 'bold', fontSize: 16 },
  msg: { color: 'gray' }
});