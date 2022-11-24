import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeName } from "../store/slices/name.slice";

const InputName = () => {
  //---controlar input con onchange---
  //declaramos userName que va en el value, y setUserName que va en el onChange junto a e.target.value
  const [userName, setUserName] = useState("");

  //navegacion 
  const navigate = useNavigate();//al use navigate toca ejecutarlo
  const dispatch = useDispatch();

//---funcion enter name para el OnClick---
  const enterName = () => {
    //lo que quiero que aparezca lo pongo en enterName{}
    dispatch(changeName(userName));//despacho la action, le aplico la action a user name
    navigate("/pokedex");//pongo el nombre de la ruta a la que quiero ir
  };

  return (
    <div className="welcome">
             <p>Welcome {userName}!</p>

      <h1>Input name</h1>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)} //seteamos para control de input con e.target.value
        value={userName}//user name toma lo que estoy escribiendo en el input
      />
      <button onClick={enterName}>Enter</button>
    </div>
  );
};

export default InputName;
