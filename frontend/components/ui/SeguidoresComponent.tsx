import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function SeguidoresComponent({ seguidores }: { seguidores: any[] }) {
  return (
    <View>
      {seguidores.map((usuario) => (
        <View key={usuario.id} style={styles.card}>
          <Image source={{ uri: usuario.imagen }} style={styles.avatar} />
          <Text style={styles.nombre}>{usuario.nombre}</Text>
          <TouchableOpacity style={styles.boton}>
            <Text style={styles.botonTexto}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9fdd3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: '#b5b4b4ff',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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