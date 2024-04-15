const BD = require("../database");
const contentCtrl = require("../controller/content.controller");

jest.mock("../database");

describe("Content Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createContent", () => {
    it("should handle successful creation of content", async () => {
      const req = { body: { ruta: "ruta/imagen.jpg", usuario: "usuario123" } };
      const res = { json: jest.fn() };

      await contentCtrl.createContent(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "Imagen subida correctamente",
      });
    });

    it("should handle error while creating content", async () => {
      const req = { body: { ruta: "ruta/imagen.jpg", usuario: "usuario123" } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const errorMessage = "DB Error";
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await contentCtrl.createContent(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error interno del servidor",
        message: errorMessage,
      });
    });
  });

  describe("getContents", () => {
    it("should handle successful retrieval of contents", async () => {
      const res = { json: jest.fn() };
      const mockResult = {
        rows: [
          [1, "ruta/imagen1.jpg", "usuario1", "Nombre1"],
          [2, "ruta/imagen2.jpg", "usuario2", "Nombre2"],
        ],
      };
      BD.executeQuery.mockResolvedValueOnce(mockResult);

      await contentCtrl.getContents({}, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, ruta: "ruta/imagen1.jpg", nombre: "Nombre1" },
        { id: 2, ruta: "ruta/imagen2.jpg", nombre: "Nombre2" },
      ]);
    });

    it("should handle error while retrieving contents", async () => {
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const errorMessage = "DB Error";
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await contentCtrl.getContents({}, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error al obtener las imagenes:",
      });
    });
  });

  describe("deleteContent", () => {
    it("should handle successful deletion of content", async () => {
      const req = { params: { id: 1 } };
      const res = { json: jest.fn() };

      await contentCtrl.deleteContent(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: "Imagen eliminada correctamente",
      });
    });

    it("should handle error while deleting content", async () => {
      const req = { params: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const errorMessage = "DB Error";
      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await contentCtrl.deleteContent(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Error interno del servidor",
        message: errorMessage,
      });
    });
  });
});