import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Perfil from "./pages/Perfil/Perfil";
import Perfil_Admin from "./pages/Perfil_Admin/Perfil_Admin";
import Perfil_Proveedor from "./pages/Perfil_Proveedor/Perfil_Proveedor";
import Cartel from "./pages/Cartel/Cartel";
import Entradas from "./pages/Entradas/Entradas";
import Servicios from "./pages/Servicios/Servicios";
import Proveedores from "./pages/Proveedores/Proveedores";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfil-admin" element={<Perfil_Admin />} />
      <Route path="/perfil-proveedor" element={<Perfil_Proveedor />} />
        <Route path="/cartel" element={<Cartel />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </>
  );
}

export default App;