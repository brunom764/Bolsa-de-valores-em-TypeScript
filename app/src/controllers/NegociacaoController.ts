import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { NegociacaoView } from "../views/negociacoes-view.js";
import { MensagemView} from "../views/mensagem-view.js"
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from "../decorators/inspect.js";
import { domInject } from "../decorators/domInject.js";
import { NegociacoesDoDia } from "../interfacers/negociacao-do-dia.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
    @domInject("#data")
    private inputData: HTMLInputElement;
    @domInject("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @domInject("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacaoView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView')
    private negociacoesService = new NegociacoesService();
     
    constructor() { // Nao se tipa construtor
        
        /*let $ = document.querySelector.bind(document);  // Sem o bind, não funcionaria,pois ela perde a associacao com o document
        this.inputData = $('#data') as HTMLInputElement; //casting -> o tipo que vai ser retornável para o TS vai ser HTMLInputElement
        this.inputQuantidade = <HTMLInputElement>$('#quantidade');
        this.inputValor = $('#valor') as HTMLInputElement; */
        this.negociacoesView.update(this.negociacoes)

    }
    @inspect
    
    @logarTempoDeExecucao()
    public adiciona() :void { // VOid -> retorna nada
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Aceitamos apenas negociações em dias uteis')
            return
        } 
        this.negociacoes.adiciona(negociacao) // Incluir na lista
        this.limpaFormulario();
        imprimir(negociacao)
        this.atualizaView();
    }
    public importarDados():void{
            this.negociacoesService.obterNegociacoes()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacoesDeHoje =>{ // Filtra api
                    return !this.negociacoes.lista() 
                    .some(negociacao => negociacao.ehIgual(negociacoesDeHoje))}) // Busca pra ver se ha alguma igual e ai não adiciona
            })
            .then(negociacoesDeHoje =>{
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao)
                }
                this.negociacoesView.update(this.negociacoes)
            })

    }
    private limpaFormulario():void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
    }
    private atualizaView():void{
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update('Negociação adicionada com sucesso')
    }
    private ehDiaUtil(data:Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }
}
