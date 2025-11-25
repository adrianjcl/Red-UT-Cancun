import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HeaderBar from '../../components/ui/HeaderBar';
import SeguidoresComponent from '../../components/ui/SeguidoresComponent';

const seguidores = [
  { id: '1', nombre: 'Lucía Gómez', imagen: 'https://via.placeholder.com/50' },
  { id: '2', nombre: 'Mario Torres', imagen: 'https://via.placeholder.com/50' },
  { id: '3', nombre: 'Sofía Martínez', imagen: 'https://via.placeholder.com/50' },
];

const seguidos = [
  { id: '4', nombre: 'Carlos Ruiz', imagen: 'https://via.placeholder.com/50' },
  { id: '5', nombre: 'Ana López', imagen: 'https://via.placeholder.com/50' },
];

export default function SocialScreen() {
  const [vistaActual, setVistaActual] = useState<'seguidores' | 'seguidos'>('seguidores');

  const listaActual = vistaActual === 'seguidores' ? seguidores : seguidos;

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="RED UT" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, vistaActual === 'seguidores' && styles.tabActive]}
          onPress={() => setVistaActual('seguidores')}
        >
          <Text style={styles.tabText}>Seguidores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, vistaActual === 'seguidos' && styles.tabActive]}
          onPress={() => setVistaActual('seguidos')}
        >
          <Text style={styles.tabText}>Seguidos</Text>
        </TouchableOpacity>
      </View>

      <SeguidoresComponent seguidores={listaActual} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  tabActive: {
    backgroundColor: '#1890ff',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});