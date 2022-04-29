
import { Modelo } from "../interfacers/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> { // implementar uma interface
    
    private negociacoes: Negociacao[] = [] //Araay<Negociacao> é a msm coisa
    
    adiciona(negociacao:Negociacao) {
        
        this.negociacoes.push(negociacao);
    }
    
    lista() :readonly Negociacao[]{ // Blindar a lista de modificacoes sem ser pelo adciona 
             // podia ser ReadonlyArray<Negociacao>
        return this.negociacoes;  
    }
    public paraTexto():string{
        return JSON.stringify(this.negociacoes,null,2)
    }
    public ehIgual(negociacoes:Negociacoes): boolean{
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
    }
}