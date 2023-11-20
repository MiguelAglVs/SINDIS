const BD = require("../database");

const contentCtrl = {};

contentCtrl.createContent = async (req, res) => {
  const { ruta, usuario } = req.body;

  try {
    const sql = `INSERT INTO imagenes (id, ruta, usuario)
				  VALUES (seq_imagenes.NEXTVAL, :ruta, :usuario)`;

    await BD.executeQuery(
      sql,
      {
        ruta,
        usuario,
      },
      true
    );

    res.json({
      message: "Imagen subida correctamente",
    });
  } catch (error) {
    console.error("Error al crear el contenido:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

contentCtrl.getContents = async (req, res) => {
  try {
    const sql = `
    SELECT i.*, u.nombre, u.p_apellido as apellido
    FROM imagenes i
    INNER JOIN usuarios u ON i.usuario = u.dni
    ORDER BY i.id DESC
    `;

    const result = await BD.executeQuery(sql, {}, false);
    const roles = result.rows.map((roles) => ({
      id: roles[0],
      ruta: roles[1],
      nombre: roles[3],
    }));
    res.json(roles);
  } catch (error) {
    console.error("Error al obtener las imagenes:", error.message);
    res.status(500).json({ error: "Error al obtener las imagenes:" });
  }
};

contentCtrl.deleteContent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const sql = `DELETE FROM imagenes WHERE id = :id`;

    await BD.executeQuery(sql, { id }, true);

    res.json({
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

module.exports = contentCtrl;
