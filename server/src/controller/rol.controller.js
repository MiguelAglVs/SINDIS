const BD = require("../database");

const rolCtrl = {};

rolCtrl.createRol = async (req, res) => {
  const { nombre } = req.body;
  try {

    const sql = `INSERT INTO ROLES (id, nombre)
    VALUES (seq_roles.NEXTVAL, :nombre)`;

    await BD.executeQuery(
      sql,
      {
        nombre
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
    const sql = `SELECT * FROM roles`;

    const result = await BD.executeQuery(sql, [], false);
    const roles = result.rows.map((roles) => ({
      id: roles[0],
      nombre: roles[1],
    }));
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener los roles:", error.message);
    res.status(500).json({ error: "Error al obtener los roles:" });
  }
};

module.exports = rolCtrl;
