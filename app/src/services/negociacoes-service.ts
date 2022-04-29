import { NegociacoesDoDia } from "../interfacers/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService{
    public obterNegociacoes(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())// Pega o dado, mas como é assicrono usa-se o then // TRansformar em obj 
            .then((dados: NegociacoesDoDia[]) =>{
            return dados.map(dadoDeHoje =>{  //converter esse array em um novo array
                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante) 
            })
        })
    }
}