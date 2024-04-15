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
jest.mock('../database');



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
        cedula: "159",
        nombre: "Pablo",
        apellido: "Perez",
        segundo_apellido: "Montoya",
        direccion: "calle 123o",
        telefono: "9864912",
        correo: "pabloperez@gmail.com",
        contrasena: "queso123",
        perfil: "administracion"
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


  // Mock para el objeto `req`
  const req = {
    params: {
      id: '123456789' // ID de ejemplo
    }
  };

  // Mock para el objeto `res`
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  describe('deleteAdmin', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('debería eliminar el usuario correctamente', async () => {
      // Mock de BD.executeQuery para simular la respuesta de usuario encontrado
      BD.executeQuery.mockResolvedValue({
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

      await deleteAdmin(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "Usuario eliminado" });
    });

    it('debería devolver un error 404 si el usuario no existe', async () => {
      // Mock de BD.executeQuery para simular que no se encuentra el usuario
      BD.executeQuery.mockResolvedValueOnce(undefined);

      await deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" });
    });

    it('debería devolver un error 500 si hay un error interno', async () => {
      // Mock de BD.executeQuery para simular un error interno
      BD.executeQuery.mockRejectedValueOnce(new Error('Error interno'));

      await deleteAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor" });
    });
  });

});
