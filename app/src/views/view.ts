import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> {

    protected elemento: HTMLElement // garante apenas que classes filhas tenham acesso à propriedade.
    private escapar = false;
    constructor(seletor:string) { // ? -> Vira parametro opicional
        const elemento = document.querySelector(seletor)
        if (elemento) {
            this.elemento  = elemento as HTMLElement //  Tenta Atribuir como htmlelement 
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`) 
        }
    }
    /* @logarTempoDeExecucao(true) // segundos
    @inspect // Sem parentestes pois nao chama parenteses */
    update(model:T):void{
        let template = this.template(model);
        /*if (this.escapar) { // Se for true
            template = template.replace (/<script>[\s\S]*?<script>/, '') // Remove a tag script e tudo dentro dela
        }*/
        this.elemento.innerHTML = template
    }

    protected abstract template(model:T):string  
}