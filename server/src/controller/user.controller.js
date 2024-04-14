const { createAccessToken } = require("../libs/jwt");
const BD = require("../database");
const bcrypt = require("bcrypt");

const userCtrl = {};

userCtrl.getAdmins = async (req, res) => {
  try {
    const sql = `SELECT u.*, p.nombre as perfil_nombre
    FROM usuarios u
    LEFT JOIN perfiles p ON u.perfil = p.id
    WHERE u.estado = 1
    ORDER BY u.dni DESC`;

    const result = await BD.executeQuery(sql, [], false);    
    const usuarios = result.rows.map((usuario) => ({
      dni: usuario[0],
      nombre: usuario[1],
      Papellido: usuario[2],
      Sapellido: usuario[3],
      correo: usuario[4],
      contrasena: usuario[5],
      direccion: usuario[6],
      telefono: usuario[7],
      estado: usuario[8],
      perfil: usuario[10],
    }));
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

userCtrl.createAdmin = async (req, res) => {
  const {
    cedula,
    nombre,
    apellido,
    segundo_apellido,
    direccion,
    telefono,
    correo,
    contrasena,
    perfil,
  } = req.body;
  try {

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const perfilPredeterminado = perfil || 1;

    const sql = `INSERT INTO usuarios (dni, nombre, p_apellido, s_apellido, correo, contrasenia, direccion, telefono, estado, perfil)
                 VALUES (:cedula, :nombre, :apellido, :segundo_apellido, :correo, :contrasena, :direccion, :telefono, 1, :perfil)`;

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
        perfil: perfilPredeterminado,
      },
      true
    );

    const token = await createAccessToken({ id: nombre });

    res.cookie("token", token);

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

userCtrl.getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM usuarios WHERE dni = :id`;
    const result = await BD.executeQuery(sql, { id: id }, false);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuarios = result.rows.map((usuario) => ({
      dni: usuario[0],
      nombre: usuario[1],
      Papellido: usuario[2],
      Sapellido: usuario[3],
      correo: usuario[4],
      contrasena: usuario[5],
      direccion: usuario[6],
      telefono: usuario[7],
      Estado: usuario[8],
      rol: usuario[9],
    }));
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

userCtrl.deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await BD.executeQuery(
      "SELECT * FROM usuarios WHERE dni = :id",
      { id },
      true
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await BD.executeQuery(
      "UPDATE usuarios SET estado = 2 WHERE dni = :id",
      { id },
      true
    );

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

userCtrl.updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      nombre,
      apellido,
      segundo_apellido,
      direccion,
      telefono,
      correo,
      contrasena,
      perfil,
    } = req.body;

    const checkUsuarioSql = `SELECT * FROM usuarios WHERE dni = :id`;
    const checkUsuarioResult = await BD.executeQuery(
      checkUsuarioSql,
      { id },
      false
    );

    if (checkUsuarioResult.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let hashedPassword = null;

    if (contrasena) {
      hashedPassword = await bcrypt.hash(contrasena, 10);
    }

    const updateUsuarioSql = `
          UPDATE usuarios
          SET
              nombre = COALESCE(:nombre, nombre),
              p_apellido = COALESCE(:apellido, p_apellido),
              s_apellido = COALESCE(:segundo_apellido, s_apellido),
              correo = COALESCE(:correo, correo),
              contrasenia = COALESCE(:contrasena, contrasenia),
              direccion = COALESCE(:direccion, direccion),
              telefono = COALESCE(TO_NUMBER(:telefono), telefono),
              estado = COALESCE(TO_NUMBER(1), estado),
              perfil = COALESCE(TO_NUMBER(:perfil), perfil)
          WHERE
              dni = :id
    `;

    // Ejecutar la consulta de actualización y capturar el resultado
    const result = await BD.executeQuery(
      updateUsuarioSql,
      {
        id: id,
        nombre: nombre,
        apellido: apellido,
        segundo_apellido: segundo_apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        contrasena: hashedPassword,
        perfil: perfil,
      },
      true
    );

    if (result) {
      res.json({ message: "Administrador actualizado" });
    } else {
      res.status(500).json({ error: "Error al actualizar el administrador" });
    }
  } catch (error) {
    console.error("Error al actualizar el administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = userCtrl;
