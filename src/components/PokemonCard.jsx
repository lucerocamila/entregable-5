import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"


//(characterCard)
const PokemonCard = ({ url }) => { //recibimos la prop url desde pokedex
  const StatPokemon = ({infoStat}) => {
    return (
      <li className='pokestat'>
        <h4>{infoStat.stat.name} / </h4>
        <p> {infoStat.base_stat}</p>
      </li>)}

  //consumir api
  const [pokemon, setPokemon] = useState({});//vamos a hacer un map de los objetos
  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));//usamos la url pasada por props
  }, []);
  //consumir api END
  return (
    <Link to={`/pokedex/${pokemon.id}`}>
     <article className="card">
     <header className='header'>
      <h3>{pokemon.name}</h3>
      <div className="see-more">
         more
        </div>
       </header> 
           <section className='card__img'>
        <img src={pokemon.sprites?.other["official-artwork"]["front_default"]} alt="" />
       
      </section>
     
      
      </article>
      <div className="div-footer">
      <div className="type">  
      
        <ul>
        {
          pokemon.types?.map((slot, index) => (
            <div key={slot.type.url}>{slot.type.name} {pokemon.types.length >1 && index < pokemon.types.length-1 ? '/': ''}</div>
            
          ))
          
        }
        </ul>
      <h2>TYPE</h2>
        
        </div>
      <footer className="footer-card">
        <ul>
          {
            pokemon.stats?.map(stat => (
              <StatPokemon 
                key={stat.stat.url}
                infoStat={stat}
              />
            ))
          }
        </ul>
      </footer>
 </div>
    </Link>
  );
};

export default PokemonCard;
