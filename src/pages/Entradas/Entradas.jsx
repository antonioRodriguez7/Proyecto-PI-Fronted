import React, { useState, useEffect } from "react";
import "./Entradas.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getEntradas } from "../../services/api";

function Entradas() {
    const [entradas, setEntradas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cantidades, setCantidades] = useState({
        1: 0,
        2: 0,
        3: 0
    });

    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                const data = await getEntradas();
                setEntradas(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error al cargar entradas:", err);
                setError("Error al cargar las entradas.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEntradas();
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

        let precioValor = 0;
        if (typeof entrada.precio === 'number') {
            precioValor = entrada.precio;
        } else if (typeof entrada.precio === 'string') {
            precioValor = parseFloat(entrada.precio.replace(/[^0-9,.]/g, '').replace(',', '.'));
        }
        return acc + (precioValor || 0) * cant;
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
                                    <p className="ticket-desc">{entrada.descripcion}</p>
                                    <p className="ticket-price">
                                        DESDE {typeof entrada.precio === 'number' ? `${entrada.precio.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€` : entrada.precio}
                                    </p>

                                    {entrada.estado !== "agotado" && (
                                        <select
                                            className="ticket-select"
                                            value={cantidades[entrada.id] || 0}
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
                        ))
                    ) : (
                        <p className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No hay entradas disponibles</p>
                    )}
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
                                            
                                            let precioValor = 0;
                                            if (typeof e.precio === 'number') {
                                                precioValor = e.precio;
                                            } else if (typeof e.precio === 'string') {
                                                precioValor = parseFloat(e.precio.replace(/[^0-9,.]/g, '').replace(',', '.'));
                                            }
                                            
                                            const subtotal = (precioValor || 0) * cant;
                                            return (
                                                <li key={e.id} className="pedido-resumen-item">
                                                    <span className="pedido-resumen-nombre">{e.nombre}</span>
                                                    <span className="pedido-resumen-detalle">
                                                        {cant} × {typeof e.precio === 'number' ? `${e.precio}€` : e.precio} =
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