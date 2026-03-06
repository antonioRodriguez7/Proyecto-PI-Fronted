import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil_Admin.css';
import Footer from "../../components/Footer";



function Perfil_Admin() {

    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('ARTISTAS');
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [filtros, setFiltros] = useState({
        tipo: [],
        tamano: [],
        ubicacion: [],
        precio: []
    });

    const espacios = [
        {
            id: 1,
            nombre: "Zona Velar",
            caracteristica: "Terreno llano cubierto con carpa",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Norte - Entrada Principal",
            tamano: "500m²",
            precio: "2.500€",
            ubicacion: "Ubicación 1",
            descripcion: "Espacio premium en zona de máximo tránsito, con carpa que garantiza protección frente a las condiciones meteorológicas.",
            capacidad: "20 stands",
            servicios: ["Electricidad", "Agua corriente", "Zona de carga/descarga", "Iluminación nocturna"],
            disponibilidad: "Disponible",
            imagen: "/espacios/foodcourt.jpg"
        },
        {
            id: 2,
            nombre: "Zona Paseo Central",
            caracteristica: "Avenida peatonal pavimentada",
            evento: "Subsonic Festival 2026",
            lugar: "Avenida Central",
            tamano: "300m²",
            precio: "1.800€",
            ubicacion: "Ubicación 1",
            descripcion: "Paseo principal de alto tránsito con suelo pavimentado y señalización visual estratégica.",
            capacidad: "15 stands",
            servicios: ["Electricidad", "WiFi", "Seguridad 24h", "Almacén cercano"],
            disponibilidad: "Disponible",
            imagen: "/espacios/merchandising.jpg"
        },
        {
            id: 3,
            nombre: "Zona Relax",
            caracteristica: "Terreno ajardinado con sombra natural",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Este - Área Relax",
            tamano: "800m²",
            precio: "3.200€",
            ubicacion: "Ubicación 2",
            descripcion: "Área verde con árboles y vegetación que proporciona sombra natural, ideal para experiencias al aire libre.",
            capacidad: "10 espacios grandes",
            servicios: ["Electricidad", "Sombra natural", "Zona WiFi", "Asientos incluidos"],
            disponibilidad: "Reservado",
            negocio: { nombre: "Green Bites", categoria: "Comida" },
            imagen: "/espacios/chillout.jpg"
        },
        {
            id: 4,
            nombre: "Zona VIP",
            caracteristica: "Recinto cerrado con acceso controlado",
            evento: "Subsonic Festival 2026",
            lugar: "Zona VIP",
            tamano: "150m²",
            precio: "4.500€",
            ubicacion: "Ubicación 3",
            descripcion: "Espacio exclusivo vallado con acceso restringido por pulsera, ambiente premium y atención personalizada.",
            capacidad: "5 barras",
            servicios: ["Electricidad", "Agua", "Cámaras frigoríficas", "Sistema de sonido", "Iluminación especial"],
            disponibilidad: "Disponible",
            imagen: "/espacios/vipbar.jpg"
        },
        {
            id: 5,
            nombre: "Zona Innova",
            caracteristica: "Pabellón cubierto climatizado",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Sur - Área Innovación",
            tamano: "600m²",
            precio: "2.800€",
            ubicacion: "Ubicación 2",
            descripcion: "Pabellón cerrado con climatización, perfecto para instalaciones tecnológicas y activaciones de alto impacto.",
            capacidad: "8 stands grandes",
            servicios: ["Electricidad de alta potencia", "WiFi fibra óptica", "Climatización", "Proyectores"],
            disponibilidad: "Disponible",
            imagen: "/espacios/gaming.jpg"
        },
        {
            id: 6,
            nombre: "Zona Oeste",
            caracteristica: "Callejón urbano con suelo de adoquín",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Oeste",
            tamano: "400m²",
            precio: "2.000€",
            ubicacion: "Ubicación 4",
            descripcion: "Callejón con estética urbana, suelo de adoquín y alto flujo de asistentes procedentes del escenario principal.",
            capacidad: "12 food trucks",
            servicios: ["Electricidad", "Agua", "Sistema de extracción", "Zona de comensales"],
            disponibilidad: "Disponible",
            imagen: "/espacios/streetfood.jpg"
        },
        {
            id: 7,
            nombre: "Zona Boutique",
            caracteristica: "Espacio acotado con iluminación especial",
            evento: "Subsonic Festival 2026",
            lugar: "Zona VIP - Entrada secundaria",
            tamano: "120m²",
            precio: "1.500€",
            ubicacion: "Ubicación 3",
            descripcion: "Rincón exclusivo con iluminación cálida y delimitación visual, pensado para marcas de carácter premium.",
            capacidad: "6 stands",
            servicios: ["Electricidad", "Espejos", "Iluminación profesional", "Aire acondicionado"],
            disponibilidad: "Disponible",
            imagen: "/espacios/beauty.jpg"
        },
        {
            id: 8,
            nombre: "Zona Stage",
            caracteristica: "Tarima elevada con gradas laterales",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Centro",
            tamano: "200m²",
            precio: "5.000€",
            ubicacion: "Ubicación 1",
            descripcion: "Escenario secundario elevado con gradas a ambos lados, máxima visibilidad desde cualquier ángulo del recinto.",
            capacidad: "1 escenario completo",
            servicios: ["Sistema de sonido completo", "Iluminación profesional", "Backstage", "Generador propio"],
            disponibilidad: "Reservado",
            negocio: { nombre: "SoundWave Events", categoria: "Entretenimiento" },
            imagen: "/espacios/stage.jpg"
        }
    ];

    const handleFiltroChange = (categoria, valor) => {
        setFiltros(prev => {
            const nuevosValores = prev[categoria].includes(valor)
                ? prev[categoria].filter(v => v !== valor)
                : [...prev[categoria], valor];
            return { ...prev, [categoria]: nuevosValores };
        });
    };

    const espaciosFiltrados = espacios.filter(espacio => {
        if (filtros.tipo.length > 0 && !filtros.tipo.includes(espacio.tipo)) return false;
        if (filtros.ubicacion.length > 0 && !filtros.ubicacion.includes(espacio.ubicacion)) return false;

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
                    <button className="admin-nav-btn">ENTRADAS</button>
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
                                'Panel de Administración'}
                    </h2>
                    <div className="admin-profile-circle">A</div>
                </header>

                {/* SECCIÓN ARTISTAS */}
                {activeSection === 'ARTISTAS' && (
                    <>
                        <div className="admin-content-box">
                            <h3 className="form-title">
                                GESTIÓN DE ARTISTAS - AÑADIR NUEVO
                            </h3>

                            <form className="admin-form">
                                <div className="form-grid">
                                    <input type="text" placeholder="Nombre del artista / grupo" />
                                    <input type="text" placeholder="Género musical" />

                                    <input type="date" />
                                    <input type="time" />

                                    <input type="text" placeholder="Caché (€)" />
                                    <input type="text" placeholder="Escenario asignado" />

                                    <input type="text" placeholder="Requisitos técnicos (Rider)" />
                                    <input type="text" placeholder="URL Imagen promocional" />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn-add-artist"
                                    >
                                        Añadir artista
                                    </button>
                                </div>
                            </form>
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
                                <h4>Tipo de Espacio</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tipo.includes('Restauración')}
                                        onChange={() => handleFiltroChange('tipo', 'Restauración')}
                                    />
                                    Restauración
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tipo.includes('Merchandising')}
                                        onChange={() => handleFiltroChange('tipo', 'Merchandising')}
                                    />
                                    Merchandising
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.tipo.includes('Entretenimiento')}
                                        onChange={() => handleFiltroChange('tipo', 'Entretenimiento')}
                                    />
                                    Entretenimiento
                                </label>
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
                                <h4>Ubicación</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.ubicacion.includes('Ubicación 1')}
                                        onChange={() => handleFiltroChange('ubicacion', 'Ubicación 1')}
                                    />
                                    Ubicación 1
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.ubicacion.includes('Ubicación 2')}
                                        onChange={() => handleFiltroChange('ubicacion', 'Ubicación 2')}
                                    />
                                    Ubicación 2
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.ubicacion.includes('Ubicación 3')}
                                        onChange={() => handleFiltroChange('ubicacion', 'Ubicación 3')}
                                    />
                                    Ubicación 3
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filtros.ubicacion.includes('Ubicación 4')}
                                        onChange={() => handleFiltroChange('ubicacion', 'Ubicación 4')}
                                    />
                                    Ubicación 4
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
                                onClick={() => setFiltros({ tipo: [], tamano: [], ubicacion: [], precio: [] })}
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
                                    <button className="btn-contact">Contactar Proveedor</button>
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
