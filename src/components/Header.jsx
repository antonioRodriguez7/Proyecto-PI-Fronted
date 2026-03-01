import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = (e) => {
    e.preventDefault();
    setIsInfoOpen((v) => !v);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logoPI.png" alt="Logo Subsonic" />
      </div>

      <nav>
        <span className="nav-item" onClick={() => navigate("/entradas")}>
          Entradas
        </span>

        <span className="nav-item" onClick={() => navigate("/cartel")}>
          Cartel
        </span>

        <span className="nav-item" onClick={() => navigate("/servicios")}>
          Servicios
        </span>

        <div className="nav-dropdown">
          <span className="nav-item" onClick={toggleInfo}>
            Info {isInfoOpen ? "▴" : "▾"}
          </span>

          {isInfoOpen && (
            <div className="dropdown-menu">
              <span
                className="dropdown-item"
                onClick={() => {
                  setIsInfoOpen(false);
                  navigate("/politica");
                }}
              >
                Política y Privacidad
              </span>

              <span
                className="dropdown-item"
                onClick={() => {
                  setIsInfoOpen(false);
                  navigate("/faq");
                }}
              >
                Preguntas Frecuentes
              </span>
            </div>
          )}
        </div>
      </nav>

      <button className="login-btn" onClick={() => navigate("/login")}>
        Acceder / Registro
      </button>
    </header>
  );
}

export default Header;