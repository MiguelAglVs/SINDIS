const express = require("express");
const path = require("path");
const app = require("./app");
const dbConfig = require("./database");

const setupServer = async () => {
  try {
    const connection = await dbConfig.openConnection();

    // Configuración de middleware adicional
    app.use(express.urlencoded({ extended: true }));

    // Middleware de manejo de errores
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Error interno del servidor" });
    });
  } catch (error) {
    console.error("Error al conectar a Oracle:", error);
  }
};

const main = async () => {
  await app.listen(app.get("port"));
  console.log(`Servidor en el puerto http://localhost:${app.get("port")}/`);
};

setupServer().then(() => {
  main();
});
