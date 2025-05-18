// Exercício 3 - Utility Types

// Criação de um tipo 'usuario' 
interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

// Criação de um array de usuários com 'omit' e 'partial'
type UsuarioSemSenha = Omit<Usuario, "senha">;
type UsuarioAtualizacao = Partial<Usuario>;

// Criação da função 'exibirPerfil' que exibe o exibe o perfil do usuário sem a senha
function exibirPerfil(usuario: UsuarioSemSenha): void {
    console.log(`ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}`);
}

// Criação da função que imita o comportamento de atualizar informações de um usuário
function atualizarUsuario(id: number, usuario: UsuarioAtualizacao): void {
    console.log(`Atualizando usuário com ID ${id}`);

    if(usuario.nome) {
        console.log('Nome atualizado para: ' + usuario.nome);
    } else if(usuario.email) {
        console.log('Email atualizado para: ' + usuario.email);
    } else if(usuario.senha) {
        console.log('Senha atualizada para: ' + usuario.senha);
    } else {
        console.log('Erro ao atualizar o usuário');
    }
}

// Teste das funções 
//Criação de um usuário
const usuario: Usuario = {
    id: 1,
    nome: "Pedro Lauton",
    email: "pedro@email.com",
    senha: "123456"
};

// Exibição do perfil do usuário sem a senha
// Omit: Cria um novo tipo omitindo a propriedade 'senha' do tipo 'Usuario'
const usuarioSemSenha: UsuarioSemSenha = usuario;
console.log(exibirPerfil(usuarioSemSenha));

// Atualização do usuário
// Partial: Cria um novo tipo tornando todas as propriedades do tipo 'Usuario' opcionais
const usuarioAtualizado: UsuarioAtualizacao = {
    nome: "Caio Dib Laronga"
}
console.log(atualizarUsuario(usuario.id, usuarioAtualizado));



