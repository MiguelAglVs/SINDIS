const BD = require("../database");

const rolCtrl = {};

rolCtrl.createRol = async (req, res) => {
  const { Nombre_Rol } = req.body;
  try {

    const sql = `INSERT INTO ROLES (ID_ROL, NOMBRE_ROL)
    VALUES (seq_roles.NEXTVAL, :Nombre_Rol)`;

    await BD.executeQuery(
      sql,
      {
        Nombre_Rol
      },
      true
    );

    res.json({
      message: "Rol creado correctamente",
    });
  } catch (error) {
    console.error("Error al crear el rol:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

rolCtrl.getRoles = async (req, res) => {
  try {
    const sql = `SELECT * FROM ROLES`;

    const result = await BD.executeQuery(sql, [], false);
    const roles = result.rows.map((roles) => ({
      ID_ROL: roles[0],
      NOMBRE_ROL: roles[1],
    }));
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error.message);
    res.status(500).json({ error: "Error al obtener los roles:" });
  }
};

module.exports = rolCtrl;
