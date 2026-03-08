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

    const handleCantidad = (id, value) => {
        setCantidades({
            ...cantidades,
            [id]: Number(value)
        });
    };

    // Calculo total de entradas y precio total
    const totalEntradas = Object.values(cantidades).reduce((acc, v) => acc + Number(v), 0);

    const precioTotal = entradas.reduce((acc, entrada) => {
        const cant = Number(cantidades[entrada.id] || 0);
        if (cant === 0) return acc;

        const numStr = entrada.precio.replace(/[^0-9,.]/g, '').replace(',', '.');
        return acc + (parseFloat(numStr) || 0) * cant;
    }, 0);


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

                {/* BARRA RESUMEN COMPRA */}
                <div className="pedido-bar">
                    <div className="pedido-resumen">
                        <h3 className="pedido-resumen-title">Tu pedido</h3>

                        {totalEntradas === 0 ? (
                            <p className="pedido-resumen-vacio">No hay entradas seleccionadas</p>
                        ) : (
                            <>
                                <ul className="pedido-resumen-lista">
                                    {entradas
                                        .filter(e => Number(cantidades[e.id]) > 0)
                                        .map(e => {
                                            const cant = Number(cantidades[e.id]);
                                            const numStr = e.precio.replace(/[^0-9,.]/g, '').replace(',', '.');
                                            const subtotal = (parseFloat(numStr) || 0) * cant;
                                            return (
                                                <li key={e.id} className="pedido-resumen-item">
                                                    <span className="pedido-resumen-nombre">{e.nombre}</span>
                                                    <span className="pedido-resumen-detalle">
                                                        {cant} × {e.precio} =
                                                        <strong> {subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</strong>
                                                    </span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                <div className="pedido-resumen-total">
                                    <span>{totalEntradas} entrada{totalEntradas !== 1 ? 's' : ''}</span>
                                    <span className="pedido-resumen-precio-total">
                                        {precioTotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        className="buy-global-btn"
                        disabled={totalEntradas === 0}
                        style={totalEntradas === 0 ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                    >
                        Comprar Entradas Seleccionadas
                    </button>
                </div>

            </section>

            <Footer />

        </div>
    );
}

export default Entradas;