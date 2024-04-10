// Importa el controlador adminCtrl
const {
    getAdmins,
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
  } = require("../controller/user.controller");

const BD = require('../database');

// Mock de datos de solicitud y respuesta
const mockReq = () => {
  const req = {};
  req.body = {};
  req.params = {};
  return req;
};

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe('Admin Controller Tests', () => {
  describe('getAdmins', () => {
    test('should return a list of admins', async () => {
      const req = mockReq();
      const res = mockRes();

      // Simula la ejecución de la consulta en la base de datos
      BD.executeQuery = jest.fn().mockResolvedValue({
        rows: [
          {
            dni: '12345678A',
            nombre: 'John',
            Papellido: 'Doe',
            Sapellido: 'Smith',
            correo: 'john.doe@example.com',
            contrasena: 'hashedPassword',
            direccion: '123 Main St',
            telefono: '123456789',
            estado: 1,
            rol: 'admin'
          }
        ]
      });

      await getAdmins(req, res);

      expect(res.json).toHaveBeenCalledWith([
        {
          dni: '12345678A',
          nombre: 'John',
          Papellido: 'Doe',
          Sapellido: 'Smith',
          correo: 'john.doe@example.com',
          contrasena: 'hashedPassword',
          direccion: '123 Main St',
          telefono: '123456789',
          estado: 1,
          rol: 'admin'
        }
      ]);
    });

    test('should handle errors', async () => {
      const req = mockReq();
      const res = mockRes();

      // Simula un error en la ejecución de la consulta
      BD.executeQuery = jest.fn().mockRejectedValue(new Error('Database error'));

      await getAdmins(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener usuarios' });
    });
  });

  // Escribe pruebas similares para otros métodos del controlador adminCtrl
});
