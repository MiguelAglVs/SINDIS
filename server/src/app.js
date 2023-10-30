const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

const AdminRoutes = require("./routes/admin");
const AuthRoutes = require("./routes/auth.routes");
const RolRoutes = require("./routes/rol.routes");

// Configuración
app.set("port", process.env.PORT || 3000);

// Configuración de CORS
const corsOptions = {
  origin: "*", // Reemplaza con el dominio de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Habilitar el envío de cookies de sesión
  optionsSuccessStatus: 204, // Establece el código de respuesta para las pre-solicitudes OPTIONS
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

// Rutas API
app.use("/api/admin", AdminRoutes);
app.use("/api", AuthRoutes);
app.use("/api", RolRoutes);

module.exports = app;
