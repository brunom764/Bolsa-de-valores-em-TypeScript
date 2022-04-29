export function domInject(seletor:string){ // Decorator de propridade
    return function( target:any, propertyKey: string){
    console.log(`modificando prototype ${target.constructor.name} e adicionandogetterpara a propriedade ${propertyKey}`)
    let elemento: HTMLElement
    const getter = function(){
        if (!elemento) { // for nulo ai busca
            elemento = <HTMLElement>document.querySelector(seletor)
            console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`)
        }
        return elemento
    }
    Object.defineProperty(target,propertyKey, {get:getter}) // nesse prototype que define a classe negociacao-controller e eu quero adicionar um getter para a propriedade propertyKey
  }
}