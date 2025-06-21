// Importação
import React, { Children, createContext, useState, useEffect, useContext, ReactNode} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave usada no AsyncStorage para identificar o dado salvo
const FAVORITES_KEY = '@PokedexApp:favorites';

interface FavoritesContextData {
    favorites: number[]; // Armazena os IDs favoritados.
    addFavorite: (pokemonId: number) => void; // Função que adicionar Pokemons favoritados.
    removeFavorite: (pokemonId: number) => void; // Função que remove Pokemons favoritados.
    isFavorite: (pokemonId: number) => boolean; // Função booleana que retorna true ou false se um pPokemon extá favoritado ou não. 
}

// Criação do contexto Favorito, utilizando a interface de dados definida acima. passando como um tipo generico <...>.
export const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);
// O ({} as FavoritesContextData) é uma maneira de fornecer um valor inicial que satisfaça o TypeScript

// Criação do provedor de dados
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Estado que irá armazenar os IDs dos pokémons favoritos
  const [favorites, setFavorites] = useState<number[]>([]);

// Adicionamos um estado de 'loading' para o carregamento inicial
  const [loading, setLoading] = useState(true);

  // Efeito para CARREGAR os favoritos do AsyncStorage na inicialização
  useEffect(() => {
    async function loadFavorites() {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (e) {
        console.error("Falha ao carregar os favoritos do armazenamento.", e);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, []);

  // Efeito para SALVAR os favoritos no AsyncStorage sempre que a lista mudar
  useEffect(() => {
    // Evitamos salvar no primeiro render, antes dos dados serem carregados
    if (!loading) {
      async function saveFavorites() {
        try {
          await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (e) {
          console.error("Falha ao salvar os favoritos no armazenamento.", e);
        }
      }
      saveFavorites();
    }
  }, [favorites, loading]);
  
  // Função para adicionar um favorito, garantindo que não haja duplicados
  const addFavorite = (pokemonId: number) => {
    if (!favorites.includes(pokemonId)) {
      setFavorites(prevFavorites => [...prevFavorites, pokemonId]);
    }
  };

  // Função para remover um favorito
  const removeFavorite = (pokemonId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(id => id !== pokemonId));
  };

  // Função para checar se um pokémon é favorito
  const isFavorite = (pokemonId: number) => {
    return favorites.includes(pokemonId);
  };

  // Retornamos o Provider do nosso contexto, passando o estado e as funções no 'value'
  return (
    <FavoritesContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook customizado para consumir o contexto de favoritos
export function useFavorites(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  // Garante que o hook só seja usado dentro de um FavoritesProvider
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }

  return context;
}