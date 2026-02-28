import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cartel.css";

function Cartel() {

    const navigate = useNavigate();

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isEntradasOpen, setIsEntradasOpen] = useState(false);
    const [search, setSearch] = useState("");

    const toggleInfo = (e) => {
        e.preventDefault();
        setIsInfoOpen(!isInfoOpen);
    };

    const toggleEntradas = (e) => {
        e.preventDefault();
        setIsEntradasOpen(!isEntradasOpen);
    };

    const artistas = [
        { id: 1, nombre: "Bad Bunny", dia: "Viernes 17 Julio", img: "/artists/badbunny.avif" },
        { id: 2, nombre: "Rosalía", dia: "Viernes 17 Julio", img: "/artists/rosalia.jpg" },
        { id: 3, nombre: "Martín Garrix", dia: "Viernes 17 Julio", img: "/artists/martingarrix.jpg" },
        { id: 4, nombre: "David Guetta", dia: "Sábado 18 Julio", img: "/artists/davidguetta.jpeg" },
        { id: 5, nombre: "Karol G", dia: "Sábado 18 Julio", img: "/artists/karolg.jpg" },
        { id: 6, nombre: "Feid", dia: "Sábado 18 Julio", img: "/artists/feid.webp" },
        { id: 7, nombre: "J Balvin", dia: "Domingo 19 Julio", img: "/artists/jbalvin.jpg" },
        { id: 8, nombre: "Rauw Alejandro", dia: "Domingo 19 Julio", img: "/artists/rauw.webp" },
        { id: 9, nombre: "Amelie Lens", dia: "Domingo 19 Julio", img: "/artists/amelielens.webp" }
    ];

    const artistasFiltrados = artistas.filter((artista) =>
        artista.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="cartel-page">

            <header className="header">
                <div className="logo" onClick={() => navigate("/")}>
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>

                <nav>
                    <div className="nav-dropdown">
                        <span className="nav-item" onClick={toggleEntradas}>
                            Entradas {isEntradasOpen ? '▴' : '▾'}
                        </span>
                    </div>

                    <span className="nav-item" onClick={() => navigate("/cartel")}>
                        Cartel
                    </span>

                    <span className="nav-item">
                        Servicios
                    </span>

                    <div className="nav-dropdown">
                        <span className="nav-item" onClick={toggleInfo}>
                            Info {isInfoOpen ? '▴' : '▾'}
                        </span>
                    </div>
                </nav>

                <button
                    className="login-btn"
                    onClick={() => navigate('/login')}
                >
                    Acceder / Registro
                </button>
            </header>

            {/* IMAGEN DEL CARTEL */}
            <section className="cartel-image-section">
                <img
                    src="/cartel.jpg"
                    alt="Cartel Oficial 2026"
                    className="cartel-image"
                />
            </section>

            {/* BUSCADOR */}
            <section className="artist-search-section">
                <input
                    type="text"
                    placeholder="Buscar artista..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="artist-search"
                />
            </section>

            {/* GRID ARTISTAS */}
            <section className="artists-section">
                <div className="artists-grid">
                    {artistasFiltrados.length > 0 ? (
                        artistasFiltrados.map((artista) => (
                            <div className="artist-card" key={artista.id}>

                                <div className="artist-img-wrapper">
                                    <img src={artista.img} alt={artista.nombre} />
                                </div>

                                <div className="artist-content">
                                    <h3>{artista.nombre}</h3>
                                    <p>{artista.dia}</p>

                                    <div className="artist-socials">
                                        <span>🎵</span>
                                        <span>📸</span>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="no-results">No se encontró ningún artista</p>
                    )}

                </div>
            </section>

             {/* FOOTER */}
            <footer className="footer">
                <div className="footer-left">
                    <a href="#ig" className="circle-icon">IG</a>
                    <a href="#tw" className="circle-icon">TW</a>
                    <a href="#fb" className="circle-icon">FB</a>
                </div>

                <div className="footer-center">
                    <a href="#proveedores" className="proveedores-link">
                        Acceso Proveedores
                    </a>
                </div>

                <div className="footer-right">
                    <div className="spotify-placeholder">
                        Música, API SPOTIFY
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Cartel;