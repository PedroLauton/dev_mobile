import { groupBy, sumBy, unique } from '../utils/arrayUtilsJS';

// =========== Função Unique ===========

// Set utilizando CPF
const cpf = [40053566733, 40053566733, 40053566733, 40053566733, 45678965433];
console.log('Unique (Set): ', unique(cpf));

// Set utilizando nomes
const nomes = ['Pedro', 'Caio', 'Isabella', 'Domenico', 'Gabriela', 'Pedro', 'Caio', 'Caio'];
console.log('Unique (Set): ', unique(nomes));

// =========== Função Group By ===========

// Agrupando universitários por 'statusFaculdade' e 'idade'
const pessoas = [{nome: "Pedro", idade: 20, numeroFavorito: 13, statusFaculdade: 'Em progresso', saldoBancario: 3453545}, 
    {nome: "Caio", idade: 23, numeroFavorito: 57, statusFaculdade: 'Em progresso',saldoBancario: 534345}, 
    {nome: "Domenico", idade: 20, numeroFavorito: 22, statusFaculdade: 'Matricula trancada', saldoBancario: 34334}, 
    {nome: "Isabella", idade: 19, numeroFavorito: 34, statusFaculdade: 'Em progresso', saldoBancario: 67800}, 
    {nome: "Gabriela", idade: 20, numeroFavorito: 90, statusFaculdade: 'Concluído',saldoBancario: 2334556}]
console.log('Group By: ', groupBy(pessoas, 'statusFaculdade'))
console.log('Group By: ', groupBy(pessoas, 'idade'))

// =========== Função Sum By ===========

// Realizando a soma por 'nome' e 'idade'. Por mais que somar nome não faça sentido, é um caso distinto de soma.
console.log('Sum By: ', sumBy(pessoas, 'nome'))
console.log('Sum By: ', sumBy(pessoas, 'idade'))

