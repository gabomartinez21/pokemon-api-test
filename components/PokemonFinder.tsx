import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Pokemon, fetchPokemon } from './data/fetchData';
import PokemonCard from './PokemonCard';

interface PokemonFinderProps {
  onAddPokemon: (pokemon: Pokemon) => void;
}

const PokemonFinder: React.FC<PokemonFinderProps> = ({ onAddPokemon }) => {
  const [query, setQuery] = useState<string>('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const handleSearch = async () => {
    const data = await fetchPokemon(query.toLowerCase());
    if (data) {
      setPokemon(data);
    } else {
      alert("Pokémon not found!");
    }
  };

  const handleAdd = (pokemon: Pokemon) => {
    onAddPokemon(pokemon)
    setQuery('')
    setPokemon(null)
  }

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Enter Pokémon name or number"
      />
      <Button title="Search" onPress={handleSearch} />
      {pokemon && (
        <PokemonCard pokemon={pokemon} onAdd={() => handleAdd(pokemon)} />
      )}
    </View>
  );
};


export default PokemonFinder