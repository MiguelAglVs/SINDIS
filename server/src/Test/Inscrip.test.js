const BD = require("../database");
const moment = require("moment");
const inscrpCtrl = require("../controller/Inscrip.controler");

jest.mock("../database");
jest.mock("moment", () => {
  const originalMoment = jest.requireActual("moment");
  const mockedMoment = (date) => {
    const originalInstance = originalMoment(date);
    originalInstance.format = jest.fn(() => "01/01/2022"); // Mockear el valor de format
    return originalInstance;
  };
  return mockedMoment;
});

describe("Inscripciones Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getInscrpciones", () => {
    it("should handle successful retrieval of inscripciones", async () => {
      // Resto de la prueba aquí
    });

    it("should handle error while retrieving inscripciones", async () => {
      // Resto de la prueba aquí
    });
  });

  describe("Inscpcion", () => {
    it("should handle successful inscripcion", async () => {
      // Resto de la prueba aquí
    });

    it("should handle error while inscripcion", async () => {
      // Resto de la prueba aquí
    });
  });

  // Resto de las pruebas para las demás funciones del controlador de inscripciones

});
