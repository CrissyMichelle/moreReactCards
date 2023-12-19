import React, { useState, useEffect } from "react";
import {v1 as uuid} from "uuid";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, setPokemon] = useState([]);
  const [responses, fetchData, error] = useAxios(`https://pokeapi.co/api/v2/pokemon`);

  const addPokemon = (name) => {
    fetchData(`/${name}`);
  };

  useEffect(() => {
    if (responses.length) {
      const latestResponse = responses[responses.length - 1];
      setPokemon(pokemon => [...pokemon, { ...latestResponse, id: uuid() }]);
    }
  }, [responses]);

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites?.front_default}
            back={cardData.sprites?.back_default}
            name={cardData.name}
            stats={cardData.stats?.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            })) || []}
          />
        ))}
      </div>
      {error && <p>Error fetching data</p>}
    </div>
  );
}

export default PokeDex;
