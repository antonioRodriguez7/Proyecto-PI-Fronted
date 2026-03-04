import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "./Cartel.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getArtistas } from "../../services/api";

function Cartel() {

    const [search, setSearch] = useState("");

    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        getArtistas().then(data => {
            setArtistas(data);
        });
    }, []);

    const artistasFiltrados = artistas.filter((artista) =>
        artista.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="cartel-page">

            <Header />

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
                                        <FaSpotify className="spotify-icon" />
                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <p className="no-results">
                            No se encontró ningún artista
                        </p>

                    )}

                </div>
            </section>

            <Footer />

        </div>
    );
}

export default Cartel;