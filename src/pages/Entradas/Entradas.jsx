import React, { useState, useEffect } from "react";
import "./Entradas.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getEntradas } from "../../services/api";

function Entradas() {
    /* Esto crea un estado en React para guardar las entradas */
    const [entradas, setEntradas] = useState([]);

    const [cantidades, setCantidades] = useState({
        1: 0,
        2: 0,
        3: 0
    });
    /* Esto cuando cargar la pagina llama a getEntradas(), recibe los datos y los guarda en el estado */
    useEffect(() => {
        getEntradas().then(data => {
            setEntradas(data);
        });
    }, []);

    /* Esto es una funcion que actualiza el numero de entradas seleccionadas para cada tipo de ticket*/
    const handleCantidad = (id, value) => {
        setCantidades({
            ...cantidades,
            [id]: value
        });
    };


    return (
        <div className="entradas-page">

            {/* ================= HEADER ================= */}
             <Header />

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

            <Footer />

        </div>
    );
}

export default Entradas;