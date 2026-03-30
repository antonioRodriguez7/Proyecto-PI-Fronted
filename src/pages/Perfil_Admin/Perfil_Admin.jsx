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
    deleteTicket,
    createSpace,
    deleteSpace
} from "../../services/api";

function Perfil_Admin() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('ARTISTAS');
    const [espacios, setEspacios] = useState([]);
    const [artistas, setArtistas] = useState([]);
    const [entradas, setEntradas] = useState([]);

    // --- ESTADOS PARA FORMULARIOS ---
    const [nuevoArtista, setNuevoArtista] = useState({
        nombre: '', diaSemana: '', diaMes: '', mes: '', spotifyUrl: '', imagenUrl: ''
    });

    const [nuevaEntrada, setNuevaEntrada] = useState({
        categoria: '', descripcion: '', precio: '', caracteristica: '', imagenUrl: ''
    });

    // 🔥 ESTA ES LA VARIABLE QUE FALTABA Y HACÍA QUE SE PUSIERA NEGRO
    const [nuevoEspacio, setNuevoEspacio] = useState({
        name: '', type: 'Foodtruck', price: '', sizeSquareMeters: '', isRented: false
    });

    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    // --- CARGA DE DATOS ---
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
                categoria: e.category || '',
                descripcion: e.description || '',
                precio: e.price || '',
                caracteristica: e.feature || '',
                imagen: e.imageUrl || null
            })) : []);

            setArtistas(Array.isArray(artistasData) ? artistasData.map(a => {
                const partes = (a.dia || a.performanceDate || '').split(' ');
                return {
                    id: a.id,
                    nombre: a.name || a.nombre || '',
                    diaSemana: partes[0] || '',
                    diaMes: partes[1] || '',
                    mes: partes[2] || '',
                    spotifyUrl: a.spotifyUrl || a.spoty || '',
                    imagen: a.imageUrl || a.img || null
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

    // --- LÓGICA ARTISTAS ---
    const handleAddArtista = async () => {
        if (!nuevoArtista.nombre) return;
        try {
            const artistDTO = {
                name: nuevoArtista.nombre,
                performanceDate: `${nuevoArtista.diaSemana} ${nuevoArtista.diaMes} ${nuevoArtista.mes}`,
                spotifyUrl: nuevoArtista.spotifyUrl,
                imageUrl: nuevoArtista.imagenUrl || "https://via.placeholder.com/300"
            };
            await createArtist(artistDTO);
            mostrarMensaje("Artista creado correctamente", "success");
            loadAllData();
            setNuevoArtista({ nombre: '', diaSemana: '', diaMes: '', mes: '', spotifyUrl: '', imagenUrl: '' });
        } catch (error) {
            mostrarMensaje("Error al crear artista", "error");
        }
    };

    const handleDeleteArtista = async (id) => {
        if (!window.confirm("¿Eliminar este artista?")) return;
        try {
            await deleteArtist(id);
            loadAllData();
            mostrarMensaje("Artista eliminado", "success");
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    };

    // --- LÓGICA ENTRADAS ---
    const handleAddEntrada = async () => {
        if (!nuevaEntrada.categoria || !nuevaEntrada.precio) return;
        try {
            const ticketDTO = {
                category: nuevaEntrada.categoria,
                description: nuevaEntrada.descripcion,
                price: parseFloat(nuevaEntrada.precio),
                imageUrl: nuevaEntrada.imagenUrl
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
            loadAllData();
            mostrarMensaje("Entrada eliminada", "success");
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    };

    // --- LÓGICA ESPACIOS ---
    const handleAddEspacio = async () => {
        if (!nuevoEspacio.name || !nuevoEspacio.price) return;
        try {
            const spaceDTO = {
                ...nuevoEspacio,
                price: parseFloat(nuevoEspacio.price),
                sizeSquareMeters: parseInt(nuevoEspacio.sizeSquareMeters) || 0
            };
            await createSpace(spaceDTO);
            mostrarMensaje("Espacio creado correctamente", "success");
            loadAllData();
            setNuevoEspacio({ name: '', type: 'Foodtruck', price: '', sizeSquareMeters: '', isRented: false });
        } catch (error) {
            console.error(error);
            mostrarMensaje("Error al crear espacio", "error");
        }
    };

    const handleDeleteEspacio = async (id) => {
        if (!window.confirm("¿Eliminar este espacio?")) return;
        try {
            await deleteSpace(id);
            loadAllData();
            mostrarMensaje("Espacio eliminado", "success");
        } catch (error) {
            mostrarMensaje("Error al eliminar", "error");
        }
    };

    if (loadingAdmin) return <div className="admin-loading">Cargando Panel de Control...</div>;

    return (
        <div className="admin-wrapper">
            {mensaje.texto && <div className={`admin-alert ${mensaje.tipo}`}>{mensaje.texto}</div>}

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

                {/* --- SECCIÓN ARTISTAS --- */}
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
                                        <p>{a.dia}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* --- SECCIÓN ENTRADAS --- */}
                {activeSection === 'ENTRADAS' && (
                    <div className="entradas-container">
                        <div className="admin-content-box">
                            <h3 className="form-title">NUEVO TICKET</h3>
                            <div className="entradas-form-grid">
                                <input type="text" placeholder="Categoría" value={nuevaEntrada.categoria} onChange={e => setNuevaEntrada({...nuevaEntrada, categoria: e.target.value})} />
                                <input type="text" placeholder="Precio" value={nuevaEntrada.precio} onChange={e => setNuevaEntrada({...nuevaEntrada, precio: e.target.value})} />
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

                {/* --- SECCIÓN ESPACIOS --- */}
                {activeSection === 'GESTION_ESPACIOS' && (
                    <div className="espacios-container">
                        <div className="admin-content-box">
                            <h3 className="form-title">REGISTRAR ESPACIO / PARCELA</h3>
                            <div className="form-grid">
                                <input type="text" placeholder="Nombre (Parcela A1)" value={nuevoEspacio.name} onChange={e => setNuevoEspacio({...nuevoEspacio, name: e.target.value})} />
                                <select value={nuevoEspacio.type} onChange={e => setNuevoEspacio({...nuevoEspacio, type: e.target.value})}>
                                    <option value="Foodtruck">Foodtruck</option>
                                    <option value="Escenario">Escenario</option>
                                    <option value="VIP">Zona VIP</option>
                                    <option value="Merchandising">Tienda</option>
                                </select>
                                <input type="number" placeholder="Precio Alquiler (€)" value={nuevoEspacio.price} onChange={e => setNuevoEspacio({...nuevoEspacio, price: e.target.value})} />
                                <input type="number" placeholder="Metros cuadrados (m²)" value={nuevoEspacio.sizeSquareMeters} onChange={e => setNuevoEspacio({...nuevoEspacio, sizeSquareMeters: e.target.value})} />
                                <button className="btn-add-artist" onClick={handleAddEspacio}>Guardar Espacio</button>
                            </div>
                        </div>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                    <th>m²</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {espacios.map(esp => (
                                    <tr key={esp.id}>
                                        <td>{esp.name}</td>
                                        <td>{esp.type}</td>
                                        <td>{esp.price}€</td>
                                        <td>{esp.sizeSquareMeters}</td>
                                        <td>{esp.isRented ? "OCUPADO" : "LIBRE"}</td>
                                        <td><button onClick={() => handleDeleteEspacio(esp.id)} className="btn-delete-small">Eliminar</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <Footer />
            </main>
        </div>
    );
}

export default Perfil_Admin;