import type { Universitario } from '../models/Universitario';
import { groupBy, sumBy, unique } from '../utils/arrayUtilsTS';

let pessoas: Universitario[] = [
    {
        cpf: 5676456675,
        nome: "Caio",
        idade: 33,
        saldoBancario: 3434.00,
        statusFaculdade: "Em progresso",
    },
    {
        cpf: 233323444,
        nome: "Domenico",
        idade: 67,
        saldoBancario: 43534534.00,
        statusFaculdade: "Matricula trancada",
    }, 
    {
        cpf: 4567866544,
        nome: "isabella",
        idade: 40,
        saldoBancario: 355.00,
        statusFaculdade: "Em progresso",
    },
    {
        cpf: 75648376322,
        nome: "Pedro",
        idade: 30,
        saldoBancario: 23423424.00,
        statusFaculdade: "Em progresso",
    }
];

// =========== Função Unique ===========

// Set utilizando um array de pessoas
console.log('Unique (Set): ', unique(pessoas));

// =========== Função Group By ===========

// Agrupando universitários por 'statusFaculdade' e 'idade'
console.log('Group By: ', groupBy(pessoas, 'statusFaculdade'))
console.log('Group By: ', groupBy(pessoas, 'idade'))

// =========== Função Sum By ===========

// Realizando a soma por 'nome' e 'idade'. Por mais que somar nome não faça sentido, é um caso distinto de soma.
console.log('Sum By: ', sumBy(pessoas, 'nome'))
console.log('Sum By: ', sumBy(pessoas, 'idade'))