import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { loginUser } from "../lib/apiClient";

export default function LoginView() {
  const router = useRouter();

  // Estados para los inputs
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!correo || !password) {
      Alert.alert("Campos incompletos", "Ingresa tu correo y contraseña.");
      return;
    }

    try {
      const res = await loginUser({ correo, password });
      Alert.alert("Bienvenido", "Ingreso exitoso");
      router.replace("/tabs/home"); // redirige al home
    } catch (err) {
      Alert.alert("Error en login", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Red UT Cancún</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          keyboardType="email-address"
          placeholderTextColor="#6b7280"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Auth/register")}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // fondo blanco
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#000000", // texto destacado
  },
  form: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#02967E", // botón principal
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#02967E", // texto destacado
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});
