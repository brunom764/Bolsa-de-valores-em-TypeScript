import { NegociacaoController } from "./controllers/NegociacaoController.js";
import { Negociacoes } from "./models/Negociacoes.js";
import { NegociacaoView } from "./views/negociacoes-view.js";

const controller = new NegociacaoController;
const form = document.querySelector('.form');
if (form) { // Diferente de null
    form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
})
} else{ // Form:null
    throw Error("Não foi possível inicializar a aplicação. Verifique se o form existe")
}
const botaoImporta = document.querySelector('#botao-importa');
if (botaoImporta){
    botaoImporta.addEventListener('click', () => {
        controller.importarDados();
    })
}else{
    throw Error('Botão importa não foi encontrado')  
}






