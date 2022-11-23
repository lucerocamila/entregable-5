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
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => setPokemonList(res.data.results));
   //para los types
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonTypes(res.data.results));
  }, []);

  const onClickSearchPokemon = () => {//creams funcion flecha para el onClick del button
    navigate(`/pokedex/${pokemonName}`);//agregamos en navegate lo que el usuario haya escrito
  };//el pokedex viene de pokedex/:id en app.jsx

 //funcion para el onClick en select
  const filterType = (e) => {
    const url = e.target.value; //toma la url que viene de value en el select
    //consumo los pokemon types
    axios.get(url).then((res) => setPokemonTypes(res?.data.pokemon));  
  };



  return (
    <div>
      <h1>pokemonList</h1>
       <p>Welcome {userName}!</p>{/*muestro la variable desde el useSelector */}
      <div>
      {/* input para el buscador */}
        <input 
          type="text"
          placeholder="search pokemon"
          value={pokemonName} //le agregamos el value 
          //y solictamos los que hay en el estado pokemonName
          onChange={(e) => setPokemonName(e.target.value)}//agregamos el onChange 
          //que recibe el evento y setea el estado
        />
        {/* boton para el buscador */}
        <button onClick={onClickSearchPokemon}>Search</button>
        {/* select para tipos de pokemon */}
        <select onChange={filterType} name="" id="">//onChange para capturar el input
          {pokemonTypes.map((pokemonTypes) => (//aca recibo cada type
          //y por cada ubicacion voy a mostrar un option
            <option value={pokemonTypes.url} key={pokemonTypes.name}>
              {pokemonTypes.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {pokemonList.map((pokemon) => (
          <PokemonCard //mostrara este componente por cada url
            url={pokemon.url ? pokemon.url : pokemon.url}// envio la url por props, url que me lleva al pokemon individualemnte
            key={pokemon.url ? pokemon.url : pokemon.url}
            //al principio nos muestra todos los pokemones 
            //pero luego al darle click yo quiero que me muestre pokes flitrados
            //como esta es la parte visual, pregunto si al hacer pokemon.url? 
            //pregunto si puedo acceder, si no puedo le digo que haga pokemon.pokemon
            //ya que despues del filrado necesitamos mostras las url de pokemon que es un array filtrado por tipos
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
