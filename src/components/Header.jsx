import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const goTo = (path) => {
    setOpenMenu(null);
    setMobileOpen(false);
    navigate(path);
  };

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="subsonic-header-wrap" ref={dropdownRef}>
      <div className="subsonic-header">
        <div className="subsonic-brand" onClick={() => goTo("/")}>
          SUBSONIC
        </div>

        <nav className="subsonic-nav">
          <button
            type="button"
            className="subsonic-pill-btn"
            onClick={() => goTo("/entradas")}
          >
            Entradas
          </button>

          <div className="subsonic-dropdown">
            <button
              type="button"
              className="subsonic-nav-link"
              onClick={() => toggleMenu("cartel")}
            >
              CARTEL <span>▾</span>
            </button>

            {openMenu === "cartel" && (
              <div className="subsonic-dropdown-menu">
                <button type="button" onClick={() => goTo("/cartel")}>
                  Ver cartel
                </button>
                <button type="button" onClick={() => goTo("/cartel")}>
                  Artistas
                </button>
              </div>
            )}
          </div>

          <div className="subsonic-dropdown">
            <button
              type="button"
              className="subsonic-nav-link"
              onClick={() => toggleMenu("servicios")}
            >
              SERVICIOS <span>▾</span>
            </button>

            {openMenu === "servicios" && (
              <div className="subsonic-dropdown-menu">
                <button type="button" onClick={() => goTo("/servicios")}>
                  Restauración
                </button>
                <button type="button" onClick={() => goTo("/servicios")}>
                  Merchandising
                </button>
                <button type="button" onClick={() => goTo("/servicios")}>
                  Zonas VIP
                </button>
              </div>
            )}
          </div>

          <div className="subsonic-dropdown">
            <button
              type="button"
              className="subsonic-nav-link"
              onClick={() => toggleMenu("info")}
            >
              INFO <span>▾</span>
            </button>

            {openMenu === "info" && (
              <div className="subsonic-dropdown-menu">
                <button type="button" onClick={() => goTo("/faq")}>
                  Preguntas frecuentes
                </button>
                <button type="button" onClick={() => goTo("/politica")}>
                  Política y privacidad
                </button>
              </div>
            )}
          </div>
        </nav>

        <button
          type="button"
          className="subsonic-burger"
          aria-label="Abrir menú"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="subsonic-mobile-menu">
          <button type="button" onClick={() => goTo("/login")}>
            Acceder / Registro
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;