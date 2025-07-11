import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffSet] = useState(0);
  const [error, setError] = useState<string>('');

  const insets = useSafeAreaInsets();
  const limit = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getPokemons(limit, offset); // primeiros 30 pokémons
        const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
        setPokemons(details);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMorePokemons = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    
    const nextOffset = offset + limit;

    try {
      const list = await getPokemons(limit, nextOffset); 
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(prev => [...prev, ...details]);
      setOffSet(nextOffset);
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setIsLoadingMore(false);
    }
  }

  const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {isLoading ? (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff0000"/>
            <Text style={styles.titleSecondary}>Carregando Pokémons...</Text>
        </View>
      ) : (<FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMorePokemons}
        ListFooterComponent={isLoadingMore && search === '' ? (<ActivityIndicator size="large" color="#ff0000" />) : null}
        ListEmptyComponent={() => 
            pokemons.length == 0 ? (
                <Text style={styles.titleSecondary}>Nenhum Pokémon para exibir nesse momento.</Text>
            ) : (
            <Text style={styles.titleSecondary}>Nenhum Pokémon encontrado para<Text style={styles.highlightedText}> {search}</Text></Text>
        )}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  titleSecondary: { fontSize: 22, fontWeight: 'bold', marginLeft: 10},
  highlightedText: {color: "red"},
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,       
    marginBottom: 20,
    borderColor: '#888',
    height: 40,
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  error: {
    fontSize: 15,
    color: "red",
    margin: 20,
  }
});

function fetchData() {
    throw new Error('Function not implemented.');
}
