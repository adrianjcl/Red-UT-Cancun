// lib/apiClient.js
import { BASE_URL } from "./apiConfig";

// Función para registrar usuario
export async function registerUser({ nombre, apellido, correo, password }) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, correo, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || "Error en el registro");
  }
  return data;
}

// Función para login
export async function loginUser({ correo, password }) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || "Credenciales inválidas");
  }
  return data;
}
