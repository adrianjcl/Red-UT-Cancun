import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const events = [
  {
    id: "1",
    author: "Kristopher Eiael Cortez Vargas",
    time: "hace 7 horas",
    title: "TORNEO DE BASKETBALL",
    image: require("../assets/basketball.jpg"),
    likes: 2434,
    comments: 2434,
  },
  {
    id: "2",
    author: "Jesús Adrián Cárdenas Calderón",
    time: "hace 6 horas",
    title: "Torneo de Ajedrez por el club",
    image: require("../assets/chess.jpg"),
    likes: 2434,
    comments: 2434,
  },
  // Puedes agregar más eventos aquí
];

export default function HomeView() {
  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <Text style={styles.heading}>Eventos destacados</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.author} · {item.time}
            </Text>
            <Text style={styles.stats}>
              ❤️ {item.likes} 💬 {item.comments}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#02967E",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: "100%", // ocupa todo el ancho del contenedor
    alignSelf: "stretch", // fuerza el estiramiento
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  meta: {
    fontSize: 12,
    color: "#6b7280",
    marginVertical: 4,
  },
  stats: {
    fontSize: 12,
    color: "#02967E",
    fontWeight: "500",
  },
});
