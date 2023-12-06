const BD = require("../database");

const dagCtrl = {};

dagCtrl.createDiag = async (req, res) => {
  const { nombre } = req.body;
  try {
    const sql = `INSERT INTO diagnosticos (id, nombre)
				VALUES (seq_diagnosticos.NEXTVAL, :nombre)`;
    await BD.executeQuery(
      sql,
      {
        nombre,
      },
      true
    );
    res.json({
      message: "diagnostico creada correctamente",
    });
  } catch (error) {
    console.error("Error al crear la diagnostico:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

dagCtrl.getDiag = async (req, res) => {
  try {
    const sql = `SELECT * FROM diagnosticos`;
    const result = await BD.executeQuery(sql, [], false);
    const diagnosticos = result.rows.map((diagnosticos) => ({
      id: diagnosticos[0],
      nombre: diagnosticos[1],
    }));
    res.json(diagnosticos);
  } catch (error) {
    console.error("Error al obtener las diagnosticos:", error.message);
    res.status(500).json({ error: "Error al obtener las diagnosticos:" });
  }
};

dagCtrl.delDiag = async (req, res) => {
  const diagnosticoId = req.params.id;
  try {
    const sql = `DELETE FROM diagnosticos WHERE id = :diagnosticoId`;
    await BD.executeQuery(sql, { diagnosticoId }, true);
    res.json({
      message: "diagnostico eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la diagnostico:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

dagCtrl.updateDiag = async (req, res) => {
  const discapacidadId = req.params.id;
  const { nombre } = req.body;
  try {
    const sql = `UPDATE diagnosticos SET nombre = :nombre WHERE id = :discapacidadId`;
    await BD.executeQuery(sql, { discapacidadId, nombre }, true);
    res.json({
      message: "diagnosticos actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la diagnosticos:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

module.exports = dagCtrl;
