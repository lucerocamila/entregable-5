import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";

//bienvenida a usuario
const Pokedex = () => {
  const userName = useSelector((state) => state.name);//renombro el estado userName y le digo con use selector que retorne la info de name
// Accediendo a las propiedades como un objeto, las cuales se ven a traves de la consola de redux
//state representa al estado (userName) name a la propiedad dentro de userName
//se puede colocar el nombre que quieras, lo mas comun es colocarle state
  const [pokemonList, setPokemonList] = useState([]);//vamos a recibir un array desde la api
  const [pokemonName, setPokemonName] = useState("");
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => setPokemonList(res.data.results));

    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((res) => setLocations(res.data.results));
  }, []);

  const searchCharacter = () => {
    navigate(`/pokemonList/${pokemonName}`);
  };

  const filterType = (e) => {
    const url = e.target.value;
    axios.get(url).then((res) => setPokemonList(res.data.residents));
  };

  console.log(pokemonList);
  return (
    <div>
      <h1>pokemonList</h1>
       <p>Welcome {userName}!</p>{/*muestro la variable desde el useSelector */}
      <div>
        <input
          type="text"
          placeholder="search character"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={searchCharacter}>Search</button>

        <select onChange={filterType} name="" id="">
          {locations.map((location) => (
            <option value={location.url} key={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {pokemonList.map((pokemon) => (
          <PokemonCard //mostrara este componente por cada url
            url={pokemon.url ? pokemon.url : pokemon}// envio la url por props, url que me lleva al pokemon individualemnte
            key={pokemon.url ? pokemon.url : pokemon}
          />
        ))}
      </ul>
    </div>
  );
};

export default Pokedex;

// Antes del filtro:
// pokemon = {
//     name: "...",
//     url: "https:"
//     ...
// }

// pokemon = "https://"

//POKEMON

// Antes del filtro
// pokemon = {
//     "name": "ivysaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/2/"
// }
// pokemon.url

// Despues del filtro
// pokemon = {
//     "pokemon": {
//         "name": "pidgey",
//         "url": "https://pokeapi.co/api/v2/pokemon/16/"
//     },
//     "slot": 1
// }
// pokemon.pokemon.url
