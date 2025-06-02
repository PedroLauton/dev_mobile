// Exercicio 5 - Tipagem em componentes e props

// Definindo a interface para as propriedades do botão
interface PropsBotão {
    titulo: string;
    ativo?: boolean; // '?' indica que a propriedade é opcional
}

// Função para renderizar o botão e verificar se ele está ativo
function renderizarBotão({ titulo, ativo = true }: PropsBotão): string{
    return ativo ? '[ ${titulo} ]' : '[ ${titulo} ]';
}

// Testando a função renderizarBotão
console.log(renderizarBotão({ titulo: 'Clique aqui' })); 
console.log(renderizarBotão({ titulo: 'Clique aqui', ativo: false })); 