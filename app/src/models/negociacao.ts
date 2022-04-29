
import { Modelo } from "../interfacers/modelo.js";


export class Negociacao implements Modelo<Negociacao> {
    

    constructor(
        private _data: Date, // Impede de ser modificada
        public readonly quantidade: number,
        public readonly valor: number) {}

    get volume():number {
        return this.quantidade * this.valor;
    }
    get data(): Date{
        const data = new Date(this._data.getTime());
        return data;
    }
    public static criaDe(dataString:string,quantidadeString:string,valorString:string):Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp,','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date,quantidade,valor)
    }
    // Static -> pode chamar diretamente da instancia classe negociaçao

    public paraTexto():string {
        return `Data: ${this.data}, Quantidade: ${this.quantidade}, valor: ${this.valor}` ;
    }
    public ehIgual(negociaçao:Negociacao): boolean{
        return this.data.getDate() === negociaçao.data.getDate()
         && this.data.getMonth() === negociaçao.data.getMonth()
         && this.data.getFullYear() === negociaçao.data.getFullYear()
    }
}