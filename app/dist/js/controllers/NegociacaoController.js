var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/Negociacoes.js";
import { NegociacaoView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiasDaSemana } from "../enums/diasDaSemana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from "../decorators/inspect.js";
import { domInject } from "../decorators/domInject.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacaoView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Aceitamos apenas negociações em dias uteis');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }
    importarDados() {
        fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados) => {
            return dados.map(dadoDeHoje => {
                return new Negociacao(new Date(), dadoDeHoje.vezes, dadoDeHoje.montante);
            });
        })
            .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }
    limpaFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
    ehDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}
__decorate([
    domInject("#data")
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInject("#quantidade")
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInject("#valor")
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    inspect,
    logarTempoDeExecucao()
], NegociacaoController.prototype, "adiciona", null);
