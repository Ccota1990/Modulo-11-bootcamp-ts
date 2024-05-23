import { validacionFormatoIBAN, validacionIBANTools, validarIBAN } from "./validator.helper";


describe("validacionFormatoIBAN", () => {
  it("debería devolver true si el formato del IBAN es válido", () => {
    // Arrange
    const iban = "ES2020484038835466950177";

    //Act
    const resultado = validacionFormatoIBAN(iban)

    // Assert
    expect(resultado).toBe(true);
  });

  it("debería devolver false si el formato del IBAN no es válido", () => {
    // Arrange
    const iban = "ES20204840388354pop66950177";

    // Act
    const resultado= validacionFormatoIBAN(iban);

    // Assert
    expect(resultado).toBe(false);
  });
});


describe("validacionIBANTools", () => {
  it("debería devolver true si el IBAN es válido", () => {
    // Arrange
    const iban = "ES2020484038835466950177";

    // Act
    const resultado =validacionIBANTools(iban);

    // Assert
    expect(resultado).toBe(true);
  });

  it("debería devolver false si el IBAN no es válido", () => {
    // Arrange
    const iban = "ES789221589223602366";

    // Act
    const resultado = validacionIBANTools(iban);

    // Assert
    expect(resultado).toBe(false);
  });
});

describe("validarIBAN", () => {
  it("debería devolver datos del iban IBAN ", () => {
    // Arrange
    const iban = "ES2020484038835466950177";

    // Act
    const resultado = validarIBAN(iban);

    // Assert
    expect(resultado).toEqual({
      banco: "Liberbank",
      oficina: "4038",
      control: "83",
      cuenta: "5466950177",
    });
  });

  it("debería dar error si el IBAN no tiene el formato correcto", () => {
    // Arrange
    const iban = "ES912540405pop845405";

    // Assert
    expect(() => {
      validarIBAN(iban);
    }).toThrow("El formato del IBAN no es válido.");
  });

  it("debería lanzar un error si el IBAN no es válido", () => {
    // Arrange
    const iban = "ES202048403883";

    // Assert
    expect(() => {
      validarIBAN(iban);
    }).toThrow("El formato del IBAN no es válido.");
  });
});