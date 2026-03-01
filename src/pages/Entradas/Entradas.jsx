import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Entradas.css";

function Entradas() {

    const navigate = useNavigate();
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const toggleInfo = () => {
        setIsInfoOpen(!isInfoOpen);
    };

    const [cantidades, setCantidades] = useState({
        1: 0,
        2: 0,
        3: 0
    });

    const handleCantidad = (id, value) => {
        setCantidades({
            ...cantidades,
            [id]: value
        });
    };

    const entradas = [
        {
            id: 1,
            nombre: "ABONO GENERAL",
            precio: "72,50€",
            descripcion: "Acceso a todos los escenarios durante los 3 días del festival.",
            etiqueta: "MÁS VENDIDO",
            tipoEtiqueta: "popular",
            estado: "disponible",
            img: "/imgsTickets/ticketNormal.jpg"
        },
        {
            id: 2,
            nombre: "ABONO VIP",
            precio: "155€",
            descripcion: "Zona VIP exclusiva, acceso prioritario y barra privada.",
            etiqueta: "MUY LIMITADO",
            tipoEtiqueta: "limitado",
            estado: "disponible",
            img: "/imgsTickets/ticketVIP.jpg"
        },
        {
            id: 3,
            nombre: "DREAM VIP",
            precio: "300€",
            descripcion: "Experiencia premium completa, backstage y catering exclusivo.",
            etiqueta: "NOVEDAD",
            tipoEtiqueta: "nuevo",
            estado: "agotado",
            img: "/imgsTickets/ticketDreamVIP.jpg"
        }
    ];

    return (
        <div className="entradas-page">

            {/* ================= HEADER ================= */}
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

                    <span className="nav-item">
                        Servicios
                    </span>

                    <div className="nav-dropdown">
                        <span className="nav-item" onClick={toggleInfo}>
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

            {/* ================= HERO CON IMG REAL ================= */}
            <section className="entradas-hero">

                <img
                    src="/imgEntradas.jpg"
                    alt="Subsonic Festival"
                    className="hero-image"
                />

                <div className="hero-text">
                    <h1>ENTRADAS SUBSONIC 2026</h1>
                    <p>Disfruta del mejor festival del año con experiencias únicas.</p>
                </div>

            </section>

            {/* ================= TICKETS ================= */}
            <section className="tickets-section">
                <h2 className="tickets-title">Elige tu experiencia</h2>

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
                                <p className="ticket-desc">{entrada.descripcion}</p>
                                <p className="ticket-price">DESDE {entrada.precio}</p>

                                {entrada.estado !== "agotado" && (
                                    <select
                                        className="ticket-select"
                                        value={cantidades[entrada.id]}
                                        onChange={(e) =>
                                            handleCantidad(entrada.id, e.target.value)
                                        }
                                    >
                                        <option value="0">0 entradas</option>
                                        <option value="1">1 entrada</option>
                                        <option value="2">2 entradas</option>
                                        <option value="3">3 entradas</option>
                                        <option value="4">4 entradas</option>
                                    </select>
                                )}

                                {entrada.estado === "agotado" && (
                                    <button className="ticket-btn sold">
                                        Sold out
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="buy-global-btn">
                    Comprar Entradas Seleccionadas
                </button>

            </section>

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

export default Entradas;