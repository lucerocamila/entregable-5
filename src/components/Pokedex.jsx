import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../App.css"

//bienvenida a usuario
const Pokedex = () => {
  const userName = useSelector((state) => state.name);//renombro el estado userName y le digo con use selector que retorne la info de name
// Accediendo a las propiedades como un objeto, las cuales se ven a traves de la consola de redux
//state representa al estado (userName) name a la propiedad dentro de userName
//se puede colocar el nombre que quieras, lo mas comun es colocarle state
 
//estado para consumir el listado de pokemons
const [pokemonList, setPokemonList] = useState([]);//vamos a recibir un array desde la api

//estado para capturar lo que escribe usuario usandolo en onChamge
  const [pokemonName, setPokemonName] = useState("");//string vacio porque es para el input

//estado para consumir los types
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //para pokemos
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100")
      .then((res) => setPokemonList(res.data.results));
   //para los types
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonTypes(res.data.results));
  }, []);

  const onClickSearchPokemon = () => {
    navigate(`/pokedex/${pokemonName}`);
  };

 //funcion para el onClick en select
  const filterType = (e) => {
    const url = e.target.value; 
    axios.get(url).then((res) => setPokemonTypes(res?.data.pokemon));  
  };
  const [page, setPage] = useState(1);
  const pokemonsPerPage = 10;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = pokemonList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemonList?.length / pokemonsPerPage);
  const numbers = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }




  return (
    <div className='App'>
      <h1 className='title'>Hi {userName}! <br /> Choose your pokemon</h1>
      <div>
      {/* input para el buscador */}
        <input 
          type="text"
          placeholder="search pokemon"
          value={pokemonName} 
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={onClickSearchPokemon}>Search</button>
        {/* select para tipos de pokemon */}
        <select onChange={filterType} name="" id="">
          {pokemonTypes.map((pokemonTypes) => (
            <option key={pokemonTypes.url} value={pokemonTypes.url}>
              {pokemonTypes.name}
            </option>
          ))}
        </select>
      </div>        
      
      <p className='keep'>Keep going!</p>

      <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev pag
          </button>
          {numbers.map((number) => (
            <button key={number} onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next pag
          </button>
          </div>
      <ul >
        {pokemonPaginated.map((pokemon) => (
          <PokemonCard //mostrara este componente por cada url
            url={pokemon.url ? pokemon.url : pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.url}
           
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
