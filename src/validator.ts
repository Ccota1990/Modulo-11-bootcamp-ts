import "./style.css";
import { iniciarValidacion } from "./validator.helper";

document.addEventListener("DOMContentLoaded", () => {
  comprobarIban();
});


const comprobarIban = () => {
  const formulario = document.querySelector("#ApartadoA");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", iniciarValidacion);
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
};