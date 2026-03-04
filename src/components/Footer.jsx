import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="#ig" className="circle-icon">IG</a>
        <a href="#tw" className="circle-icon">TW</a>
        <a href="#fb" className="circle-icon">FB</a>
      </div>

      <div className="footer-center">
        <a
          href="#proveedores"
          className="proveedores-link"
          onClick={(e) => {
            e.preventDefault();
            navigate("/proveedores");
          }}
        >
          ¿Quieres ser proveedor?
        </a>
      </div>

      <div className="footer-right">
        <div className="spotify-placeholder">
          Música, API SPOTIFY
        </div>
      </div>
    </footer>
  );
}

export default Footer;