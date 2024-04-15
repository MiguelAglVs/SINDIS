const { createAccessToken } = require("../libs/jwt");
const BD = require("../database");
const bcrypt = require("bcrypt");
const authCtrl = require("../controller/auth.controller");

jest.mock("../libs/jwt");
jest.mock("../database");
jest.mock("bcrypt");

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should handle successful user registration", async () => {
      const req = {
        body: {
          cedula: "1234567890",
          nombre: "Usuario",
          apellido: "Apellido",
          segundo_apellido: "SegundoApellido",
          direccion: "Calle 123",
          telefono: "123456789",
          correo: "usuario@example.com",
          contrasena: "contraseña123",
          perfil: 2,
        },
      };
      const res = { cookie: jest.fn(), json: jest.fn() };

      bcrypt.hash.mockResolvedValueOnce("hashedPassword");

      await authCtrl.register(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario creado correctamente",
      });
    });

    it("should handle error while user registration", async () => {
      const req = {
        body: {
          cedula: "1234567890",
          nombre: "Usuario",
          apellido: "Apellido",
          segundo_apellido: "SegundoApellido",
          direccion: "Calle 123",
          telefono: "123456789",
          correo: "usuario@example.com",
          contrasena: "contraseña123",
          perfil: 2,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "DB Error";
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await authCtrl.register(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error interno del servidor",
        message: errorMessage,
      });
    });
  });

  describe("login", () => {
    it("should handle successful login", async () => {
      const req = {
        body: {
          nombre: "usuario@example.com",
          contrasena: "contraseña123",
        },
      };
      const res = { cookie: jest.fn(), json: jest.fn() };
      const mockResult = {
        rows: [
          [
            "usuario123",
            "Nombre",
            "Apellido",
            "SegundoApellido",
            "usuario@example.com",
            "hashedPassword",
            "Calle 123",
            "123456789",
            1,
            2,
            "Perfil",
          ],
        ],
      };
      BD.executeQuery.mockResolvedValueOnce(mockResult);
      bcrypt.compare.mockResolvedValueOnce(true);
      createAccessToken.mockResolvedValueOnce("mockedToken");

      await authCtrl.login(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(createAccessToken).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        message: "Inicio de sesión exitoso",
        token: "mockedToken",
      });
    });

    it("should handle error while login", async () => {
      const req = {
        body: {
          nombre: "usuario@example.com",
          contrasena: "contraseña123",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = "DB Error";
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await authCtrl.login(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error interno del servidor",
        message: errorMessage,
      });
    });
  });

  describe("logout", () => {
    it("should handle successful logout", async () => {
      const req = {};
      const res = { cookie: jest.fn(), sendStatus: jest.fn() };

      await authCtrl.logout(req, res);

      expect(res.cookie).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});
