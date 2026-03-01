import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil_Proveedor.css';

function Perfil_Proveedor() {

    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('MIS_SERVICIOS');
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [filtros, setFiltros] = useState({
        tipo: [],
        tamano: [],
        ubicacion: [],
        precio: []
    });

    // Espacios disponibles para proveedores (solo los disponibles)
    const espaciosDisponibles = [
        {
            id: 1,
            nombre: "Food Court Principal",
            tipo: "Restauración",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Norte - Entrada Principal",
            tamano: "500m²",
            precio: "2.500€",
            ubicacion: "Ubicación 1",
            descripcion: "Espacio premium en zona de máximo tránsito, ideal para food trucks y stands de comida.",
            capacidad: "20 stands",
            servicios: ["Electricidad", "Agua corriente", "Zona de carga/descarga", "Iluminación nocturna"],
            disponibilidad: "Disponible",
            imagen: "/espacios/foodcourt.jpg"
        },
        {
            id: 2,
            nombre: "Merchandising Main Street",
            tipo: "Merchandising",
            evento: "Subsonic Festival 2026",
            lugar: "Avenida Central",
            tamano: "300m²",
            precio: "1.800€",
            ubicacion: "Ubicación 1",
            descripcion: "Paseo comercial principal con alta visibilidad, perfecto para venta de merchandising oficial y marcas.",
            capacidad: "15 stands",
            servicios: ["Electricidad", "WiFi", "Seguridad 24h", "Almacén cercano"],
            disponibilidad: "Disponible",
            imagen: "/espacios/merchandising.jpg"
        },
        {
            id: 4,
            nombre: "Premium Drinks Bar",
            tipo: "Restauración",
            evento: "Subsonic Festival 2026",
            lugar: "Zona VIP",
            tamano: "150m²",
            precio: "4.500€",
            ubicacion: "Ubicación 3",
            descripcion: "Espacio exclusivo en zona VIP para barra de cócteles y bebidas premium.",
            capacidad: "5 barras",
            servicios: ["Electricidad", "Agua", "Cámaras frigoríficas", "Sistema de sonido", "Iluminación especial"],
            disponibilidad: "Disponible",
            imagen: "/espacios/vipbar.jpg"
        },
        {
            id: 5,
            nombre: "Tech & Gaming Arena",
            tipo: "Entretenimiento",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Sur - Área Innovación",
            tamano: "600m²",
            precio: "2.800€",
            ubicacion: "Ubicación 2",
            descripcion: "Espacio cubierto para experiencias tecnológicas, gaming y activaciones de marca interactivas.",
            capacidad: "8 stands grandes",
            servicios: ["Electricidad de alta potencia", "WiFi fibra óptica", "Climatización", "Proyectores"],
            disponibilidad: "Disponible",
            imagen: "/espacios/gaming.jpg"
        },
        {
            id: 6,
            nombre: "Street Food Alley",
            tipo: "Restauración",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Oeste",
            tamano: "400m²",
            precio: "2.000€",
            ubicacion: "Ubicación 4",
            descripcion: "Callejón gastronómico con ambiente urbano, perfecto para opciones de comida rápida y casual.",
            capacidad: "12 food trucks",
            servicios: ["Electricidad", "Agua", "Sistema de extracción", "Zona de comensales"],
            disponibilidad: "Disponible",
            imagen: "/espacios/streetfood.jpg"
        },
        {
            id: 7,
            nombre: "Beauty & Wellness Corner",
            tipo: "Merchandising",
            evento: "Subsonic Festival 2026",
            lugar: "Zona VIP - Entrada secundaria",
            tamano: "120m²",
            precio: "1.500€",
            ubicacion: "Ubicación 3",
            descripcion: "Espacio boutique para marcas de belleza, wellness y lifestyle con ambiente exclusivo.",
            capacidad: "6 stands",
            servicios: ["Electricidad", "Espejos", "Iluminación profesional", "Aire acondicionado"],
            disponibilidad: "Disponible",
            imagen: "/espacios/beauty.jpg"
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

    const espaciosFiltrados = espaciosDisponibles.filter(espacio => {
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

    const handleSolicitarAlquiler = (espacio) => {
        alert(`Solicitud de alquiler enviada para: ${espacio.nombre}\n\nTe contactaremos pronto con más información.`);
        setSelectedEspacio(null);
    };

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
                    <p className="admin-badge">PROVEEDOR</p>
                </div>

                <nav className="admin-nav">
                    <button 
                        className={`admin-nav-btn ${activeSection === 'MIS_SERVICIOS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('MIS_SERVICIOS')}
                    >
                        MIS SERVICIOS
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeSection === 'ESPACIOS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('ESPACIOS')}
                    >
                        ESPACIOS
                    </button>
                    <button className="admin-nav-btn">CONTRATOS</button>
                    <button className="admin-nav-btn">HISTORIAL DE COMPRA</button>
                    <button className="admin-nav-btn">CONFIGURACIÓN</button>
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
                    <h2>{activeSection === 'MIS_SERVICIOS' ? 'Gestión de Servicios - Proveedor' : 'Espacios Disponibles'}</h2>
                    <div className="admin-profile-circle">P</div>
                </header>

                {/* SECCIÓN MIS SERVICIOS */}
                {activeSection === 'MIS_SERVICIOS' && (
                    <div className="admin-content-box">
                        <h3 className="form-title">
                            RELLENA LOS CAMPOS CON TU NUEVO SERVICIO
                        </h3>

                        <form className="admin-form">
                            <div className="form-grid">
                                <input type="text" placeholder="Nombre del servicio" />
                                <input type="text" placeholder="Categoría" />

                                <input type="date" placeholder="Fecha inicio" />
                                <input type="date" placeholder="Fecha fin" />

                                <input type="text" placeholder="Precio (€)" />
                                <input type="text" placeholder="Ubicación" />

                                <input type="text" placeholder="Descripción del servicio" />
                                <input type="text" placeholder="URL Imagen" />
                            </div>

                            <div className="form-actions">
                                <button 
                                    type="button"
                                    className="btn-add-artist"
                                >
                                    Añadir servicio
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* SECCIÓN ESPACIOS DISPONIBLES */}
                {activeSection === 'ESPACIOS' && (
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

                            <div className="espacios-info-banner">
                                <p>📍 Mostrando {espaciosFiltrados.length} espacios disponibles para alquiler</p>
                            </div>

                            <div className="espacios-grid">
                                {espaciosFiltrados.map(espacio => (
                                    <div 
                                        key={espacio.id} 
                                        className="espacio-card-proveedor"
                                        onClick={() => setSelectedEspacio(espacio)}
                                    >
                                        <div className="espacio-status disponible">
                                            {espacio.disponibilidad}
                                        </div>
                                        <h3>{espacio.nombre}</h3>
                                        <p className="espacio-tipo">{espacio.tipo}</p>
                                        <p className="espacio-detalle">📅 {espacio.evento}</p>
                                        <p className="espacio-detalle">📍 {espacio.lugar}</p>
                                        <div className="espacio-footer">
                                            <span className="espacio-ver-mas">Ver detalles →</span>
                                        </div>
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
                            <p className="modal-subtitle">{selectedEspacio.tipo} • {selectedEspacio.evento}</p>
                            
                            <div className="modal-grid">
                                <div className="modal-section">
                                    <h4>📏 Dimensiones</h4>
                                    <p><strong>Tamaño:</strong> {selectedEspacio.tamano}</p>
                                    <p><strong>Capacidad:</strong> {selectedEspacio.capacidad}</p>
                                </div>

                                <div className="modal-section">
                                    <h4>📍 Ubicación</h4>
                                    <p><strong>Lugar:</strong> {selectedEspacio.lugar}</p>
                                    <p><strong>Zona:</strong> {selectedEspacio.ubicacion}</p>
                                </div>

                                <div className="modal-section">
                                    <h4>💰 Precio</h4>
                                    <p className="precio-destacado">{selectedEspacio.precio}</p>
                                    <p style={{fontSize: '0.9em', color: '#aaa'}}>Por los 3 días del festival</p>
                                </div>

                                <div className="modal-section modal-section-full">
                                    <h4>ℹ️ Descripción</h4>
                                    <p>{selectedEspacio.descripcion}</p>
                                </div>

                                <div className="modal-section modal-section-full">
                                    <h4>✓ Servicios Incluidos</h4>
                                    <ul className="services-list">
                                        {selectedEspacio.servicios.map((servicio, index) => (
                                            <li key={index}>✓ {servicio}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="modal-actions-proveedor">
                                <button 
                                    className="btn-solicitar-alquiler"
                                    onClick={() => handleSolicitarAlquiler(selectedEspacio)}
                                >
                                    📋 Solicitar Alquiler
                                </button>
                                <button 
                                    className="btn-contactar"
                                    onClick={() => alert('Abriendo chat con el administrador...')}
                                >
                                    💬 Contactar Administrador
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Perfil_Proveedor;
