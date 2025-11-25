import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HeaderBar from '../../components/ui/HeaderBar';

type Usuario = {
  id: string;
  nombre: string;
  imagen: string;
};

type Props = {
  seguidores: Usuario[];
  onEliminar: (id: string) => void;
};

function SeguidoresComponent({ seguidores, onEliminar }: Props) {
  return (
    <View>
      {seguidores.map((usuario) => (
        <View key={usuario.id} style={styles.card}>
          <Image source={{ uri: usuario.imagen }} style={styles.avatar} />
          <Text style={styles.nombre}>{usuario.nombre}</Text>
          <TouchableOpacity style={styles.boton} onPress={() => onEliminar(usuario.id)}>
            <Text style={styles.botonTexto}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default function SocialScreen() {
  const [vistaActual, setVistaActual] = useState<'seguidores' | 'seguidos'>('seguidores');

  const [listaSeguidores, setListaSeguidores] = useState<Usuario[]>([
    { id: '1', nombre: 'Lucía Gómez', imagen: 'https://via.placeholder.com/50' },
    { id: '2', nombre: 'Mario Torres', imagen: 'https://via.placeholder.com/50' },
    { id: '3', nombre: 'Sofía Martínez', imagen: 'https://via.placeholder.com/50' },
  ]);

  const [listaSeguidos, setListaSeguidos] = useState<Usuario[]>([
    { id: '4', nombre: 'Carlos Ruiz', imagen: 'https://via.placeholder.com/50' },
    { id: '5', nombre: 'Ana López', imagen: 'https://via.placeholder.com/50' },
  ]);

  const listaActual = vistaActual === 'seguidores' ? listaSeguidores : listaSeguidos;

  const eliminarUsuario = (id: string) => {
    if (vistaActual === 'seguidores') {
      setListaSeguidores(prev => prev.filter(u => u.id !== id));
    } else {
      setListaSeguidos(prev => prev.filter(u => u.id !== id));
    }
  };

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

      <SeguidoresComponent seguidores={listaActual} onEliminar={eliminarUsuario} />
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9fdd3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  nombre: {
    flex: 1,
    fontSize: 16,
  },
  boton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});