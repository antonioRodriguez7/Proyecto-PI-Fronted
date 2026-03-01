import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Perfil from "./pages/Perfil/Perfil";
import Admin from "./pages/Admin/Admin";
import Cartel from "./pages/Cartel/Cartel";
import Entradas from "./pages/Entradas/Entradas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cartel" element={<Cartel />} />
      <Route path="/entradas" element={<Entradas />} />
    </Routes>
  );
}

export default App;