// Exercicio 1 - Tipos, interfaces e métodos de array

// Criar um tipo para representar um livro
interface Livro {
    titulo: string;
    autor: string;
    ano: number;
    disponivel: boolean;
}

//Criação de um array de livros
const biblioteca: Livro[] = [
    {
        titulo: "O Senhor dos Anéis",
        autor: "J.R.R. Tolkien",
        ano: 1954,
        disponivel: true
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        ano: 1949,
        disponivel: false
    },
    {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899,
        disponivel: true
    }
];

// Função para listar os títulos dos livros disponíveis
function listarTitulosDisponiveis(livros: Livro[]): string[] {
    return livros
        .filter(livro => livro.disponivel)
        .map(livro => livro.titulo);
}

console.log(listarTitulosDisponiveis(biblioteca));