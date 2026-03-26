import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil_Admin.css';
import Footer from "../../components/Footer";
import {
    getEspacios,
    getEntradas,
    getArtistas,
    createArtist,
    deleteArtist,
    createTicket,
    deleteTicket
} from "../../services/api";

function Perfil_Admin() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('ARTISTAS');
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [filtros, setFiltros] = useState({ zona: [], tamano: [], precio: [] });
    const [searchQuery, setSearchQuery] = useState('');

    // Estados de datos
    const [espacios, setEspacios] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [entradas, setEntradas] = useState([]);

    // Estados de nuevos elementos
    const [nuevoArtista, setNuevoArtista] = useState({
        nombre: '', diaSemana: '', diaMes: '', mes: '', spotifyUrl: '', imagenUrl: ''
    });

    const [nuevaEntrada, setNuevaEntrada] = useState({
        categoria: '', descripcion: '', precio: '', caracteristica: '', imagenUrl: ''
    });

    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // Para alertas

    // ---------------- CARGAR DATOS DEL BACKEND ----------------
    const loadAllData = async () => {
        setLoadingAdmin(true);
        try {
            const [espaciosData, entradasData, artistasData] = await Promise.all([
                getEspacios(),
                getEntradas(),
                getArtistas()
            ]);

            setEspacios(Array.isArray(espaciosData) ? espaciosData : []);

            setEntradas(Array.isArray(entradasData) ? entradasData.map(e => ({
                id: e.id,
                categoria: e.nombre || e.categoria || '',
                descripcion: e.descripcion || '',
                precio: e.precio || '',
                caracteristica: e.etiqueta || e.caracteristica || '',
                imagen: e.img || e.imagen || null
            })) : []);

            setArtistas(Array.isArray(artistasData) ? artistasData.map(a => {
                const partes = (a.dia || '').split(' ');
                return {
                    id: a.id,
                    nombre: a.nombre || '',
                    diaSemana: partes[0] || '',
                    diaMes: partes[1] || '',
                    mes: partes[2] || '',
                    spotifyUrl: a.spoty || a.spotifyUrl || '',
                    imagen: a.img || a.imagen || null
                };
            }) : []);
        } catch (error) {
            console.error("Error cargando panel:", error);
        } finally {
            setLoadingAdmin(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const mostrarMensaje = (texto, tipo) => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
    };

    // ---------------- LÓGICA ARTISTAS (API) ----------------
    const handleAddArtista = async () => {
        if (!nuevoArtista.nombre) return;
        try {
            const artistDTO = {
                nombre: nuevoArtista.nombre,
                dia: `${nuevoArtista.diaSemana} ${nuevoArtista.diaMes} ${nuevoArtista.mes}`,
                spoty: nuevoArtista.spotifyUrl,
                img: nuevoArtista.imagenUrl || "https://via.placeholder.com/300"
            };
            await createArtist(artistDTO);
            mostrarMensaje("Artista creado correctamente", "success");
            loadAllData(); // Recargar lista
            setNuevoArtista({ nombre: '', diaSemana: '', diaMes: '', mes: '', spotifyUrl: '', imagenUrl: '' });
        } catch (error) {
            mostrarMensaje("Error al crear artista", "error");
        }
    };

    const handleDeleteArtista = async (id) => {
        if (!window.confirm("¿Eliminar este artista?")) return;
        try {
            await deleteArtist(id);
            setArtistas(prev => prev.filter(a => a.id !== id));
            mostrarMensaje("Artista eliminado", "success");
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    };

    // ---------------- LÓGICA ENTRADAS (API) ----------------
    const handleAddEntrada = async () => {
        if (!nuevaEntrada.categoria || !nuevaEntrada.precio) return;
        try {
            const ticketDTO = {
                nombre: nuevaEntrada.categoria,
                descripcion: nuevaEntrada.descripcion,
                precio: nuevaEntrada.precio,
                etiqueta: nuevaEntrada.caracteristica,
                img: nuevaEntrada.imagenUrl || "https://via.placeholder.com/300"
            };
            await createTicket(ticketDTO);
            mostrarMensaje("Entrada creada correctamente", "success");
            loadAllData();
            setNuevaEntrada({ categoria: '', descripcion: '', precio: '', caracteristica: '', imagenUrl: '' });
        } catch (error) {
            mostrarMensaje("Error al crear entrada", "error");
        }
    };

    const handleDeleteEntrada = async (id) => {
        if (!window.confirm("¿Eliminar esta entrada?")) return;
        try {
            await deleteTicket(id);
            setEntradas(prev => prev.filter(e => e.id !== id));
            mostrarMensaje("Entrada eliminada", "success");
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    };

    // ---------------- FILTRADO ESPACIOS ----------------
    const espaciosFiltrados = espacios.filter(espacio => {
        if (filtros.zona.length > 0 && !filtros.zona.includes(espacio.zonaGeneral)) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return espacio.nombre.toLowerCase().includes(q) || espacio.zonaGeneral.toLowerCase().includes(q);
        }
        return true;
    });

    const handleFiltroChange = (categoria, valor) => {
        setFiltros(prev => {
            const nuevosValores = prev[categoria].includes(valor)
                ? prev[categoria].filter(v => v !== valor)
                : [...prev[categoria], valor];
            return { ...prev, [categoria]: nuevosValores };
        });
    };

    if (loadingAdmin) return <div className="admin-loading">Cargando Panel de Control...</div>;

    return (
        <div className="admin-wrapper">
            {/* MENSAJES FLOTANTES */}
            {mensaje.texto && (
                <div className={`admin-alert ${mensaje.tipo}`}>{mensaje.texto}</div>
            )}

            <aside className="admin-sidebar">
                <div className="admin-logo-container" onClick={() => navigate('/')}>
                    <img src="/logoPI.png" alt="Logo" className="admin-logo" />
                    <p className="admin-badge">ADMIN</p>
                </div>

                <nav className="admin-nav">
                    <button className={`admin-nav-btn ${activeSection === 'ARTISTAS' ? 'active' : ''}`} onClick={() => setActiveSection('ARTISTAS')}>ARTISTAS</button>
                    <button className={`admin-nav-btn ${activeSection === 'GESTION_ESPACIOS' ? 'active' : ''}`} onClick={() => setActiveSection('GESTION_ESPACIOS')}>GESTIÓN ESPACIOS</button>
                    <button className={`admin-nav-btn ${activeSection === 'ENTRADAS' ? 'active' : ''}`} onClick={() => setActiveSection('ENTRADAS')}>ENTRADAS</button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-logout-btn" onClick={() => { localStorage.clear(); navigate('/login'); }}>Cerrar Sesión</button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2>{activeSection.replace('_', ' ')}</h2>
                    <div className="admin-profile-circle" onClick={() => navigate('/perfil')}>A</div>
                </header>

                {/* SECCIÓN ARTISTAS */}
                {activeSection === 'ARTISTAS' && (
                    <>
                        <div className="admin-content-box">
                            <h3 className="form-title">AÑADIR NUEVO ARTISTA</h3>
                            <div className="form-grid artistas-form-grid">
                                <div className="artista-field artista-field-full">
                                    <label>Nombre</label>
                                    <input type="text" value={nuevoArtista.nombre} onChange={e => setNuevoArtista({...nuevoArtista, nombre: e.target.value})} placeholder="Nombre Artista" />
                                </div>
                                <div className="artista-field">
                                    <label>Fecha</label>
                                    <div className="fecha-selects">
                                        <select value={nuevoArtista.diaSemana} onChange={e => setNuevoArtista({...nuevoArtista, diaSemana: e.target.value})}>
                                            <option value="">Día</option>
                                            {['Viernes', 'Sábado', 'Domingo'].map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <input type="number" placeholder="Día" value={nuevoArtista.diaMes} onChange={e => setNuevoArtista({...nuevoArtista, diaMes: e.target.value})} style={{width: '60px'}} />
                                        <select value={nuevoArtista.mes} onChange={e => setNuevoArtista({...nuevoArtista, mes: e.target.value})}>
                                            <option value="">Mes</option>
                                            <option value="Julio">Julio</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="artista-field">
                                    <label>Spotify / URL Imagen</label>
                                    <input type="text" placeholder="URL Spotify" value={nuevoArtista.spotifyUrl} onChange={e => setNuevoArtista({...nuevoArtista, spotifyUrl: e.target.value})} />
                                    <input type="text" placeholder="URL Imagen (https://...)" value={nuevoArtista.imagenUrl} onChange={e => setNuevoArtista({...nuevoArtista, imagenUrl: e.target.value})} style={{marginTop: '10px'}}/>
                                </div>
                                <button className="btn-add-artist" onClick={handleAddArtista}>Añadir al Cartel</button>
                            </div>
                        </div>

                        <div className="artistas-existentes">
                            <h3 className="entradas-existentes-title">Lineup Actual</h3>
                            <div className="artistas-grid">
                                {artistas.map(a => (
                                    <div key={a.id} className="artista-card">
                                        <img src={a.imagen || "/placeholder-artist.jpg"} alt={a.nombre} className="artista-card-img" />
                                        <button className="entrada-delete-btn" onClick={() => handleDeleteArtista(a.id)}>✕</button>
                                        <h4>{a.nombre}</h4>
                                        <p>{a.diaSemana} {a.diaMes} {a.mes}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* SECCIÓN ENTRADAS */}
                {activeSection === 'ENTRADAS' && (
                    <div className="entradas-container">
                        <div className="admin-content-box">
                            <h3 className="form-title">NUEVO TICKET</h3>
                            <div className="entradas-form-grid">
                                <input type="text" placeholder="Categoría (VIP, General...)" value={nuevaEntrada.categoria} onChange={e => setNuevaEntrada({...nuevaEntrada, categoria: e.target.value})} />
                                <input type="text" placeholder="Precio (ej: 90)" value={nuevaEntrada.precio} onChange={e => setNuevaEntrada({...nuevaEntrada, precio: e.target.value})} />
                                <input type="text" placeholder="Descripción" value={nuevaEntrada.descripcion} onChange={e => setNuevaEntrada({...nuevaEntrada, descripcion: e.target.value})} />
                                <input type="text" placeholder="URL Imagen" value={nuevaEntrada.imagenUrl} onChange={e => setNuevaEntrada({...nuevaEntrada, imagenUrl: e.target.value})} />
                                <button className="btn-add-artist" onClick={handleAddEntrada}>Crear Ticket</button>
                            </div>
                        </div>

                        <div className="entradas-existentes">
                            <div className="entradas-grid">
                                {entradas.map(e => (
                                    <div key={e.id} className="entrada-card">
                                        <button className="entrada-delete-btn" onClick={() => handleDeleteEntrada(e.id)}>✕</button>
                                        <h4>{e.categoria}</h4>
                                        <p className="precio-tag">{e.precio}€</p>
                                        <p>{e.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SECCIÓN ESPACIOS (Sigue igual lógica de filtrado) */}
                {activeSection === 'GESTION_ESPACIOS' && (
                    <div className="espacios-container">
                        <aside className="espacios-filters">
                            <div className="filter-section">
                                <h4>Zona</h4>
                                {['Norte', 'Sur', 'Este', 'Oeste', 'Centro'].map(zona => (
                                    <label key={zona}><input type="checkbox" checked={filtros.zona.includes(zona)} onChange={() => handleFiltroChange('zona', zona)} /> {zona}</label>
                                ))}
                            </div>
                            <button className="btn-clear-filters" onClick={() => setFiltros({ zona: [], tamano: [], precio: [] })}>Limpiar</button>
                        </aside>
                        <div className="espacios-content">
                            <input type="text" placeholder="Buscar..." className="search-input" onChange={e => setSearchQuery(e.target.value)} />
                            <div className="espacios-grid">
                                {espaciosFiltrados.map(esp => (
                                    <div key={esp.id} className="espacio-card" onClick={() => setSelectedEspacio(esp)}>
                                        <span className="zona-badge">{esp.zonaGeneral}</span>
                                        <h3>{esp.nombre}</h3>
                                        <p>{esp.precio}€</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </main>
        </div>
    );
}

export default Perfil_Admin;