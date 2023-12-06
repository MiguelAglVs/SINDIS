const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

const UserRoutes = require("./routes/admin.routes");
const AuthRoutes = require("./routes/auth.routes");
const RolRoutes = require("./routes/rol.routes");
const ContentRoutes = require("./routes/content.routes");
const EpsRoutes = require("./routes/eps.routes");
const DiscapRoutes = require("./routes/Discp.routes")
const DiagnRoutes = require("./routes/diag.routes")
const IncripRoutes = require("./routes/inscrip.routes")

// Configuración
app.set("port", process.env.PORT || 3000);

// Configuración de CORS
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
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
app.use("/api", UserRoutes);
app.use("/api", AuthRoutes);
app.use("/api", RolRoutes);
app.use("/api", ContentRoutes);
app.use("/api", EpsRoutes);
app.use("/api", DiscapRoutes)
app.use("/api", DiagnRoutes)
app.use("/api", IncripRoutes)

module.exports = app;
