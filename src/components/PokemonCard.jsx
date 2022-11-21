import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//(characterCard)
const PokemonCard = ({ url }) => { //recibimos la prop url desde pokedex
  
  //consumir api
  const [pokemon, setPokemon] = useState({});//vamos a hacer un map de los objetos
  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));//usamos la url pasada por props
  }, []);
  //consumir api END
console.log(pokemon)
  return (
    <Link to={`/pokedex/${pokemon.id}`}>
       <h1>{pokemon.name}</h1>{/*consumimos lo que queremos que se muestre */}
      <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
    </Link>
  );
};

export default PokemonCard;
