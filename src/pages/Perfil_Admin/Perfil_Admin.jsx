import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil_Admin.css';
import Footer from "../../components/Footer";
import { getEspacios, getEntradas, getArtistas } from "../../services/api";

function Perfil_Admin() {

    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('ARTISTAS');
    const [selectedEspacio, setSelectedEspacio] = useState(null);

    const [filtros, setFiltros] = useState({
        zona: [],
        tamano: [],
        precio: []
    });

    const [searchQuery, setSearchQuery] = useState('');

    // ---------------- ESPACIOS (fake backend) ----------------
    const [espacios, setEspacios] = useState([]);

    // ---------------- ARTISTAS ----------------
    const [nuevoArtista, setNuevoArtista] = useState({
        nombre: '',
        diaSemana: '',
        diaMes: '',
        mes: '',
        spotifyUrl: '',
        imagen: null
    });

    const [artistas, setArtistas] = useState([]);

    // ---------------- ENTRADAS (fake backend) ----------------
    const [nuevaEntrada, setNuevaEntrada] = useState({
        categoria: '',
        descripcion: '',
        precio: '',
        caracteristica: '',
        imagen: null
    });

    const [entradas, setEntradas] = useState([]);

    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const [errorAdmin, setErrorAdmin] = useState(null);

    // ---------------- CARGAR DATOS DEL BACKEND ----------------
    useEffect(() => {
        const fetchAdminData = async () => {
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
                    categoria: e.nombre ?? e.categoria ?? '',
                    descripcion: e.descripcion ?? '',
                    precio: e.precio ?? '',
                    caracteristica: e.etiqueta ?? e.caracteristica ?? '',
                    imagen: e.img ?? e.imagen ?? null
                })) : []);

                setArtistas(Array.isArray(artistasData) ? artistasData.map(a => {
                    const partes = (a.dia || '').split(' ');
                    return {
                        id: a.id,
                        nombre: a.nombre ?? '',
                        diaSemana: partes[0] ?? '',
                        diaMes: partes[1] ?? '',
                        mes: partes[2] ?? '',
                        spotifyUrl: a.spoty ?? a.spotifyUrl ?? '',
                        imagen: a.img ?? a.imagen ?? null
                    };
                }) : []);
            } catch (error) {
                console.error("Error al cargar datos del panel de admin:", error);
                setErrorAdmin("Error cargando los datos del panel.");
            } finally {
                setLoadingAdmin(false);
            }
        };

        fetchAdminData();
    }, []);

    // ---------------- ARTISTAS ----------------
    const handleAddArtista = () => {
        if (!nuevoArtista.nombre) return;

        setArtistas(prev => [...prev, { ...nuevoArtista, id: Date.now() }]);

        setNuevoArtista({
            nombre: '',
            diaSemana: '',
            diaMes: '',
            mes: '',
            spotifyUrl: '',
            imagen: null
        });
    };

    const handleUpdateArtista = (id, field, value) => {
        setArtistas(prev =>
            prev.map(a => a.id === id ? { ...a, [field]: value } : a)
        );
    };

    const handleDeleteArtista = (id) => {
        setArtistas(prev => prev.filter(a => a.id !== id));
    };

    // ---------------- ENTRADAS ----------------
    const handleAddEntrada = () => {

        if (!nuevaEntrada.categoria || !nuevaEntrada.precio) return;

        setEntradas(prev => [
            ...prev,
            { ...nuevaEntrada, id: Date.now() }
        ]);

        setNuevaEntrada({
            categoria: '',
            descripcion: '',
            precio: '',
            caracteristica: '',
            imagen: null
        });
    };

    const handleUpdateEntrada = (id, field, value) => {
        setEntradas(prev =>
            prev.map(e => e.id === id ? { ...e, [field]: value } : e)
        );
    };

    const handleDeleteEntrada = (id) => {
        setEntradas(prev => prev.filter(e => e.id !== id));
    };

    // ---------------- FILTROS ----------------
    const handleFiltroChange = (categoria, valor) => {

        setFiltros(prev => {

            const nuevosValores = prev[categoria].includes(valor)
                ? prev[categoria].filter(v => v !== valor)
                : [...prev[categoria], valor];

            return { ...prev, [categoria]: nuevosValores };

        });
    };

    // ---------------- FILTRADO ESPACIOS ----------------
    const espaciosFiltrados = espacios.filter(espacio => {

        if (filtros.zona.length > 0 && !filtros.zona.includes(espacio.zonaGeneral))
            return false;

        if (searchQuery.trim()) {

            const q = searchQuery.toLowerCase();

            const coincide =
                espacio.nombre.toLowerCase().includes(q) ||
                espacio.caracteristica.toLowerCase().includes(q) ||
                espacio.lugar.toLowerCase().includes(q) ||
                espacio.zonaGeneral.toLowerCase().includes(q);

            if (!coincide) return false;
        }

        if (filtros.tamano.length > 0) {

            const size = parseInt(espacio.tamano);

            let cumpleTamano = false;

            if (filtros.tamano.includes('< 200m²') && size < 200) cumpleTamano = true;
            if (filtros.tamano.includes('200 - 500m²') && size >= 200 && size <= 500) cumpleTamano = true;
            if (filtros.tamano.includes('> 500m²') && size > 500) cumpleTamano = true;

            if (!cumpleTamano) return false;
        }

        if (filtros.precio.length > 0) {

            const precio = parseInt(espacio.precio.replace(/[€.,]/g, ''));

            let cumplePrecio = false;

            if (filtros.precio.includes('< 2000€') && precio < 2000) cumplePrecio = true;
            if (filtros.precio.includes('2000 - 3000€') && precio >= 2000 && precio <= 3000) cumplePrecio = true;
            if (filtros.precio.includes('> 3000€') && precio > 3000) cumplePrecio = true;

            if (!cumplePrecio) return false;
        }

        return true;

    });

    return (
        <div className="admin-wrapper">

            {/* MENÚ LATERAL */}
            <aside className="admin-sidebar">

                <div
                    className="admin-logo-container"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/logoPI.png" alt="Logo" className="admin-logo" />
                    <p className="admin-badge">ADMIN</p>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-btn ${activeSection === 'ARTISTAS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('ARTISTAS')}
                    >
                        ARTISTAS
                    </button>
                    <button
                        className={`admin-nav-btn ${activeSection === 'GESTION_ESPACIOS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('GESTION_ESPACIOS')}
                    >
                        GESTIÓN ESPACIOS
                    </button>
                    <button
                        className={`admin-nav-btn ${activeSection === 'ENTRADAS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('ENTRADAS')}
                    >
                        ENTRADAS
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button
                        className="admin-logout-btn"
                        onClick={() => navigate('/login')}
                    >
                        Cerrar Sesión
                    </button>
                </div>

            </aside>

            {/* ÁREA PRINCIPAL */}
            <main className="admin-main">

                <header className="admin-header">
                    <h2>
                        {activeSection === 'ARTISTAS' ? 'Panel de Administración - Artistas' :
                            activeSection === 'GESTION_ESPACIOS' ? 'Gestión de Espacios del Festival' :
                                activeSection === 'ENTRADAS' ? 'Panel de Administración - Entradas' :
                                    'Panel de Administración'}
                    </h2>
                    <div
                        className="admin-profile-circle"
                        onClick={() => navigate('/perfil')}
                        style={{ cursor: 'pointer' }}
                        title="Ir a mi perfil"
                    >A</div>
                </header>

                {/* SECCIÓN ARTISTAS */}
                {activeSection === 'ARTISTAS' && (
                    <>
                        <div className="admin-content-box">
                            <h3 className="form-title">
                                GESTIÓN DE ARTISTAS - AÑADIR NUEVO
                            </h3>

                            <form className="admin-form" onSubmit={e => e.preventDefault()}>
                                <div className="form-grid artistas-form-grid">

                                    {/* Campo 1: Nombre */}
                                    <div className="artista-field artista-field-full">
                                        <label>Nombre del artista</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre del artista / grupo"
                                            value={nuevoArtista.nombre}
                                            onChange={e => setNuevoArtista(p => ({ ...p, nombre: e.target.value }))}
                                        />
                                    </div>

                                    {/* Campo 2: Fecha */}
                                    <div className="artista-field artista-field-full">
                                        <label>Fecha de actuación</label>
                                        <div className="fecha-selects">
                                            <select
                                                value={nuevoArtista.diaSemana}
                                                onChange={e => setNuevoArtista(p => ({ ...p, diaSemana: e.target.value }))}
                                            >
                                                <option value="">Día semana</option>
                                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={nuevoArtista.diaMes}
                                                onChange={e => setNuevoArtista(p => ({ ...p, diaMes: e.target.value }))}
                                            >
                                                <option value="">Día</option>
                                                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={nuevoArtista.mes}
                                                onChange={e => setNuevoArtista(p => ({ ...p, mes: e.target.value }))}
                                            >
                                                <option value="">Mes</option>
                                                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Campo 3: URL Spotify */}
                                    <div className="artista-field artista-field-full">
                                        <label>URL de Spotify</label>
                                        <input
                                            type="url"
                                            placeholder="https://open.spotify.com/artist/..."
                                            value={nuevoArtista.spotifyUrl}
                                            onChange={e => setNuevoArtista(p => ({ ...p, spotifyUrl: e.target.value }))}
                                        />
                                    </div>

                                    {/* Campo imagen */}
                                    <div className="artista-field artista-field-full">
                                        <label>Imagen del artista</label>
                                        <label className="artista-imagen-upload">
                                            {nuevoArtista.imagen ? (
                                                <div className="artista-imagen-preview-wrapper">
                                                    <img
                                                        src={URL.createObjectURL(nuevoArtista.imagen)}
                                                        alt="preview"
                                                        className="artista-imagen-preview"
                                                    />
                                                    <span className="artista-imagen-change-label">🖼️ Cambiar imagen</span>
                                                </div>
                                            ) : (
                                                <span>🖼️ Seleccionar imagen</span>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={e => setNuevoArtista(p => ({ ...p, imagen: e.target.files[0] || null }))}
                                            />
                                        </label>
                                    </div>

                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-add-artist"
                                        onClick={handleAddArtista}
                                    >
                                        Añadir artista
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* ARTISTAS AÑADIDOS */}
                        <div className="artistas-existentes">
                            <h3 className="entradas-existentes-title">Artistas añadidos</h3>

                            {artistas.length === 0 ? (
                                <div className="artistas-empty">
                                    <span className="artistas-empty-icon">🎤</span>
                                    <p>No hay artistas añadidos todavía.</p>
                                    <p className="artistas-empty-sub">Usa el formulario de arriba para añadir el primer artista.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="artistas-grid">
                                        {artistas.map(artista => (
                                            <div key={artista.id} className="artista-card">

                                                {/* Preview imagen + botón eliminar */}
                                                <div className="artista-card-img-row">
                                                    <label className="artista-card-img-label">
                                                        {artista.imagen ? (
                                                            <img
                                                                src={
                                                                    typeof artista.imagen === 'string'
                                                                        ? artista.imagen
                                                                        : URL.createObjectURL(artista.imagen)
                                                                }
                                                                alt={artista.nombre}
                                                                className="artista-card-img"
                                                            />
                                                        ) : (
                                                            <div className="artista-card-img-placeholder">🎤</div>
                                                        )}
                                                        <span className="artista-card-img-overlay">🖼️ Cambiar</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            onChange={e => handleUpdateArtista(artista.id, 'imagen', e.target.files[0] || null)}
                                                        />
                                                    </label>
                                                    <button
                                                        className="entrada-delete-btn"
                                                        onClick={() => handleDeleteArtista(artista.id)}
                                                    >✕</button>
                                                </div>

                                                <input
                                                    className="entrada-edit-input"
                                                    value={artista.nombre}
                                                    placeholder="Nombre del artista"
                                                    onChange={e => handleUpdateArtista(artista.id, 'nombre', e.target.value)}
                                                />

                                                <div className="artista-card-fecha">
                                                    <select
                                                        className="artista-edit-select"
                                                        value={artista.diaSemana}
                                                        onChange={e => handleUpdateArtista(artista.id, 'diaSemana', e.target.value)}
                                                    >
                                                        <option value="">Día semana</option>
                                                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(d => (
                                                            <option key={d} value={d}>{d}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        className="artista-edit-select"
                                                        value={artista.diaMes}
                                                        onChange={e => handleUpdateArtista(artista.id, 'diaMes', e.target.value)}
                                                    >
                                                        <option value="">Día</option>
                                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                                            <option key={d} value={d}>{d}</option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        className="artista-edit-select"
                                                        value={artista.mes}
                                                        onChange={e => handleUpdateArtista(artista.id, 'mes', e.target.value)}
                                                    >
                                                        <option value="">Mes</option>
                                                        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => (
                                                            <option key={m} value={m}>{m}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <input
                                                    className="entrada-edit-input artista-spotify-input"
                                                    value={artista.spotifyUrl}
                                                    placeholder="URL de Spotify"
                                                    onChange={e => handleUpdateArtista(artista.id, 'spotifyUrl', e.target.value)}
                                                />

                                                {artista.spotifyUrl && (
                                                    <a
                                                        href={artista.spotifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="artista-spotify-link"
                                                    >
                                                        Abrir en Spotify
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="entradas-save">
                                        <button className="btn-guardar">Guardar cambios</button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="admin-stats">
                            <div className="stat-card">
                                <h4>Total Entradas Vendidas</h4>
                                <p className="stat-number">45,832</p>
                            </div>

                            <div className="stat-card">
                                <h4>Artistas Confirmados</h4>
                                <p className="stat-number">48</p>
                            </div>

                            <div className="stat-card">
                                <h4>Proveedores Activos</h4>
                                <p className="stat-number">23</p>
                            </div>

                            <div className="stat-card">
                                <h4>Ingresos Totales</h4>
                                <p className="stat-number">3.2M€</p>
                            </div>
                        </div>
                    </>
                )}

                {/* SECCIÓN GESTIÓN ESPACIOS */}
                {activeSection === 'GESTION_ESPACIOS' && (
                    <div className="espacios-container">
                        {/* Filtros laterales */}
                        <aside className="espacios-filters">
                            <div className="filter-section">
                                <h4>Zona del Recinto</h4>
                                {['Norte', 'Sur', 'Este', 'Oeste', 'Centro'].map(zona => (
                                    <label key={zona}>
                                        <input
                                            type="checkbox"
                                            checked={filtros.zona.includes(zona)}
                                            onChange={() => handleFiltroChange('zona', zona)}
                                        />
                                        {zona}
                                    </label>
                                ))}
                            </div>

                            <div className="filter-section">
                                <h4>Tamaño</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tamano.includes('< 200m²')}
                                        onChange={() => handleFiltroChange('tamano', '< 200m²')}
                                    />
                                    {'< 200m²'}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tamano.includes('200 - 500m²')}
                                        onChange={() => handleFiltroChange('tamano', '200 - 500m²')}
                                    />
                                    200 - 500m²
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tamano.includes('> 500m²')}
                                        onChange={() => handleFiltroChange('tamano', '> 500m²')}
                                    />
                                    {'> 500m²'}
                                </label>
                            </div>



                            <div className="filter-section">
                                <h4>Precio</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.precio.includes('< 2000€')}
                                        onChange={() => handleFiltroChange('precio', '< 2000€')}
                                    />
                                    {'< 2.000€'}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.precio.includes('2000 - 3000€')}
                                        onChange={() => handleFiltroChange('precio', '2000 - 3000€')}
                                    />
                                    2.000 - 3.000€
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.precio.includes('> 3000€')}
                                        onChange={() => handleFiltroChange('precio', '> 3000€')}
                                    />
                                    {'> 3.000€'}
                                </label>
                            </div>

                            <button
                                className="btn-clear-filters"
                                onClick={() => setFiltros({ zona: [], tamano: [], precio: [] })}
                            >
                                Limpiar Filtros
                            </button>
                        </aside>

                        {/* Grid de espacios */}
                        <div className="espacios-content">
                            <div className="espacios-search">
                                <input
                                    type="text"
                                    placeholder="Buscar espacio..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="espacios-grid">
                                {espaciosFiltrados.map(espacio => (
                                    <div
                                        key={espacio.id}
                                        className={`espacio-card ${espacio.disponibilidad === 'Reservado' ? 'reservado' : ''}`}
                                        onClick={() => setSelectedEspacio(espacio)}
                                    >
                                        <div className={`espacio-status ${espacio.disponibilidad.toLowerCase().replace(' ', '-')}`}>
                                            {espacio.disponibilidad}
                                        </div>
                                        <span className="zona-badge">{espacio.zonaGeneral}</span>
                                        <h3>{espacio.nombre}</h3>
                                        <p className="espacio-tipo">{espacio.caracteristica}</p>
                                        <p className="espacio-detalle"> {espacio.lugar}</p>
                                        <p className="espacio-detalle"> {espacio.tamano}</p>
                                        <p className="espacio-precio"> {espacio.precio}</p>
                                    </div>
                                ))}
                            </div>

                            {espaciosFiltrados.length === 0 && (
                                <div className="no-results">
                                    <p>No se encontraron espacios con los filtros seleccionados</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal de detalle del espacio */}
                {selectedEspacio && (
                    <div className="modal-overlay" onClick={() => setSelectedEspacio(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedEspacio(null)}>✕</button>

                            <h2>{selectedEspacio.nombre}</h2>

                            <div className="modal-grid">
                                <div className="modal-section">
                                    <h4>Información General</h4>
                                    <p><strong>Característica:</strong> {selectedEspacio.caracteristica}</p>
                                    <p><strong>Evento:</strong> {selectedEspacio.evento}</p>
                                    <p><strong>Ubicación:</strong> {selectedEspacio.lugar}</p>
                                    <p><strong>Tamaño:</strong> {selectedEspacio.tamano}</p>
                                    <p><strong>Capacidad:</strong> {selectedEspacio.capacidad}</p>
                                    <p><strong>Precio:</strong> {selectedEspacio.precio}</p>
                                    <p><strong>Estado:</strong> <span className={`status-badge ${selectedEspacio.disponibilidad.toLowerCase().replace(' ', '-')}`}>{selectedEspacio.disponibilidad}</span></p>
                                </div>

                                <div className="modal-section">
                                    <h4>Descripción</h4>
                                    <p>{selectedEspacio.descripcion}</p>
                                </div>

                                <div className="modal-section">
                                    <h4>Servicios Incluidos</h4>
                                    <ul className="services-list">
                                        {selectedEspacio.servicios.map((servicio, index) => (
                                            <li key={index}>✓ {servicio}</li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedEspacio.disponibilidad === 'Reservado' && selectedEspacio.negocio && (
                                    <div className="modal-section negocio-section">
                                        <h4>🏢 Negocio Asignado</h4>
                                        <p><strong>Nombre:</strong> {selectedEspacio.negocio.nombre}</p>
                                        <p><strong>Categoría:</strong> {selectedEspacio.negocio.categoria}</p>
                                    </div>
                                )}
                            </div>

                            {selectedEspacio.disponibilidad === 'Reservado' && (
                                <div className="modal-actions">
                                    <a
                                        className="btn-contact"
                                        href={`mailto:${selectedEspacio.negocio?.email || ''}?subject=${encodeURIComponent(`Consulta sobre espacio: ${selectedEspacio.nombre}`)}&body=${encodeURIComponent(`Hola${selectedEspacio.negocio?.nombre ? `, ${selectedEspacio.negocio.nombre}` : ''},\n\nMe pongo en contacto en relación al espacio "${selectedEspacio.nombre}" (${selectedEspacio.lugar}) reservado para el Subsonic Festival 2026.\n\n[Escribe aquí tu mensaje]\n\nUn saludo,\nEquipo Subsonic Festival`)}`}
                                    >
                                        Contactar Proveedor
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* SECCIÓN ENTRADAS */}
                {activeSection === 'ENTRADAS' && (
                    <div className="entradas-container">

                        {/* FORMULARIO AÑADIR */}
                        <div className="admin-content-box">
                            <h3 className="form-title">Gestión de entradas</h3>
                            <div className="entradas-form-grid">
                                <div className="entradas-form-field">
                                    <label>Categoría</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: General, VIP..."
                                        value={nuevaEntrada.categoria}
                                        onChange={e => setNuevaEntrada(p => ({ ...p, categoria: e.target.value }))}
                                    />
                                </div>
                                <div className="entradas-form-field">
                                    <label>Descripción</label>
                                    <input
                                        type="text"
                                        placeholder="Descripción breve"
                                        value={nuevaEntrada.descripcion}
                                        onChange={e => setNuevaEntrada(p => ({ ...p, descripcion: e.target.value }))}
                                    />
                                </div>
                                <div className="entradas-form-field">
                                    <label>Precio</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: 99€"
                                        value={nuevaEntrada.precio}
                                        onChange={e => setNuevaEntrada(p => ({ ...p, precio: e.target.value }))}
                                    />
                                </div>
                                <div className="entradas-form-field">
                                    <label>Etiqueta</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Válida 3 días"
                                        value={nuevaEntrada.caracteristica}
                                        onChange={e => setNuevaEntrada(p => ({ ...p, caracteristica: e.target.value }))}
                                    />
                                </div>
                                <div className="entradas-form-field entradas-form-imagen">
                                    <label>Imagen entrada</label>
                                    <label className="artista-imagen-upload">
                                        {nuevaEntrada.imagen ? (
                                            <div className="artista-imagen-preview-wrapper">
                                                <img
                                                    src={URL.createObjectURL(nuevaEntrada.imagen)}
                                                    alt="preview"
                                                    className="artista-imagen-preview"
                                                />
                                                <span className="artista-imagen-change-label">🖼️ Cambiar imagen</span>
                                            </div>
                                        ) : (
                                            <span>🖼️ Seleccionar imagen</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={e => setNuevaEntrada(p => ({ ...p, imagen: e.target.files[0] || null }))}
                                        />
                                    </label>
                                </div>
                                <div className="entradas-form-field entradas-form-btn">
                                    <button className="btn-add-artist" onClick={handleAddEntrada}>
                                        Añadir entrada
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* GESTIONAR EXISTENTES */}
                        <div className="entradas-existentes">
                            <h3 className="entradas-existentes-title">Gestionar entradas existentes</h3>

                            {entradas.length === 0 ? (
                                <div className="artistas-empty">
                                    <span className="artistas-empty-icon">🎟️</span>
                                    <p>No hay entradas creadas todavía.</p>
                                    <p className="artistas-empty-sub">Usa el formulario de arriba para añadir la primera entrada.</p>
                                </div>
                            ) : (
                                <div className="entradas-grid">
                                    {entradas.map(entrada => (
                                        <div key={entrada.id} className="entrada-card">
                                            <div className="artista-card-img-row">
                                                <label className="artista-card-img-label">
                                                    {entrada.imagen ? (
                                                        <img
                                                            src={
                                                                typeof entrada.imagen === 'string'
                                                                    ? entrada.imagen
                                                                    : URL.createObjectURL(entrada.imagen)
                                                            }
                                                            alt={entrada.categoria}
                                                            className="artista-card-img"
                                                        />
                                                    ) : (
                                                        <div className="artista-card-img-placeholder">🎟️</div>
                                                    )}
                                                    <span className="artista-card-img-overlay">🖼️ Cambiar</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={e => handleUpdateEntrada(entrada.id, 'imagen', e.target.files[0] || null)}
                                                    />
                                                </label>
                                                <button
                                                    className="entrada-delete-btn"
                                                    onClick={() => handleDeleteEntrada(entrada.id)}
                                                >✕</button>
                                            </div>
                                            <input
                                                className="entrada-edit-input"
                                                value={entrada.categoria}
                                                placeholder="Categoría"
                                                onChange={e => handleUpdateEntrada(entrada.id, 'categoria', e.target.value)}
                                            />
                                            <input
                                                className="entrada-edit-input"
                                                value={entrada.descripcion}
                                                placeholder="Descripción"
                                                onChange={e => handleUpdateEntrada(entrada.id, 'descripcion', e.target.value)}
                                            />
                                            <input
                                                className="entrada-edit-input"
                                                value={entrada.precio}
                                                placeholder="Precio"
                                                onChange={e => handleUpdateEntrada(entrada.id, 'precio', e.target.value)}
                                            />
                                            <input
                                                className="entrada-edit-input"
                                                value={entrada.caracteristica}
                                                placeholder="Etiqueta"
                                                onChange={e => handleUpdateEntrada(entrada.id, 'caracteristica', e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {entradas.length > 0 && (
                                <div className="entradas-save">
                                    <button className="btn-guardar">Guardar</button>
                                </div>
                            )}
                        </div>

                    </div>
                )}
                <Footer />
            </main>


        </div>
    );
}

export default Perfil_Admin;
