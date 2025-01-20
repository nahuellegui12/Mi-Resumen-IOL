// src/App.js
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Saldo from '../../components/Saldo/Saldo'
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [estado, setEstado] = useState(null);

  // Función para manejar login
  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Error al obtener el token");
      }

      const data = await res.json();
      setToken(data.access_token); // guardamos solo el access_token
    } catch (error) {
      alert(error.message);
    }
  };

  // Función para consultar estado de cuenta
  const getEstadoCuenta = async () => {
    if (!token) {
      alert("Primero inicia sesión");
      return;
    }
    try {
      const res = await fetch("/api/estado", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error("Error al obtener estado de cuenta");
      }
      const data = await res.json();
      setEstado(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Mi Interfaz IOL</h1>
      
      <LoginForm onLogin={handleLogin} />

      {token ? (
        <div>
          <p><strong>Token:</strong> {token}</p>
          <button onClick={getEstadoCuenta}>Ver Estado de Cuenta</button>
          {estado && <Saldo estado={estado} />}
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}

export default App;
