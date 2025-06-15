// screens/PokemonDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';
import { Pokemon } from '../types/Pokemon'; 
import { getPokemonById } from '../services/api';
import { capitalize } from '../utils/format'; //

// Especifica novamente o type passado para essa tela
type PokemonDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

export const PokemonDetailsScreen = () => {
  // Esse hook 'useRoute', passando o tipo enviado para esse página, permite buscar os dados passados nos parâmetros
  const route = useRoute<PokemonDetailsScreenRouteProp>();

  // Captura o ID do Pokémon. 
  const { pokemonId } = route.params; 

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Realiza a requisição para a API do pokémon com base no ID.
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await getPokemonById(pokemonId);
        setPokemon(details);
      } catch (err) {
        setError('Falha ao carregar detalhes do Pokémon.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonId]);

  // Se estiver em processamento, aparece o sinal de carregando...
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  // Caso ocorra algum err, é exibido na tela
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Caso nenhum pokémon seja encontrado, exibi a seguinte mensagem
  if (!pokemon) {
    return <Text style={styles.centered}>Pokémon não encontrado.</Text>;
  }

  // Retorna um ScrollView caso os dados ultrapassem o tamanho das telas
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      <Text style={styles.idText}>ID: #{pokemon.id}</Text>
      
      <View style={styles.typesContainer}>
        <Text style={styles.sectionTitle}>Tipos:</Text>
        {pokemon.types.map((type) => (
          <Text key={type} style={styles.typeText}>{capitalize(type)}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    backgroundColor: '#f0f0f0', 
    borderRadius: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  idText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  typesContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  typeText: { 
    fontSize: 16,
    marginHorizontal: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginBottom: 4,
  },
  detailsSection: {
    marginTop: 16,
    alignItems: 'flex-start',
    width: '100%',
  }
});