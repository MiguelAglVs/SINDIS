const oracledb = require("oracledb");

const DbConfig = {
  user: "C##Miguel",
  password: "Miguel",
  connectString: "localhost:1521/xe",
};

let cnn;

const openConnection = async () => {
  try {
    cnn = await oracledb.getConnection(DbConfig);
    console.log("Conexión establecida con Oracle");
  } catch (error) {
    console.error("Error al establecer la conexión:", error.message);
    throw error;
  }
}

const executeQuery = async(sql, binds, autoCommit) => {
  try {
    if (!cnn) {
      await openConnection();
    }
    let result = await cnn.execute(sql, binds, { autoCommit });
    console.log("Consulta ejecutada");
    return result;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error.message);
    throw error;
  }
}

module.exports = {
  openConnection,
  executeQuery
};
