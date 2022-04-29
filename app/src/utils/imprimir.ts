
import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos:Imprimivel[]){ // Poliformismo
    for (let objeto of objetos) {
        console.log(objeto.paraTexto())
    }

}