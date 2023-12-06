const BD = require("../database");
const moment = require("moment");

const inscrpCtrl = {};

inscrpCtrl.getInscrpciones = async (req, res) => {
  try {
    const sql = `
		SELECT
			p.dni,
			p.nombre,
			p.p_apellido,
			p.s_apellido,
      p.nacimiento,
			e.nombre AS nombre_eps,
			d.nombre AS nombre_diagnostico,
			disc.nombre AS nombre_discapacidad,
			u.nombre AS nombre_acudiente,
			u.p_apellido AS apellido_acudiente
		FROM personas p
		INNER JOIN eps e ON p.eps = e.id
		INNER JOIN diagnosticos d ON p.diagnostico = d.id
		INNER JOIN discapacidades disc ON p.discapacidad = disc.id
		INNER JOIN usuarios u ON p.usuario = u.dni
		WHERE p.estado = 1
	`;

    const result = await BD.executeQuery(sql, [], false);
    const inscritos = result.rows.map((inscrito) => ({
      dni: inscrito[0],
      nombre: inscrito[1],
      p_apellido: inscrito[2],
      s_apellido: inscrito[3],
      nacimiento: inscrito[4],
      eps: inscrito[5],
      diagnostico: inscrito[6],
      discapacidad: inscrito[7],
      nombre_acudiente: inscrito[8],
      apellido_acudiente: inscrito[9],
    }));
    res.json(inscritos);
  } catch (error) {
    console.error("Error al obtener inscritos:", error.message);
    res.status(500).json({ error: "Error al obtener inscritos" });
  }
};

inscrpCtrl.Inscpcion = async (req, res) => {
  const {
    cedula,
    nombre,
    apellido,
    segundo_apellido,
    fecha_nacimiento,
    discapacidad,
    diagnostico,
    eps,
    usuario,
  } = req.body;

  const fechaFormateada = moment(fecha_nacimiento).format("DD/MM/YYYY");

  try {
    const sql = `
		INSERT INTO personas (dni, nombre, p_apellido, s_apellido, nacimiento, discapacidad, diagnostico, eps, estado, usuario)
		VALUES (:cedula, :nombre, :apellido, :segundo_apellido, :fecha_nacimiento, :discapacidad, :diagnostico, :eps, 1, :usuario)`;

    await BD.executeQuery(
      sql,
      {
        cedula,
        nombre,
        apellido,
        segundo_apellido,
        fecha_nacimiento: fechaFormateada,
        discapacidad,
        diagnostico,
        eps,
        usuario,
      },
      true
    );

    console.log(req.body);
    res.json({
      message: "Inscripcion exitosa",
    });
  } catch (error) {
    console.error("Error al inscribir:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", message: error.message });
  }
};

inscrpCtrl.getInscrpcion = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM personas WHERE dni = :id`;
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

inscrpCtrl.deleteIncrip = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await BD.executeQuery(
      "SELECT * FROM personas WHERE dni = :id",
      { id },
      true
    );

    if (!usuario) {
      return res.status(404).json({ error: "Incipscion no encontrada" });
    }

    await BD.executeQuery(
      "UPDATE personas SET estado = 2 WHERE dni = :id",
      { id },
      true
    );

    res.json({ message: "Incipscion eliminado" });
  } catch (error) {
    console.error("Error al eliminar la Incipscion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

inscrpCtrl.updateInscrip = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      cedula,
      nombre,
      apellido,
      segundo_apellido,
      fecha_nacimiento,
      eps,
      diagnostico,
      discapacidad,
      usuario,
    } = req.body;

    console.log(req.body);

    const checkUsuarioSql = `SELECT * FROM personas WHERE dni = :id`;
    const checkUsuarioResult = await BD.executeQuery(
      checkUsuarioSql,
      { id },
      false
    );

    if (checkUsuarioResult.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const fechaFormateada = moment(fecha_nacimiento).format("DD/MM/YYYY");

    const updateUsuarioSql = `
    UPDATE personas
    SET
        nombre = COALESCE(:nombre, nombre),
        p_apellido = COALESCE(:apellido, p_apellido),
        s_apellido = COALESCE(:segundo_apellido, s_apellido),
        nacimiento = COALESCE(TO_DATE(:fecha_nacimiento), nacimiento),
        discapacidad = COALESCE(TO_NUMBER(:discapacidad), discapacidad),
        diagnostico = COALESCE(TO_NUMBER(:diagnostico), diagnostico),
        eps = COALESCE(TO_NUMBER(:eps), eps),
        estado = COALESCE(TO_NUMBER(1), estado)
    WHERE
        dni = :id
    `;

    const result = await BD.executeQuery(
      updateUsuarioSql,
      {
        id: id,
        nombre: nombre,
        apellido: apellido,
        segundo_apellido: segundo_apellido,
        fecha_nacimiento: fechaFormateada,
        discapacidad: discapacidad,
        diagnostico: diagnostico,
        eps: eps,
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

module.exports = inscrpCtrl;
