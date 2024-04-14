const {
  getAdmins,
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/user.controller");

const BD = require('../database');
const bcrypt = require("bcrypt");

jest.mock('../database');
jest.mock('bcrypt');


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

      // Simular la ejecución de la consulta en la base de datos
      BD.executeQuery.mockResolvedValueOnce({
        rows: [
          [
            '12345678A',
            'John',
            'Doe',
            'Smith',
            'john.doe@example.com',
            'hashedPassword',
            '123 Main St',
            '123456789',
            1,
            '',
            'admin'
          ]
        ]
      });

      await getAdmins(req, res);
      //expect(res.status).toHaveBeenCalledWith(200);
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
          perfil: 'admin'
        }
      ]);
    });


    test('should return a admin created', async () => {

      const req = {};
      req.params = {};
      req.body = {
        cedula: "ejemplo",
        nombre: "ejemplo",
        apellido: "ejemplo",
        segundo_apellido: "ejemplo",
        direccion: "ejemplo",
        telefono: "ejemplo",
        correo: "ejemplo",
        contrasena: "ejemplo",
        perfil: "ejemplo"
      };
      const res = mockRes();

      bcrypt.hash.mockResolvedValueOnce("1234567");

      // Simular la ejecución de la consulta en la base de datos
      BD.executeQuery.mockResolvedValueOnce();

      await createAdmin(req, res);
      //expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Usuario creado correctamente'
      });
    });


    test('should handle errors', async () => {
      const req = mockReq();
      const res = mockRes();

      // Simular un error en la ejecución de la consulta
      BD.executeQuery = jest.fn().mockRejectedValue(new Error('Database error'));

      await getAdmins(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener usuarios' });
    });
  });

});
