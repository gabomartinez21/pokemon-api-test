import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pokemon } from './data/fetchData';

interface TeamListProps {
  teams: Pokemon[][];
  onDeleteTeam: (index: number) => void;
  onEditTeam: (index: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onDeleteTeam, onEditTeam }) => (
  <View>
    <Text>Saved Teams</Text>
    <View style={styles.list}>
      {teams.map((team, index) => (
        <View key={index}>
          <Text>Team {index + 1}</Text>
          <Button title="Edit" onPress={() => onEditTeam(index)} />
          <Button title="Delete" onPress={() => onDeleteTeam(index)} />
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
  }
})


export default TeamList