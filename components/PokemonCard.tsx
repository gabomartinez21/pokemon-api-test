import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { Pokemon } from './data/fetchData';

interface PokemonCardProps {
  pokemon: Pokemon;
  onAdd?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onAdd }) => (
  <View>
    <Image source={{ uri: pokemon.sprites.front_default }} style={{ width: 100, height: 100 }} />
    <Text>{pokemon.name}</Text>
    <Text>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>
    {onAdd && (
      <Button title="Add to Team" onPress={() => onAdd(pokemon)} />
    )}
  </View>
);

export default PokemonCard