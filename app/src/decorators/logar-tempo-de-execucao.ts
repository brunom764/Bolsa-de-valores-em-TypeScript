export function logarTempoDeExecucao(emSegundos:boolean = false) { // Passar parametros
    return function(
        target:any, // Static -> funciona como construtor , nao estaic -> Retorna o prototype da classe. inrelevante nesse conexto
        propertyKey: string, // dá o nome do método como string que foi decorado
        descriptor: PropertyDescriptor  // sabe tudo sobre o método que queremos executar, que queremos modificar, ele tem uma referência para o método original
    ) {
        const metodoOriginal = descriptor.value
        descriptor.value = function(...args:Array<any>) {
            let divisor = 1;
            let unidades = "milisegundos"
            if (emSegundos){
                divisor = 1000
                unidades = "segundos";
            }
            const t1 = performance.now(); // Tempo para executar algo
            const retorno = metodoOriginal.apply(this, args) // Executa no contexto this e tem como parametros os argumentos do array
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução ${(t2-t1)/divisor} ${unidades}`)
            retorno
        }
        return descriptor
    }
}