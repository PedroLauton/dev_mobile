import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../contexts/FavoriteContext';

interface Props {
  pokemon: Pokemon;
}

// Define explicitamente o type da rota (Quais parâmetros a futura rota irá receber)
type PokemonCardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonDetails'>;

export const PokemonCard = ({ pokemon }: Props) => {
  // Instância o objeto 'navigation', passando o type definido anteriormente. Esse objeto tem acesso a pilha de telas definifas no app.tsx
  const navigation = useNavigation<PokemonCardNavigationProp>();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); 
  const favorite = isFavorite(pokemon.id);

  // Quando essa função é chamada, redireciona o usuário para a tela definida com o nome 'PokemonDetails' no app.tsx, passando o Id do pokémon como parâmetro.
  const handlerPress = () => {
    navigation.navigate('PokemonDetails', { pokemonId: pokemon.id});
  };

   const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    // Torna o card clicavel. E ao ser clicado, chama a função 'handlerPress' e direciona o usuário a próxima tela. 
    <TouchableOpacity onPress={handlerPress} style={styles.touchableCard}>
      <View style={[styles.cardInner,favorite && styles.cardFavorite]}>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>{favorite ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableCard: {
    flex: 1,
    margin: 8,
  },
  cardInner: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    position: 'relative', // Para posicionar o botão de favorito
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardFavorite: {
    backgroundColor: '#fffbe6', // Cor de fundo para favoritos
    borderColor: '#facc15',
    borderWidth: 2,
  },
  image: { width: 80, height: 80 },
  name: { marginTop: 8, fontWeight: 'bold' },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  favoriteIcon: {
    fontSize: 24,
  },
});