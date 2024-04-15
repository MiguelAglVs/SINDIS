const { createAccessToken } = require("../libs/jwt");
const userCtrl = require('../controller/user.controller');

jest.mock("../database");
jest.mock("bcrypt");
jest.mock("../libs/jwt");

const BD = require("../database");
const bcrypt = require("bcrypt");

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

describe('User Controller Tests', () => {
  describe('getAdmins', () => {
    test('should return a list of admins', async () => {
      const req = mockReq();
      const res = mockRes();

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

      await userCtrl.getAdmins(req, res);

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

    test('should handle errors', async () => {
      const req = mockReq();
      const res = mockRes();

      BD.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await userCtrl.getAdmins(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener usuarios" });
    });
  });

  describe('createAdmin', () => {
    test('should create a new admin', async () => {
      const req = {};
      req.params = {};
      req.body = {
        cedula: "example",
        nombre: "example",
        apellido: "example",
        segundo_apellido: "example",
        direccion: "example",
        telefono: "example",
        correo: "example",
        contrasena: "example",
        perfil: "example"
      };
      const res = mockRes();

      bcrypt.hash.mockResolvedValueOnce("hashedPassword");

      BD.executeQuery.mockResolvedValueOnce();

      createAccessToken.mockResolvedValueOnce("token");

      await userCtrl.createAdmin(req, res);

      expect(res.cookie).toHaveBeenCalledWith("token", "token");
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuario creado correctamente' });
    });

    test('should handle errors', async () => {
      const req = mockReq();
      const res = mockRes();

      BD.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await userCtrl.createAdmin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor" , message: "Database error"});
    });

    test('should handle errors', async () => {
        const req = mockReq();
        const res = mockRes();
      
        BD.executeQuery.mockRejectedValueOnce(new Error('Database error'));
      
        await userCtrl.createAdmin(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor", message: "Database error" });
      });  
});

  // Add more test cases for other functions if needed
});