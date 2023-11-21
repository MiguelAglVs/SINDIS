const { createAccessToken } = require("../libs/jwt");
const BD = require("../database");
const bcrypt = require("bcrypt");

const authCtrl = {};

authCtrl.register = async (req, res) => {
  const {
    cedula,
    nombre,
    apellido,
    segundo_apellido,
    direccion,
    telefono,
    correo,
    contrasena,
    rol,
  } = req.body;
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Definir el valor predeterminado del rol (1 si no se proporciona un rol específico)
    const rolPredeterminado = rol || 1;

    const sql = `INSERT INTO usuarios (dni, nombre, p_apellido, s_apellido, correo, contrasenia, direccion, telefono, estado)
                 VALUES (:cedula, :nombre, :apellido, :segundo_apellido, :correo, :contrasena, :direccion, :telefono, 1)`;

    await BD.executeQuery(
      sql,
      {
        cedula,
        nombre,
        apellido,
        segundo_apellido,
        direccion,
        telefono,
        correo,
        contrasena: hashedPassword,
        // rol: rolPredeterminado,
      },
      true
    );

    const token = await createAccessToken({ id: nombre });
    // Crear un token JWT y enviarlo en la respuesta
    res.cookie("token", token);

    // Agregar el valor del rol a la respuesta
    res.json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

authCtrl.login = async (req, res) => {
  const { nombre, contrasena } = req.body;
  try {
    // Consultar la base de datos para encontrar al administrador por nombre o correo
    const checkAdminSql = `SELECT u.*, r.nombre
    FROM usuarios u
    LEFT JOIN roles r ON u.rol = r.id
    WHERE (u.nombre = :nombre OR u.correo = :nombre) AND u.estado = 1`;

    const checkAdminResult = await BD.executeQuery(
      checkAdminSql,
      {
        nombre,
      },
      false
    );

    if (checkAdminResult.rows.length === 0) {
      return res.status(400).json({ message: "Administrador no encontrado" });
    }
    const storedPassword = checkAdminResult.rows[0][5];

    const isMatch = await bcrypt.compare(contrasena, storedPassword);

    // // Si las contraseñas no coinciden, enviar una respuesta de error
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si las contraseñas coinciden, crear un token JWT y enviarlo en la respuesta
    const token = await createAccessToken({
      id: checkAdminResult.rows[0][0],
      nombre: checkAdminResult.rows[0][1],
      apellido: checkAdminResult.rows[0][2],
      segundo_apellido: checkAdminResult.rows[0][3],
      correo: checkAdminResult.rows[0][4],
      rol: checkAdminResult.rows[0][9],
      nombre_rol: checkAdminResult.rows[0][10],
    });
    res.cookie("token", token);
    res.json({ message: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    // Manejo de errores
    console.error("Error al iniciar sesión:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

authCtrl.logout = async (req, res) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);

  res.cookie("token", "", {
    expires: expirationDate,
  });

  return res.sendStatus(200);
};

module.exports = authCtrl;
