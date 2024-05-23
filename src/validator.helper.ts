import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import { BANCOS, DatosIBAN} from "./modelo";


export function validacionFormatoIBAN(iban: string): boolean {
  const pattern = /^[A-Z]{2}\d{22}$/;
  iban = eliminarEspaciosGuiones(iban);
  return pattern.test(iban);
}

export function validacionIBANTools(iban: string): boolean {
  const ibanReturned = electronicFormatIBAN(iban);
  if (ibanReturned) {
    iban = ibanReturned;
  }
  return isValidIBAN(iban);
}

export const validarIBAN = (iban: string): DatosIBAN => {
  if (validacionFormatoIBAN(iban)) {
    if (validacionIBANTools(iban)) {
      const datosBanco = obtenerDatos(iban);
      return datosBanco;
    } else {
      throw new Error("El IBAN no es válido.");
    }
  } else {
    throw new Error("El formato del IBAN no es válido.");
  }
};

export function eliminarEspaciosGuiones(iban: string): string {
  return iban.replaceAll(" ", "").replaceAll("-", "");
}

export function obtenerDatos(iban: string): DatosIBAN {
  iban = eliminarEspaciosGuiones(iban);
  const codigoOficina = iban.substring(8, 12);
  const codigoControl = iban.substring(12, 14);
  const cuenta = iban.substring(14, 24);
  const banco = obtenerBanco(iban.substring(4, 8));
  return {
    banco: banco,
    oficina: codigoOficina,
    control: codigoControl,
    cuenta: cuenta,
  };
}

export function obtenerBanco(codigo_banco: string): string {
  const codigoBanco = codigo_banco as keyof typeof BANCOS;
  return BANCOS[codigoBanco] ? BANCOS[codigoBanco] : "Error: Banco no encontrado";
}

export const pintarDatosBanco = (datosBanco: DatosIBAN) => {
  const infoContainer = document.querySelector("#resultado");
  if (infoContainer && infoContainer instanceof HTMLDivElement) {
    infoContainer.innerHTML = `
    <p><span>Banco: </span>${datosBanco.banco}</p>
    <p><span>Código Sucursal: </span>${datosBanco.oficina}</p>
    <p><span>Dígito de control: </span>${datosBanco.control}</p>
    <p><span>Número cuenta: </span>${datosBanco.cuenta}</p>
  `;
  } else {
    throw new Error("Error al obtener el contenedor de infomación");
  }
};

export const iniciarValidacion = (event: Event): any => {
  event.preventDefault();
  const iban = document.querySelector("#iban");
  if (iban && iban instanceof HTMLInputElement) {
    try {
      const datosBanco = validarIBAN(iban.value);
      pintarDatosBanco(datosBanco);
    } catch (error) {
      const infoContainer = document.querySelector("#resultado");
      if (infoContainer && infoContainer instanceof HTMLDivElement) {
        infoContainer.innerHTML = `<p>${error}</p>`;
      }
    }
  } else {
    throw new Error("Error al obtener el valor del input");
  }
};

