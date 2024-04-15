const epsCtrl = require('../controller/eps.controller');
const BD = require('../database');

jest.mock('../database');

describe('Eps Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEps', () => {
    it('should handle error while creating EPS', async () => {
      const req = { body: { nombre: 'EPS Test' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await epsCtrl.createEps(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  describe('getEps', () => {
    it('should handle error while getting EPS', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await epsCtrl.getEps(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener las EPS:' });
    });
  });

  describe('delEps', () => {
    it('should handle error while deleting EPS', async () => {
      const req = { params: { id: '123' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await epsCtrl.delEps(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  describe('updateEps', () => {
    it('should handle error while updating EPS', async () => {
      const req = { params: { id: '123' }, body: { nombre: 'Updated EPS' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Configurar res con status
      const errorMessage = 'DB Error';

      BD.executeQuery.mockRejectedValueOnce(new Error(errorMessage));

      await epsCtrl.updateEps(req, res);

      expect(BD.executeQuery).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500); // Verificar que se llame res.status con el código 500
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor', message: errorMessage });
    });
  });

  // Agregar más pruebas para los otros métodos del controlador aquí...
});