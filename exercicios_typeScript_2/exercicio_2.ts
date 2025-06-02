// Exercício 2 - Tipos literais e união de tipos

// Criação do type 'sucesso'
type Sucesso = {
    tipo: "sucesso";
    dados: string[];
}

// Criação do type 'erro'
type Erro = {
    tipo: "erro";
    mensagem: string;
}

// Criação do type 'resultado' que pode ser 'sucesso' ou 'erro'
type Resultado = Sucesso | Erro;

// Função para simular uma operação que pode ter sucesso ou erro
function exibirResultado(resultado: Resultado): void {
    if(resultado.tipo === "sucesso"){
        console.log("Dados recebridos com sucesso! " + resultado.dados);
    } else{
        console.log("Erro ao receber os dados: " + resultado.mensagem);
    }
}

// Teste da da função 
const resultadoSucesso: Resultado = {
    tipo: "sucesso",   
    dados: ["Dado 1", "Dado 2", "Dado 3"]
};

const resultadoErro: Resultado = {
    tipo: "erro",   
    mensagem: "Erro ao receber os dados"
};

exibirResultado(resultadoSucesso);
exibirResultado(resultadoErro);
