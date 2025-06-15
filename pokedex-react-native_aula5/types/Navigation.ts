export type RootStackParamList = {
    Pokedex: undefined; // A tela principal não recebe parâmetros 
    PokemonDetails: { pokemonId: number }; // A tela de detalhes recebe o ID do pokémon como parâmetro
}

