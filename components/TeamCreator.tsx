import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import PokemonCard from './PokemonCard';
import { Pokemon } from './data/fetchData';

interface TeamCreatorProps {
  team: Pokemon[];
  onRemovePokemon: (index: number) => void;
  onSaveTeam: () => void;
}

const TeamCreator: React.FC<TeamCreatorProps> = ({ team, onRemovePokemon, onSaveTeam }) => (
  <View>
    <Text>Your Team</Text>
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {team.map((item, index) => (
        <View>
          <PokemonCard pokemon={item}/>
          <Button title="Remove" onPress={() => onRemovePokemon(index)} />
        </View>
      )
      )}
    </View>
    <Button title="Save Team" onPress={onSaveTeam} disabled={team.length !== 6} />
  </View>
);


export default TeamCreator