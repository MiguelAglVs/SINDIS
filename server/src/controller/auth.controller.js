const { createAccessToken } = require("../libs/jwt");
const BD = require("../database");
const bcrypt = require("bcrypt");

const authCtrl = {};

authCtrl.register = async (req, res) => {
  const { Nombre_Admin, Correo_Admin, Contrasena_Admin, Rol_Admin } = req.body;
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Contrasena_Admin, 10);

    // Definir el valor predeterminado del rol (1 si no se proporciona un rol específico)
    const rolPredeterminado = Rol_Admin || 1;

    const sql = `INSERT INTO ADMINISTRADORES (Id_Admin, Nombre_Admin, Correo_Admin, Contrasena_Admin, Rol_Admin, Estado_Admin)
    VALUES (seq_administradores.NEXTVAL, :Nombre_Admin, :Correo_Admin, :Contrasena_Admin, :Rol_Admin, 1)`;

    await BD.executeQuery(
      sql,
      {
        Nombre_Admin,
        Correo_Admin,
        Contrasena_Admin: hashedPassword,
        Rol_Admin: rolPredeterminado,
      },
      true
    );

    const token = await createAccessToken({ id: Nombre_Admin });
    // Crear un token JWT y enviarlo en la respuesta
    res.cookie("token", token);

    // Agregar el valor del rol a la respuesta
    res.json({
      message: "Administrador creado correctamente"
    });
  } catch (error) {
    console.error("Error al crear el administrador:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

authCtrl.login = async (req, res) => {
  const { Nombre_Admin, Correo_Admin, Contrasena_Admin } = req.body;
  try {
    // Consultar la base de datos para encontrar al administrador por nombre o correo
    const checkAdminSql = `SELECT A.*, R.Nombre_Rol
      FROM ADMINISTRADORES A
      LEFT JOIN ROLES R ON A.Rol_Admin = R.Id_Rol
      WHERE A.Nombre_Admin = :Nombre_Admin OR A.Correo_Admin = :Correo_Admin`;

    const checkAdminResult = await BD.executeQuery(
      checkAdminSql,
      { Nombre_Admin: Nombre_Admin, Correo_Admin: Correo_Admin },
      false
    );

    if (checkAdminResult.rows.length === 0) {
      return res.status(400).json({ message: "Administrador no encontrado" });
    }
    const storedPassword = checkAdminResult.rows[0][3];

    const isMatch = await bcrypt.compare(Contrasena_Admin, storedPassword);

    // // Si las contraseñas no coinciden, enviar una respuesta de error
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si las contraseñas coinciden, crear un token JWT y enviarlo en la respuesta
    const token = await createAccessToken({
      id: checkAdminResult.rows[0][0],
      nombre: checkAdminResult.rows[0][1],
      correo: checkAdminResult.rows[0][2],
      rol: checkAdminResult.rows[0][6],
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
  res.cookie("token", "", {
    expire: new Date(0),
  });
  return res.sendStatus(200);
};

authCtrl.perfil = async (req, res) => {
  try {
    const sql = `SELECT Id_Admin, Nombre_Admin, Correo_Admin, Rol_Admin, Estado_Admin FROM ADMINISTRADORES WHERE Id_Admin = :id`;
    const result = await BD.executeQuery(sql, { id: req.user.id }, false);
    const admin = result.rows[0];
    res.json(admin);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

module.exports = authCtrl;
