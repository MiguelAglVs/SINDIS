const BD = require("../database");
const dagCtrl = require('../controller/diagn.controler');

jest.mock("../database");

describe("Diagnostico Controller", () => {
  beforeEach(() => {
    BD.executeQuery.mockClear();
  });

  describe("createDiag", () => {
    it("should handle error while creating diagnóstico", async () => {
      const errorMock = new Error("DB Error");
  
      BD.executeQuery.mockRejectedValueOnce(errorMock);
  
      const req = { body: { nombre: "Nombre de la diagnóstico" } }; // Objeto de solicitud simulado
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await dagCtrl.createDiag(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor", message: errorMock.message });
      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('getDiag', () => {
    it('should handle error while getting diagnósticos', async () => {
      const req = {}; // Simulamos req y res para la función getDiag
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const errorMessage = 'DB Error';
  
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));
  
      await dagCtrl.getDiag(req, res);
  
      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener las diagnosticos:' });
    });
  });
  

  

  describe("delDiag", () => {
    it("should handle error while deleting diagnóstico", async () => {
      const errorMock = new Error("DB Error");
  
      BD.executeQuery.mockRejectedValueOnce(errorMock);
  
      const req = { params: { id: 1 } }; // Objeto de solicitud simulado con parámetros de ruta
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await dagCtrl.delDiag(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor", message: errorMock.message });
      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
    });
  });
  

  describe("updateDiag", () => {
    it("should handle error while updating diagnóstico", async () => {
      const errorMock = new Error("DB Error");

      BD.executeQuery.mockRejectedValueOnce(errorMock);

      const req = { params: { id: 123 }, body: { nombre: "Nuevo nombre" } }; // Simulamos req y res para la función updateDiag
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await dagCtrl.updateDiag(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error interno del servidor", message: errorMock.message });
      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
    });
  });
});