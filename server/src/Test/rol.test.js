// Mock de BD.executeQuery
jest.mock('../database', () => {
    return {
      executeQuery: jest.fn(),
    };
  });
  
  // Importa el controlador de roles
  const rolCtrl = require('../controller/rol.controller');
  const BD = require('../database');
  
  // Mock de datos de solicitud y respuesta
  const mockReq = () => {
    const req = {};
    req.body = {};
    return req;
  };
  
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  describe('Rol Controller Tests', () => {
    describe('createRol', () => {
      test('should create a new role', async () => {
        const req = mockReq();
        req.body.nombre = 'Test Role';
  
        const res = mockRes();
  
        // Simular la inserción en la base de datos
        BD.executeQuery.mockResolvedValueOnce();
  
        await rolCtrl.createRol(req, res);
  
        expect(res.json).toHaveBeenCalledWith({
          message: 'Rol creado correctamente',
        });
      });
  
      test('should handle errors', async () => {
        const req = mockReq();
        req.body.nombre = 'Test Role';
  
        const res = mockRes();
  
        // Simular un error en la inserción en la base de datos
        BD.executeQuery.mockRejectedValueOnce(new Error('Database error'));
  
        await rolCtrl.createRol(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Error interno del servidor',
          message: 'Database error',
        });
      });
    });
  
    describe('getRoles', () => {
      test('should return a list of roles', async () => {
        const req = mockReq();
        const res = mockRes();
  
        // Simular la obtención de roles desde la base de datos
        BD.executeQuery.mockResolvedValueOnce({
          rows: [
            [1, 'Admin'],
            [2, 'User'],
          ],
        });
  
        await rolCtrl.getRoles(req, res);
  
        expect(res.json).toHaveBeenCalledWith([
          { id: 1, nombre: 'Admin' },
          { id: 2, nombre: 'User' },
        ]);
      });
  
      test('should handle errors', async () => {
        const req = mockReq();
        const res = mockRes();
  
        // Simular un error en la obtención de roles desde la base de datos
        BD.executeQuery.mockRejectedValueOnce(new Error('Database error'));
  
        await rolCtrl.getRoles(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Error al obtener los roles:',
        });
      });
    });
  });
  