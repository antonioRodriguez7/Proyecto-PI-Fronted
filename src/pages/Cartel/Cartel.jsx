import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "./Cartel.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getArtistas } from "../../services/api";

function Cartel() {
    const [search, setSearch] = useState("");
    const [artistas, setArtistas] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArtistas().then(data => {
            // Nos aseguramos de que data sea un array para evitar errores de .filter
            setArtistas(Array.isArray(data) ? data : []);
            setIsLoading(false);
        }).catch(err => {
            console.error("Error al cargar artistas:", err);
            setError("Error al cargar los artistas.");
            setArtistas([]);
            setIsLoading(false);
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
                    {isLoading ? (
                        <p className="loading-text" style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#ccc' }}>Cargando cartelería...</p>
                    ) : error ? (
                        <p className="error-text" style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#ff4d4d' }}>{error}</p>
                    ) : artistasFiltrados.length > 0 ? (
                        artistasFiltrados.map((artista) => (
                            <div className="artist-card" key={artista.id}>
                                <div className="artist-img-wrapper">
                                    <img src={artista.imageUrl || artista.img} alt={artista.name || artista.nombre} />
                                </div>

                                <div className="artist-content">
                                    <h3>{artista.name || artista.nombre}</h3>
                                    <p>{artista.performanceDate || artista.dia}</p>

                                    <div className="artist-socials">
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
                        <p className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No se encontró ningún artista</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Cartel;