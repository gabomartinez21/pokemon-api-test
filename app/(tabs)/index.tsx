import { StyleSheet, Text, View } from 'react-native';
import PokemonFinder from '@/components/PokemonFinder';
import Animated from 'react-native-reanimated';
import TeamCreator from '@/components/TeamCreator';
import TeamList from '@/components/TeamList';
import { Pokemon } from '@/components/data/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function HomeScreen() {

  const [team, setTeam] = useState<Pokemon[]>([]);
  const [teams, setTeams] = useState<Pokemon[][]>([]);

  useEffect(() => {
    const loadTeams = async () => {
      const savedTeams = await loadTeamsFromAsyncStorage();
      setTeams(savedTeams);
    };
    loadTeams();
  }, []);

  const addPokemonToTeam = (pokemon: Pokemon) => {
    if (team.length < 6 && !team.some(p => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    } else {
      alert("Team is full or Pokémon already in team!");
    }
  };

  const removePokemonFromTeam = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const saveTeam = async () => {
    const newTeams = [...teams, team];
    setTeams(newTeams);
    setTeam([]);
    await saveTeamsToAsyncStorage(newTeams);
  };

  const deleteTeam = async (index: number) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    await saveTeamsToAsyncStorage(updatedTeams);
  };

  const editTeam = (index: number) => {
    setTeam(teams[index]);
    deleteTeam(index); // Remove the team before editing
  };

  return (
    <Animated.ScrollView style={{paddingHorizontal: 20, marginTop: 40}}>
       <Text style={styles.header}>Pokémon Team Builder</Text>
      <PokemonFinder onAddPokemon={addPokemonToTeam} />
      <View style={{ marginVertical: 20}}>
        <TeamCreator team={team} onRemovePokemon={removePokemonFromTeam} onSaveTeam={saveTeam} />

      </View>
      <TeamList teams={teams} onDeleteTeam={deleteTeam} onEditTeam={editTeam} />
    </Animated.ScrollView>
  );
}

const saveTeamsToAsyncStorage = async (teams: Pokemon[][]) => {
  try {
    await AsyncStorage.setItem('pokemonTeams', JSON.stringify(teams));
  } catch (error) {
    console.error("Error saving teams:", error);
  }
};

const loadTeamsFromAsyncStorage = async (): Promise<Pokemon[][]> => {
  try {
    const teams = await AsyncStorage.getItem('pokemonTeams');
    return teams ? JSON.parse(teams) : [];
  } catch (error) {
    console.error("Error loading teams:", error);
    return [];
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});