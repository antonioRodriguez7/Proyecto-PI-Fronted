import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getEntradas } from "../../services/api";
function Home() {

    const navigate = useNavigate();

    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isEntradasOpen, setIsEntradasOpen] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState('Todos');

const [timeLeft, setTimeLeft] = useState({});

useEffect(() => {
    const festivalDate = new Date("July 17, 2026 18:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const difference = festivalDate - now;

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        }
    }, 1000);

    return () => clearInterval(timer);
}, []);

    const toggleInfo = (e) => {
        e.preventDefault();
        setIsInfoOpen(!isInfoOpen);
    };

    const toggleEntradas = (e) => {
        e.preventDefault();
        setIsEntradasOpen(!isEntradasOpen);
    };

    const [entradas, setEntradas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const data = await getEntradas();
                setEntradas(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error al cargar entradas en Home:", err);
                setError("No se pudieron cargar las entradas.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEntradas();
    }, []);

    return (
        <div className="app-container">

           <Header />

            <main>

                <section className="hero-section">
                <video
                    className="hero-video"
                    src="/videos/videoPrincipal.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />

                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1>SUBSONIC FESTIVAL 2026</h1>
                    <p className="hero-subtitle">
                        El mayor evento de música urbana y electrónica del mundo
                    </p>
                </div>

            </section>

                {/* ================= ENTRADAS ================= */}
                <section className="tickets-section">
                    <h2 className="tickets-title">Entradas 2026</h2>

                    <div className="tickets-grid">
                        {isLoading ? (
                            <p className="loading-text" style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#ccc' }}>Cargando entradas...</p>
                        ) : error ? (
                            <p className="error-text" style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem', color: '#ff4d4d' }}>{error}</p>
                        ) : entradas.length > 0 ? (
                            entradas.map((entrada) => (
                                <div className="ticket-card" key={entrada.id}>

                                    <div className={`ticket-badge ${entrada.tipoEtiqueta}`}>
                                        {entrada.etiqueta}
                                    </div>

                                    <div className="ticket-image-wrapper">
                                        <img src={entrada.img} alt={entrada.nombre} />
                                    </div>

                                    <div className="ticket-content">
                                        <h3>{entrada.nombre}</h3>

                                        <p className="ticket-price">
                                            DESDE {entrada.precio}
                                        </p>

                                        <button
                                            className={`ticket-btn ${entrada.estado === "agotado" ? "sold" : ""}`}
                                            disabled={entrada.estado === "agotado"}
                                        >
                                            {entrada.estado === "agotado"
                                                ? "Sold out"
                                                : "Comprar"}
                                        </button>

                                        <p className="ticket-small">
                                            *Hasta fin de existencias. Gastos incluidos.
                                        </p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No hay entradas disponibles</p>
                        )}
                    </div>
                </section>  
                
                <section className="experience-section">

                    <h2 className="experience-title">Vive la Experiencia Subsonic</h2>

                    <div className="experience-grid">

                        <div className="experience-card">
                            <div className="experience-icon">🎧</div>
                            <h3>48 Artistas Internacionales</h3>
                            <p>Lo mejor de la música urbana y electrónica en 3 escenarios.</p>
                        </div>

                        <div className="experience-card">
                            <div className="experience-icon">🎡</div>
                            <h3>3 Escenarios Inmersivos</h3>
                            <p>Producción audiovisual de última generación.</p>
                        </div>

                        <div className="experience-card">
                            <div className="experience-icon">🍔</div>
                            <h3>Zona Food & Drinks</h3>
                            <p>Foodtrucks y barras premium con experiencias gastronómicas.</p>
                        </div>

                        <div className="experience-card">
                            <div className="experience-icon">🛍️</div>
                            <h3>Merchandising Oficial</h3>
                            <p>Camisetas, sudaderas y edición limitada exclusiva del festival.</p>
                        </div>

                    </div>

                </section>
                <section className="aftermovie-section">

                    <video
                        className="aftermovie-video"
                        src="/videos/videoSecundarioHome.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    <div className="aftermovie-overlay"></div>

                    <div className="aftermovie-content">
                        <h2>La cuenta atrás ha comenzado</h2>

                        <div className="countdown-container">
                            <div className="countdown-item">
                                <span>{timeLeft.days || 0}</span>
                                <p>Días</p>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.hours || 0}</span>
                                <p>Horas</p>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.minutes || 0}</span>
                                <p>Min</p>
                            </div>
                            <div className="countdown-item">
                                <span>{timeLeft.seconds || 0}</span>
                                <p>Seg</p>
                            </div>
                        </div>
                    </div>

                </section>
            </main>

            {/* ================= PATROCINADORES ================= */}
            <section className="sponsors-section">

                <h2 className="sponsors-main-title">Patrocinadores</h2>

                {/* Partner principal */}
                <div className="sponsor-category">
                    <h3>Partner Energético</h3>
                    <div className="sponsor-row single">
                        <img src="/sponsors/repsol.png" alt="Repsol" />
                    </div>
                </div>

                {/* Partners */}
                <div className="sponsor-category">
                    <h3>Partners</h3>
                    <div className="sponsor-row">
                        <img src="/sponsors/heineken.svg" alt="Heineken" />
                        <img src="/sponsors/cocacola.png" alt="CocaCola" />
                        <img src="/sponsors/redBull.svg" alt="RedBull" />
                        <img src="/sponsors/druni.png" alt="Druni" />
                        <img src="/sponsors/ruffles.png" alt="Vichy" />
                    </div>
                </div>

            </section>
             {/* FOOTER */}
           <Footer />
        </div>
    );
}

export default Home;