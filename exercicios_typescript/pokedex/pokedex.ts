// Verifica se foi passado um argumento
const pokemon = process.argv[2];

// Se não tiver argumento, mostra uma mensagem de uso
if (!pokemon) {
  console.log('Por favor, informe o nome ou ID de um Pokémon.');
  process.exit(1);
}

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Função principal assíncrona que faz a requisição e exibe os dados
async function fetchPokemonInfo(pokemonIdOrName: string): Promise<void> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName.toLowerCase()}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log('Pokémon não encontrado!');
      } else {
        console.log('Erro ao buscar dados da PokéAPI.');
      }
      return;
    }

    const data = await response.json();

    // Converte altura e peso
    const alturaMetros = data.height / 10;
    const pesoKg = data.weight / 10;
    const tipos = data.types.map((t: any) => capitalize(t.type.name)).join(', ');

    // Exibe o resultado formatado
    console.log(`${capitalize(data.name)} – ${alturaMetros} m – ${pesoKg} kg – ${tipos}`);
  } catch (error) {
    console.log('Erro de rede. Tente novamente.');
  }
}

// Executa a função
fetchPokemonInfo(pokemon);
