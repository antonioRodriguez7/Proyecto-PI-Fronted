import React, { useState, useEffect } from "react";
import "./Entradas.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getEntradas } from "../../services/api";

function Entradas() {
    const [entradas, setEntradas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidades, setCantidades] = useState({});

    useEffect(() => {
        const fetchEntradas = async () => {
            setIsLoading(true);
            try {
                const data = await getEntradas();
                console.log("DATOS RECIBIDOS DEL BACKEND:", data);

                // Nos aseguramos de que 'entradas' siempre sea un array
                const dataArray = Array.isArray(data) ? data : (data?.content || []);
                setEntradas(dataArray);
            } catch (err) {
                console.error("Error al cargar entradas:", err);
                setError("No se pudieron cargar las entradas. Comprueba que el backend esté en el puerto 8080.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEntradas();
    }, []);

    const handleCantidad = (id, value) => {
        setCantidades(prev => ({
            ...prev,
            [id]: Number(value)
        }));
    };

    // Cálculos de totales
    const totalEntradas = Object.values(cantidades).reduce((acc, v) => acc + v, 0);
    const precioTotal = entradas.reduce((acc, e) => {
        const cant = cantidades[e.id] || 0;
        return acc + (Number(e.price) || 0) * cant;
    }, 0);

    return (
        <div className="entradas-page">
            <Header />

            {/* HERO SECTION */}
            <section className="entradas-hero">
                <img src="/imgEntradas.jpg" alt="Subsonic Festival" className="hero-image" />
                <div className="hero-text">
                    <h1>ENTRADAS SUBSONIC 2026</h1>
                    <p>Elige tu experiencia para el festival más esperado.</p>
                </div>
            </section>

            <section className="tickets-section">
                <h2 className="tickets-title">Entradas Disponibles</h2>

                <div className="tickets-grid">
                    {isLoading ? (
                        <div className="loading-container">
                            <p>Cargando tickets...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p>{error}</p>
                        </div>
                    ) : entradas.length > 0 ? (
                        entradas.map((entrada) => (
                            <div className="ticket-card" key={entrada.id || Math.random()}>
                                {/* Etiqueta (feature) */}
                                <div className="ticket-badge">
                                    {entrada.feature || "General"}
                                </div>

                                {/* Imagen */}
                                <div className="ticket-image-wrapper">
                                    <img
                                        src={entrada.imageUrl || "https://via.placeholder.com/300"}
                                        alt={entrada.category || "Entrada"}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/400x250?text=Subsonic+2026"}
                                    />
                                </div>

                                <div className="ticket-content">
                                    {/* Categoría */}
                                    <h3>{entrada.category || "Ticket"}</h3>

                                    {/* Descripción */}
                                    <p className="ticket-desc">
                                        {entrada.description || "Sin descripción disponible."}
                                    </p>

                                    {/* Precio */}
                                    <p className="ticket-price">
                                        DESDE {(Number(entrada.price) || 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                                    </p>

                                    {/* Selector de cantidad (Solo si hay stock o no es 0) */}
                                    {(entrada.stock === null || entrada.stock > 0) ? (
                                        <div className="ticket-action">
                                            <select
                                                className="ticket-select"
                                                value={cantidades[entrada.id] || 0}
                                                onChange={(e) => handleCantidad(entrada.id, e.target.value)}
                                            >
                                                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                                                    <option key={num} value={num}>
                                                        {num} {num === 1 ? 'entrada' : 'entradas'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <button className="ticket-btn sold" disabled>AGOTADO</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No hay entradas publicadas en el cartel todavía.</p>
                        </div>
                    )}
                </div>

                {/* BARRA DE PEDIDO (Solo visible si hay entradas) */}
                {entradas.length > 0 && (
                    <div className="pedido-bar">
                        <div className="pedido-resumen">
                            <h3 className="pedido-resumen-title">Tu pedido</h3>
                            {totalEntradas === 0 ? (
                                <p className="pedido-resumen-vacio">Selecciona tus entradas</p>
                            ) : (
                                <>
                                    <ul className="pedido-resumen-lista">
                                        {entradas
                                            .filter(e => cantidades[e.id] > 0)
                                            .map(e => (
                                                <li key={e.id} className="pedido-resumen-item">
                                                    <span>{e.category}</span>
                                                    <span>
                                                        {cantidades[e.id]} x {e.price}€ =
                                                        <strong> {(cantidades[e.id] * e.price).toFixed(2)}€</strong>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="pedido-resumen-total">
                                        <span>Total</span>
                                        <span className="precio-total-numero">
                                            {precioTotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            className="buy-global-btn"
                            disabled={totalEntradas === 0}
                            onClick={() => alert("Redirigiendo a pasarela de pago...")}
                        >
                            Comprar ahora ({totalEntradas})
                        </button>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default Entradas;