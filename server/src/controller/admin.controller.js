const { createAccessToken } = require("../libs/jwt");
const BD = require("../database");
const bcrypt = require("bcrypt");

const adminCtrl = {};

adminCtrl.getAdmins = async (req, res) => {
  try {
    const sql = `SELECT * FROM ADMINISTRADORES WHERE Estado_Admin = 1`;
    const result = await BD.executeQuery(sql, [], false);
    const admins = result.rows.map((admin) => ({
      Id_Admin: admin[0],
      Nombre_Admin: admin[1],
      Correo_Admin: admin[2],
      Contrasena_Admin: admin[3],
      Rol_Admin: admin[4],
      Estado_Admin: admin[5],
    }));
    res.json(admins);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

adminCtrl.createAdmin = async (req, res) => {
  const { Nombre_Admin, Correo_Admin, Contrasena_Admin } = req.body;
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Contrasena_Admin, 10);

    const sql = `INSERT INTO ADMINISTRADORES (Id_Admin, Nombre_Admin, Correo_Admin, Contrasena_Admin, Rol_Admin, Estado_Admin)
    VALUES (seq_administradores.NEXTVAL, :Nombre_Admin, :Correo_Admin, :Contrasena_Admin, 1, 1)`;

    await BD.executeQuery(
      sql,
      { Nombre_Admin, Correo_Admin, Contrasena_Admin: hashedPassword },
      true
    );
    const token = await createAccessToken({ id: Nombre_Admin });
    // Crear un token JWT y enviarlo en la respuesta
    res.cookie("token", token);
    res.json({ message: "Administrador creado correctamente" });
  } catch (error) {
    console.error("Error al crear el administrador:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

adminCtrl.getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM ADMINISTRADORES WHERE Id_Admin = :id`;
    const result = await BD.executeQuery(sql, { id: id }, false);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    const admin = result.rows.map((admin) => ({
      Id_Admin: admin[0],
      Nombre_Admin: admin[1],
      Correo_Admin: admin[2],
      Contrasena_Admin: admin[3],
      Rol_Admin: admin[4],
      Estado_Admin: admin[5],
    }));
    res.json(admin);
  } catch (error) {
    console.error("Error al obtener el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

adminCtrl.deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const admin = await BD.executeQuery(
      "SELECT * FROM ADMINISTRADORES WHERE Id_Admin = :id",
      { id },
      true
    );

    if (!admin) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    await BD.executeQuery(
      "UPDATE ADMINISTRADORES SET Estado_Admin = 2 WHERE Id_Admin = :id",
      { id },
      true
    );

    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    console.error("Error al eliminar el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

adminCtrl.updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      Nombre_Admin,
      Correo_Admin,
      Contrasena_Admin,
      Rol_Admin,
      Estado_Admin,
    } = req.body;

    const checkAdminSql = `SELECT * FROM ADMINISTRADORES WHERE Id_Admin = :id`;
    const checkAdminResult = await BD.executeQuery(
      checkAdminSql,
      { id: id },
      false
    );

    if (checkAdminResult.rows.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(Contrasena_Admin, 10);

    const updateAdminSql = `
      UPDATE ADMINISTRADORES
      SET Nombre_Admin = :nombre, Correo_Admin = :correo, Contrasena_Admin = :contrasena, Rol_Admin = :rol, Estado_Admin = :estado
      WHERE Id_Admin = :id
    `;
    await BD.executeQuery(
      updateAdminSql,
      {
        nombre: Nombre_Admin,
        correo: Correo_Admin,
        contrasena: hashedPassword,
        rol: Rol_Admin,
        estado: Estado_Admin,
        id: id,
      },
      true
    );

    res.json({ message: "Administrador actualizado" });
  } catch (error) {
    console.error("Error al actualizar el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = adminCtrl;
