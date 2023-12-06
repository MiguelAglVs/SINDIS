const BD = require("../database");

const disCtrl = {};

disCtrl.createDisc = async (req, res) => {
  const { nombre } = req.body;
  try {
    const sql = `INSERT INTO discapacidades (id, nombre)
				VALUES (seq_discapacidades.NEXTVAL, :nombre)`;
    await BD.executeQuery(
      sql,
      {
        nombre,
      },
      true
    );
    res.json({
      message: "discapacidad creada correctamente",
    });
  } catch (error) {
    console.error("Error al crear la discapacidad:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

disCtrl.getDisc = async (req, res) => {
  try {
    const sql = `SELECT * FROM discapacidades`;
    const result = await BD.executeQuery(sql, [], false);
    const discapacidades = result.rows.map((discapacidades) => ({
      id: discapacidades[0],
      nombre: discapacidades[1],
    }));
    res.json(discapacidades);
  } catch (error) {
    console.error("Error al obtener las discapacidades:", error.message);
    res.status(500).json({ error: "Error al obtener las discapacidades:" });
  }
};

disCtrl.delDisc = async (req, res) => {
  const discapacidadId = req.params.id;
  try {
    const sql = `DELETE FROM discapacidades WHERE id = :discapacidadId`;
    await BD.executeQuery(sql, { discapacidadId }, true);
    res.json({
      message: "discapacidad eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la discapacidad:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

disCtrl.updateDisc = async (req, res) => {
  const discapacidadId = req.params.id;
  const { nombre } = req.body;
  try {
    const sql = `UPDATE discapacidades SET nombre = :nombre WHERE id = :discapacidadId`;
    await BD.executeQuery(sql, { discapacidadId, nombre }, true);
    res.json({
      message: "discapacidades actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la discapacidades:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

module.exports = disCtrl;
