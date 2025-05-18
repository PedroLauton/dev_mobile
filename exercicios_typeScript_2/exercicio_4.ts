// Exercício 4 - Funções genéricas

// Criar um tipo para representar um produto
interface Produto {
    nome: string;
    preco: number;
}

// Arrays em TypeScript
const string: String[] = [
    "Produto 1",
    "Produto 2",
    "Produto 3"
];

const number: Number[] = [
    10.99,
    20.50,
    5.75
];

const produtos: Produto[] = [
    {
        nome: "Produto 1",
        preco: 10.99
    },
    {
        nome: "Produto 2",
        preco: 20.50
    },
    {
        nome: "Produto 3",
        preco: 5.75
    }
];

// Função genérica para capturar o primeiro elemento de um array
function obterPrimeiro<T>(lista: T[]): T {
    if (lista.length === 0) {
        throw new Error("A lista está vazia.");
    }
    return lista[0];
}

// Testes de obtenção do primeiro elemento
console.log(obterPrimeiro(produtos));
console.log(obterPrimeiro(string));
console.log(obterPrimeiro(number));


