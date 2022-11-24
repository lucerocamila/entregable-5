import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"; // debemos importarlo
import "../App.css"
const PokemonDetail = () => {

  const { id } = useParams(); //recibimos el :id dinamico con useParams
  // el cual declaramos en App.jsx



  // consumimos la api
  const [pokemon, setPokemon] = useState({});//ponemos {} porque vamos a llamar a un solo pokemon
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)//usamos backtics para que sea dinamico
      .then((res) => setPokemon(res.data));
  }, [id]);//si vamos a modificar el id es importante ponerlo aqui
  // consumimos la api

    console.log

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites?.other.dream_world.front_default}  alt="" />
      <div className={`display-container`} >
      <div className='display-header'>
      <article className='pokemon-display'>
      <h1 className= 'display-name' >{pokemon?.name}</h1>
      <img src={pokemon.sprites?.other['official-artwork'].front_default} alt="" />
    </article>
    <ul className='display-type'>
        {
          pokemon.types?.map((slot, index) => (
            <div key={slot.type.url}>{slot.type.name} {pokemon.types?.length >1 && index < pokemon.types.length-1 ? '/': ''}</div>
            
          ))
        }
        </ul>
      </div>
    <ul className='display-stats-container'>
          {
            pokemon.stats?.map(stat => (
              <li key={stat.stat.url} className='display-stats'>
                <h4>{stat.stat.name} / <span>{stat.base_stat}</span></h4>
              </li>
            ))        

          }            

        </ul>
    </div>
      
    </div>
    
  );
};

export default PokemonDetail;

