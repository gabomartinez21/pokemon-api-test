import axios from 'axios';

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export const fetchPokemon = async (query: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
};
