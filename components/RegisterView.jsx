import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { registerUser } from "../lib/apiClient";

export default function RegisterView() {
  const router = useRouter();

  // Estados para los inputs
  const [nombre, setNombre] = useState("");
  const [apellido, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (!nombre || !apellido || !correo || !password || !confirm) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await registerUser({ nombre, apellido, correo, password });
      Alert.alert("Registro exitoso", "Ahora inicia sesión.");
      router.replace("/Auth/login");
    } catch (err) {
      Alert.alert("Error en registro", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre(s)"
          placeholderTextColor="#6b7280"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          placeholderTextColor="#6b7280"
          value={apellido}
          onChangeText={setApellidos}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          placeholderTextColor="#6b7280"
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/Auth/login")}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#111827",
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
    backgroundColor: "#02967E",
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
    color: "#2563eb",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});
