const disCtrl = require('../controller/discap.controller');
const BD = require('../database');

jest.mock('../database');

describe('Discapacidad Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDisc', () => {
    it('should handle error while creating discapacidad', async () => {
      const req = { body: { nombre: 'Discapacidad Test' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await disCtrl.createDisc(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  describe('getDisc', () => {
    it('should handle error while getting discapacidades', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await disCtrl.getDisc(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener las discapacidades:' });
    });
  });

  describe('delDisc', () => {
    it('should handle error while deleting discapacidad', async () => {
      const req = { params: { id: '123' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await disCtrl.delDisc(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  describe('updateDisc', () => {
    it('should handle error while updating discapacidad', async () => {
      const req = { params: { id: '123' }, body: { nombre: 'Updated Discapacidad' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await disCtrl.updateDisc(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  // Agregar más pruebas para los otros métodos del controlador aquí...
});