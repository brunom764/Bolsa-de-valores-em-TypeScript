import { escapar } from "../decorators/escapar.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { View } from './view.js'

export class NegociacaoView extends View<Negociacoes>{
    @escapar
    protected template(model:Negociacoes): string {
        return `
        <table class="table table-hover table-bordered"> 
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(negociacao => {
                    return `
                        <tr>
                            <td>${this.formatar(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                        <tr>
                    `
                }).join('')} 
            </tbody>
        </table>
        `// Join ->Junta a array pra formar uma string separar por espaco
    } 
    private formatar(data:Date):string {
        return new Intl.DateTimeFormat().format(data)
    }
}