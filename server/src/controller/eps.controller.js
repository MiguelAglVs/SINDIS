const BD = require("../database");

const epsCtrl = {};

epsCtrl.createEps = async (req, res) => {
  const { nombre } = req.body;
  try {
    const sql = `INSERT INTO eps (id, nombre)
				VALUES (seq_eps.NEXTVAL, :nombre)`;
    await BD.executeQuery(
      sql,
      {
        nombre,
      },
      true
    );
    res.json({
      message: "EPS creada correctamente",
    });
  } catch (error) {
    console.error("Error al crear la EPS:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

epsCtrl.getEps = async (req, res) => {
  try {
    const sql = `SELECT * FROM eps`;
    const result = await BD.executeQuery(sql, [], false);
    const eps = result.rows.map((eps) => ({
      id: eps[0],
      nombre: eps[1],
    }));
    res.json(eps);
  } catch (error) {
    console.error("Error al obtener las EPS:", error.message);
    res.status(500).json({ error: "Error al obtener las EPS:" });
  }
};

epsCtrl.delEps = async (req, res) => {
  const epsId = req.params.id;
  try {
    const sql = `DELETE FROM eps WHERE id = :epsId`;
    await BD.executeQuery(sql, { epsId }, true);
    res.json({
      message: "EPS eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la EPS:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

epsCtrl.updateEps = async (req, res) => {
  const epsId = req.params.id;
  const { nombre } = req.body;
  try {
    const sql = `UPDATE eps SET nombre = :nombre WHERE id = :epsId`;
    await BD.executeQuery(sql, { epsId, nombre }, true);
    res.json({
      message: "EPS actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al actualizar la EPS:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

module.exports = epsCtrl;
