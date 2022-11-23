import { createSlice } from "@reduxjs/toolkit";
// hacemos un listado utilizando slice (ej name.slice.jsx)
export const nameSlice = createSlice({
  name: "name", //colacamos name: “name” (por el nombre de nuestro slice)
  initialState: "",//colamos un string vacio para que el usuario coloque
  // su nombre sin problema
  reducers: {
    //1ro nombramos la action que va a realizar el action(en este caso changeName)
    changeName: (state, action) => {
      const userName = action.payload;//el user esta en action.payload
      return userName;//retorna lo que hay en el input //tambien puedo retornar action.payload
    }
  }
});

 export const { changeName } = nameSlice.actions; //2do exportamos

export default nameSlice.reducer;
