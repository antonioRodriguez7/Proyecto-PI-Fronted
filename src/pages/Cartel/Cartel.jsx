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
            // Nos aseguramos de que data sea un array para evitar errores de .filter
            setArtistas(Array.isArray(data) ? data : []);
        }).catch(err => {
            console.error("Error al cargar artistas:", err);
            setArtistas([]);
        });
    }, []);

    // artista.name (Java) o artista.nombre (Fake)
    const artistasFiltrados = artistas.filter((artista) => {
        const nombre = artista.name || artista.nombre || "";
        return nombre.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="cartel-page">
            <Header />

            <section className="cartel-image-section">
                <img src="/cartel.jpg" alt="Cartel Oficial 2026" className="cartel-image" />
            </section>

            <section className="artist-search-section">
                <input
                    type="text"
                    placeholder="Buscar artista..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="artist-search"
                />
            </section>

            <section className="artists-section">
                <div className="artists-grid">
                    {artistasFiltrados.length > 0 ? (
                        artistasFiltrados.map((artista) => (
                            <div className="artist-card" key={artista.id}>
                                <div className="artist-img-wrapper">
                                    {/* CORRECCIÓN: imageUrl (Java) o img (Fake) */}
                                    <img src={artista.imageUrl || artista.img} alt={artista.name || artista.nombre} />
                                </div>

                                <div className="artist-content">
                                    {/* CORRECCIÓN: name (Java) o nombre (Fake) */}
                                    <h3>{artista.name || artista.nombre}</h3>

                                    {/* CORRECCIÓN: performanceDate (Java) o dia (Fake) */}
                                    <p>{artista.performanceDate || artista.dia}</p>

                                    <div className="artist-socials">
                                        {/* CORRECCIÓN: spotifyUrl (Java) o spoty (Fake) */}
                                        {(artista.spotifyUrl || artista.spoty) && (
                                            <a
                                                href={artista.spotifyUrl || artista.spoty}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaSpotify className="spotify-icon" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No se encontró ningún artista</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Cartel;