// App.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonImageUrl, setPokemonImageUrl] = useState('');

  const searchPokemon = async () => {
    let id = parseInt(pokemonId);
    if (id < 1 || id > 1025) {
      Alert.alert('Error', 'Número de Pokédex inválido. Debe estar entre 1 y 1025.');
      return;
    }

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemonData(response.data);
      fetchPokemonImage(id);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Pokémon no encontrado.');
    }
  };

  const fetchPokemonImage = async (id) => {
    if (id < 100) {
      id = id.toString().padStart(3, '0'); // Agrega ceros a la izquierda si es menor a 100
    }
    setPokemonImageUrl(`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id}.png`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <View style={{ width: '100%' }}>
        <TextInput
          style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, textAlign: 'center' }}
          placeholder="Ingrese el número de la Pokédex"
          onChangeText={text => setPokemonId(text)}
          value={pokemonId}
          keyboardType="numeric"
        />
        <Button title="Buscar Pokémon" onPress={searchPokemon} />
        {pokemonData && (
          <ScrollView style={{ marginTop: 20, width: '100%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Información del Pokémon</Text>
            <Text>Nombre: {pokemonData.name}</Text>
            <Text>Altura: {pokemonData.height}</Text>
            <Text>Peso: {pokemonData.weight}</Text>
            <Text>Tipo(s): {pokemonData.types.map(type => type.type.name).join(', ')}</Text>
            <Text>Habilidades:</Text>
            <ScrollView style={{ maxHeight: 100 }}>
              {pokemonData.abilities.map((ability, index) => (
                <Text key={index}>{ability.ability.name}</Text>
              ))}
            </ScrollView>
            <Text>Stats:</Text>
            {pokemonData.stats.map((stat, index) => (
              <Text key={index}>{stat.stat.name}: {stat.base_stat}</Text>
            ))}
          </ScrollView>
        )}
        {pokemonImageUrl && <Image source={{ uri: pokemonImageUrl }} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }} />}
      </View>
    </View>
  );
};

export default App;
