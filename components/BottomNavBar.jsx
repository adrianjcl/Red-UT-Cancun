import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNavbar() {
  const router = useRouter();

  const tabs = [
    { label: "Inicio", route: "/(tabs)/home" },
    { label: "Buscar", route: "/(tabs)/search" },
    { label: "Grabar", route: "/(tabs)/record" },
    { label: "Noti", route: "/(tabs)/notifications" },
    { label: "Mensajes", route: "/(tabs)/messages" },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => router.push(tab.route)}
        >
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>{tab.label.charAt(0)}</Text>
          </View>
          <Text style={styles.label}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 10,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  label: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
  },
});
