// server.js
const express = require("express");
const cors = require("cors");

// Si usas Node >= 18, 'fetch' ya viene nativo. 
// De lo contrario, instala node-fetch y descomenta la línea de abajo:
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());           // Permite solicitudes desde otro origen (React)
app.use(express.json());   // Parsear cuerpo JSON

// Ejemplo: /api/login para autenticar en IOL
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const bodyData = new URLSearchParams({
    username,
    password,
    grant_type: "password",
  });

  try {
    const response = await fetch("https://api.invertironline.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: bodyData.toString(),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener token" });
    }

    const data = await response.json();
    // Devuelve al front (React) el JSON completo de la respuesta
    return res.json(data);

  } catch (error) {
    console.error("Error en /api/login:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Ejemplo adicional: /api/estado para obtener estado de cuenta
app.get("/api/estado", async (req, res) => {
  const bearerToken = req.headers.authorization; 
  // El front (React) debería enviar { headers: { Authorization: 'Bearer xxxxxx' } }

  try {
    const response = await fetch("https://api.invertironline.com/api/estadocuenta", {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener estado de cuenta" });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error en /api/estado:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Inicializar el servidor
const PORT = 4000; // Elegimos 4000 para no chocar con React en 3000
app.listen(PORT, () => {
  console.log(`Servidor Node escuchando en http://localhost:${PORT}`);
});
