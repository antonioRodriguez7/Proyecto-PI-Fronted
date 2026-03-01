import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
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
    const artistas = [
        { id: 1, nombre: 'Bad Gyal', fecha: '17 Julio 2026', genero: 'Urbano', dia: 'Viernes' },
        { id: 2, nombre: 'Quevedo', fecha: '18 Julio 2026', genero: 'Urbano', dia: 'Sábado' },
        { id: 3, nombre: 'Bizarrap', fecha: '19 Julio 2026', genero: 'Electrónica', dia: 'Viernes' },
        { id: 4, nombre: 'Rosalía', fecha: '20 Julio 2026', genero: 'Urbano', dia: 'Sábado' },
        { id: 5, nombre: 'Amelie Lens', fecha: '17 Julio 2026', genero: 'Electrónica', dia: 'Viernes' },
    ];

    const artistasFiltrados = artistas.filter(artista => {
        if (filtroActivo === 'Todos') return true;
        return artista.dia === filtroActivo || artista.genero === filtroActivo;
    });

    const toggleInfo = (e) => {
        e.preventDefault();
        setIsInfoOpen(!isInfoOpen);
    };

    const toggleEntradas = (e) => {
        e.preventDefault();
        setIsEntradasOpen(!isEntradasOpen);
    };

    // 🔥 AQUÍ ESTÁ CORREGIDO
    const entradas = [
        {
            id: 1,
            nombre: "ABONO GENERAL",
            precio: "72,50€",
            etiqueta: "MÁS VENDIDO",
            tipoEtiqueta: "popular",
            estado: "disponible",
            img: "/imgsTickets/ticketNormal.jpg"
        },
        {
            id: 2,
            nombre: "ABONO VIP",
            precio: "155€",
            etiqueta: "MUY LIMITADO",
            tipoEtiqueta: "limitado",
            estado: "disponible",
            img: "/imgsTickets/ticketVIP.jpg"
        },
        {
            id: 3,
            nombre: "DREAM VIP",
            precio: "300€",
            etiqueta: "NOVEDAD",
            tipoEtiqueta: "nuevo",
            estado: "agotado",
            img: "/imgsTickets/ticketDreamVIP.jpg"
        }
    ];

    return (
        <div className="app-container">

            <header className="header">
                <div className="logo" onClick={() => navigate("/")}>
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>

                <nav>

                    {/* ENTRADAS */}
                    <div className="nav-dropdown">
                        {/* ENTRADAS */}
                    <span
                        className="nav-item"
                        onClick={() => navigate("/entradas")}
                    >
                        Entradas
                    </span>
                    </div>

                    {/* CARTEL */}
                    <span
                        className="nav-item"
                        onClick={() => navigate("/cartel")}
                    >
                        Cartel
                    </span>

                    {/* SERVICIOS */}
                    <span
                        className="nav-item"
                        onClick={() => navigate("/servicios")}
                    >
                        Servicios
                    </span>

                    {/* INFO */}
                    <div className="nav-dropdown">
                        <span
                            className="nav-item"
                            onClick={toggleInfo}
                        >
                            Info {isInfoOpen ? '▴' : '▾'}
                        </span>

                        {isInfoOpen && (
                            <div className="dropdown-menu">
                                <span className="dropdown-item">Política y Privacidad</span>
                                <span className="dropdown-item">Preguntas Frecuentes</span>
                            </div>
                        )}
                    </div>

                </nav>

                <button
                    className="login-btn"
                    onClick={() => navigate('/login')}
                >
                    Acceder / Registro
                </button>
            </header>

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
                        {entradas.map((entrada) => (
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
                        ))}
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
            <footer className="footer">
                <div className="footer-left">
                    <a href="#ig" className="circle-icon">IG</a>
                    <a href="#tw" className="circle-icon">TW</a>
                    <a href="#fb" className="circle-icon">FB</a>
                </div>

                <div className="footer-center">
                    <a href="#proveedores" className="proveedores-link" onClick={(e) => {
                        e.preventDefault();
                        navigate('/proveedores');
                    }}>
                        ¿Quieres ser proveedor?
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

export default Home;