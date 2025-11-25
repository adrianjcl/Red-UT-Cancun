// frontend/app/social/index.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";

type Usuario = {
  id: string; 
  nombre: string;
  imagen: any; // usamos any para aceptar require()
  activo: boolean;
  eliminado?: boolean;
};

function ListaUsuarios({
  usuarios,
  onToggle,
  esSeguidores,
}: {
  usuarios: Usuario[];
  onToggle: (id: string) => void;
  esSeguidores: boolean;
}) {
  return (
    <View>
      {usuarios.map((usuario) => {
        const esActivo = usuario.activo;
        const fueEliminado = !!usuario.eliminado;

        let label = "Seguir";
        if (esSeguidores && fueEliminado) {
          label = "Eliminado";
        } else if (esActivo) {
          label = "Eliminar";
        }

        const botonStyle = [
          styles.boton,
          esSeguidores && fueEliminado
            ? { backgroundColor: "#999" }
            : esActivo
            ? { backgroundColor: "#266e2bff" }
            : { backgroundColor: "#0ec60eff" },
        ];

        return (
          <View key={usuario.id} style={styles.card}>
            <Image source={usuario.imagen} style={styles.avatar} />
            <Text style={styles.nombre}>{usuario.nombre}</Text>
            <TouchableOpacity
              style={botonStyle}
              onPress={() => onToggle(usuario.id)}
              disabled={esSeguidores && fueEliminado}
            >
              <Text style={styles.botonTexto}>{label}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default function SocialScreen() {
  const [vistaActual, setVistaActual] = useState<"seguidores" | "seguidos">("seguidores");

  const [listaSeguidores, setListaSeguidores] = useState<Usuario[]>([
    { id: "1", nombre: "Oscar Nava", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "2", nombre: "Kevin Cano", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "3", nombre: "Topper Cortéz", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "6", nombre: "Daniel Cocom", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "7", nombre: "Marianne Gonzaga", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "8", nombre: "Andrés Flores", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "9", nombre: "Andrián ", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "10", nombre: "Alex Guillen", imagen: "https://via.placeholder.com/50", activo: true },

  ]);

  const [listaSeguidos, setListaSeguidos] = useState<Usuario[]>([
    { id: "4", nombre: "Cristopher Alx", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "5", nombre: "David Mendoza", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "3", nombre: "Kylie Jenner", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "11", nombre: "Nicole Agnesi", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "12", nombre: "Adam Sandler", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "13", nombre: "BadBunny", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "14", nombre: "Natanael Cano", imagen: "https://via.placeholder.com/50", activo: true },
    { id: "15", nombre: "Angelita La Pelona", imagen: "https://via.placeholder.com/50", activo: true },
  ]);

  const esSeguidores = vistaActual === "seguidores";
  const listaActual = esSeguidores ? listaSeguidores : listaSeguidos;

  const onToggle = (id: string) => {
    if (esSeguidores) {
      setListaSeguidores((prev) =>
        prev.map((u) => (u.id === id ? { ...u, eliminado: true } : u))
      );
      Alert.alert("Confirmación", "Se eliminó seguidor con éxito");
    } else {
      setListaSeguidos((prev) => {
        const target = prev.find((u) => u.id === id);
        const estabaActivo = !!target?.activo;
        const nuevo = prev.map((u) =>
          u.id === id ? { ...u, activo: !u.activo } : u
        );

        Alert.alert(
          "Confirmación",
          estabaActivo ? "Se dejó de seguir con éxito" : "Se empezó a seguir con éxito"
        );

        return nuevo;
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HeaderBar eliminado */}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, esSeguidores && styles.tabActive]}
          onPress={() => setVistaActual("seguidores")}
        >
          <Text style={styles.tabText}>Seguidores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, !esSeguidores && styles.tabActive]}
          onPress={() => setVistaActual("seguidos")}
        >
          <Text style={styles.tabText}>Seguidos</Text>
        </TouchableOpacity>
      </View>

      <ListaUsuarios usuarios={listaActual} onToggle={onToggle} esSeguidores={esSeguidores} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  tabActive: {
    backgroundColor: "#266e2bff",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6d897aff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#a9a8a8ff",
  },
  nombre: {
    flex: 1,
    fontSize: 16,
  },
  boton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});