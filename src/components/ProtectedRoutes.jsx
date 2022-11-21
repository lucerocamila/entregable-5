import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

  //accedo a name con use selector
  const userName = useSelector((state) => state.name);

  // Aquí va la condición. Puede ser una condición de cualquier tipo. Lo que
  // Importa es que valide si el usuario está loggeado o no
  if (true) { //si user name es true
    return <Outlet />;//oulet es el que abre las rutas protegidas
  } else {
    return <Navigate to="/" />; //si no a la ruta publica
  } // Aquí le debemos decir la ruta a la que queremos llevar
}; // al usuario si no está autenticado

export default ProtectedRoutes;
