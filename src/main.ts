import "./style.css";

console.log("Hello Typescript!");

const myValueOk = "imagenA";
const myValueNotOk = "imag";
const pattern = /imagen./;
const resultOk = pattern.test(myValueOk);
console.log("resultadoOk: ", resultOk);
const resultNotOk = pattern.test(myValueNotOk);
console.log("resultadoNotOk: ", resultNotOk);