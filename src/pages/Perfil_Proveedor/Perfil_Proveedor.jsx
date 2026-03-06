import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil_Proveedor.css';

function Perfil_Proveedor() {

    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('MIS_ESPACIOS');
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [modoReemplazoEspacioId, setModoReemplazoEspacioId] = useState(null);
    const [filtros, setFiltros] = useState({
        zona: [],
        tamano: [],
        precio: []
    });

    // Espacios contratados por el proveedor
    const [espaciosContratados, setEspaciosContratados] = useState([
        {
            id: 1,
            nombre: "Food Court Principal",
            tipo: "Bebidas",
            evento: "Subsonic Festival 2026",
            lugar: "Zona Norte - Entrada Principal",
            tamano: "500m²",
            precio: "2.500€",
            ubicacion: "Ubicación 1",
            descripcion: "Espacio premium en zona de máximo tránsito",
            servicios: [
                {
                    id: 1001,
                    espacioId: 1,
                    nombre: "Barra Fusión",
                    tipo: "Bebidas",
                    descripcion: "Servicio de cócteles y bebidas sin alcohol durante todo el festival.",
                    fechas: "17-20 julio"
                }
            ]
        },
        {
            id: 2,
            nombre: "Zona Merch Norte",
            tipo: "General",
            evento: "Subsonic Festival 2026",
            lugar: "Acceso norte - lateral merchandising",
            tamano: "220m²",
            precio: "1.900€",
            ubicacion: "Ubicación 2",
            descripcion: "Espacio comercial ideal para marcas y productos oficiales",
            servicios: []
        }
    ]);

    // Servicios del proveedor
    const [serviciosProveedor, setServiciosProveedor] = useState([
        {
            id: 1001,
            espacioId: 1,
            nombre: "Barra Fusión",
            tipo: "Bebidas",
            descripcion: "Servicio de cócteles y bebidas sin alcohol durante todo el festival.",
            fechas: "17-20 julio"
        }
    ]);
    const [formServicio, setFormServicio] = useState({
        nombre: '',
        tipo: 'Restauración',
        descripcion: '',
        fechas: ''
    });

    // Espacios disponibles para proveedores (mismos datos que en Perfil_Admin)
    const espaciosDisponibles = [
        {
            id: 1,
            nombre: "Zona Velar",
            zonaGeneral: "Norte",
            caracteristica: "Terreno llano cubierto con carpa",
            evento: "Subsonic Festival 2026",
            lugar: "Acceso principal norte del recinto",
            tamano: "500m²",
            precio: "2.500€",
            descripcion: "Espacio premium en zona de máximo tránsito, con carpa que garantiza protección frente a las condiciones meteorológicas.",
            capacidad: "20 stands",
            servicios: ["Electricidad", "Agua corriente", "Zona de carga/descarga", "Iluminación nocturna"],
            disponibilidad: "Disponible",
            imagen: "/espacios/foodcourt.jpg"
        },
        {
            id: 2,
            nombre: "Zona Paseo Central",
            zonaGeneral: "Centro",
            caracteristica: "Avenida peatonal pavimentada",
            evento: "Subsonic Festival 2026",
            lugar: "Eje central del recinto",
            tamano: "300m²",
            precio: "1.800€",
            descripcion: "Paseo principal de alto tránsito con suelo pavimentado y señalización visual estratégica.",
            capacidad: "15 stands",
            servicios: ["Electricidad", "WiFi", "Seguridad 24h", "Almacén cercano"],
            disponibilidad: "Disponible",
            imagen: "/espacios/merchandising.jpg"
        },
        {
            id: 3,
            nombre: "Zona Relax",
            zonaGeneral: "Este",
            caracteristica: "Terreno ajardinado con sombra natural",
            evento: "Subsonic Festival 2026",
            lugar: "Área verde lateral este",
            tamano: "800m²",
            precio: "3.200€",
            descripcion: "Área verde con árboles y vegetación que proporciona sombra natural, ideal para experiencias al aire libre.",
            capacidad: "10 espacios grandes",
            servicios: ["Electricidad", "Sombra natural", "Zona WiFi", "Asientos incluidos"],
            disponibilidad: "Reservado",
            imagen: "/espacios/chillout.jpg"
        },
        {
            id: 4,
            nombre: "Zona VIP",
            zonaGeneral: "Centro",
            caracteristica: "Recinto cerrado con acceso controlado",
            evento: "Subsonic Festival 2026",
            lugar: "Zona exclusiva central del recinto",
            tamano: "150m²",
            precio: "4.500€",
            descripcion: "Espacio exclusivo vallado con acceso restringido por pulsera, ambiente premium y atención personalizada.",
            capacidad: "5 barras",
            servicios: ["Electricidad", "Agua", "Cámaras frigoríficas", "Sistema de sonido", "Iluminación especial"],
            disponibilidad: "Disponible",
            imagen: "/espacios/vipbar.jpg"
        },
        {
            id: 5,
            nombre: "Zona Innova",
            zonaGeneral: "Sur",
            caracteristica: "Pabellón cubierto climatizado",
            evento: "Subsonic Festival 2026",
            lugar: "Pabellón sur - Área Innovación",
            tamano: "600m²",
            precio: "2.800€",
            descripcion: "Pabellón cerrado con climatización, perfecto para instalaciones tecnológicas y activaciones de alto impacto.",
            capacidad: "8 stands grandes",
            servicios: ["Electricidad de alta potencia", "WiFi fibra óptica", "Climatización", "Proyectores"],
            disponibilidad: "Disponible",
            imagen: "/espacios/gaming.jpg"
        },
        {
            id: 6,
            nombre: "Zona Oeste",
            zonaGeneral: "Oeste",
            caracteristica: "Callejón urbano con suelo de adoquín",
            evento: "Subsonic Festival 2026",
            lugar: "Lateral oeste del recinto",
            tamano: "400m²",
            precio: "2.000€",
            descripcion: "Callejón con estética urbana, suelo de adoquín y alto flujo de asistentes procedentes del escenario principal.",
            capacidad: "12 food trucks",
            servicios: ["Electricidad", "Agua", "Sistema de extracción", "Zona de comensales"],
            disponibilidad: "Disponible",
            imagen: "/espacios/streetfood.jpg"
        },
        {
            id: 7,
            nombre: "Zona Boutique",
            zonaGeneral: "Norte",
            caracteristica: "Espacio acotado con iluminación especial",
            evento: "Subsonic Festival 2026",
            lugar: "Entrada secundaria norte",
            tamano: "120m²",
            precio: "1.500€",
            descripcion: "Rincón exclusivo con iluminación cálida y delimitación visual, pensado para marcas de carácter premium.",
            capacidad: "6 stands",
            servicios: ["Electricidad", "Espejos", "Iluminación profesional", "Aire acondicionado"],
            disponibilidad: "Disponible",
            imagen: "/espacios/beauty.jpg"
        },
        {
            id: 8,
            nombre: "Zona Stage",
            zonaGeneral: "Sur",
            caracteristica: "Tarima elevada con gradas laterales",
            evento: "Subsonic Festival 2026",
            lugar: "Extremo sur del recinto",
            tamano: "200m²",
            precio: "5.000€",
            descripcion: "Escenario secundario elevado con gradas a ambos lados, máxima visibilidad desde cualquier ángulo del recinto.",
            capacidad: "1 escenario completo",
            servicios: ["Sistema de sonido completo", "Iluminación profesional", "Backstage", "Generador propio"],
            disponibilidad: "Reservado",
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

    const espaciosFiltrados = espaciosDisponibles.filter(espacio => {
        // Solo mostrar espacios disponibles
        if (espacio.disponibilidad !== 'Disponible') return false;

        if (filtros.zona.length > 0 && !filtros.zona.includes(espacio.zonaGeneral)) return false;
        
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

    const espacioSeleccionado = espaciosContratados.find(
        espacio => espacio.id === servicioSeleccionado?.espacioId
    );
    const espacioSeleccionadoTieneServicio = Boolean(espacioSeleccionado?.servicios?.length);
    const reemplazoActivo = servicioSeleccionado?.espacioId === modoReemplazoEspacioId;

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
                        className={`admin-nav-btn ${activeSection === 'MIS_ESPACIOS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('MIS_ESPACIOS')}
                    >
                        MIS ESPACIOS
                    </button>
                    <button 
                        className={`admin-nav-btn ${activeSection === 'ESPACIOS' ? 'active' : ''}`}
                        onClick={() => setActiveSection('ESPACIOS')}
                    >
                        CONTRATAR ESPACIOS
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
                    <h2>{activeSection === 'MIS_ESPACIOS' ? 'Mis Espacios Contratados' : 'Contratar Espacios Disponibles'}</h2>
                    <div className="admin-profile-circle">P</div>
                </header>

                {/* SECCIÓN MIS ESPACIOS */}
                {activeSection === 'MIS_ESPACIOS' && (
                    <div className="mis-espacios-container">
                        {/* Lado izquierdo: Espacios contratados */}
                        <div className="mis-espacios-left">
                            <div className="mis-espacios-box">
                                <h3 className="box-title">Mis Espacios Contratados</h3>
                                {espaciosContratados.length === 0 ? (
                                    <p style={{color: '#aaa', textAlign: 'center', padding: '20px'}}>
                                        No tienes espacios contratados
                                    </p>
                                ) : (
                                    <div className="espacios-contratados-list">
                                        {espaciosContratados.map(espacio => {
                                            const servicioAsignado = espacio.servicios[0];

                                            return (
                                                <div 
                                                    key={espacio.id}
                                                    className={`espacio-contratado-item ${servicioSeleccionado?.espacioId === espacio.id ? 'seleccionado' : ''}`}
                                                    onClick={() => {
                                                        setServicioSeleccionado({ espacioId: espacio.id });
                                                        setModoReemplazoEspacioId(null);
                                                    }}
                                                >
                                                    <div className="contratado-header">
                                                        <h4>{espacio.nombre}</h4>
                                                        <span className="tipo-badge">{espacio.tipo}</span>
                                                    </div>
                                                    <p className="contratado-detalle">📍 {espacio.lugar}</p>
                                                    <p className="contratado-detalle">📏 {espacio.tamano}</p>
                                                    <p className="contratado-detalle">💰 {espacio.precio}</p>

                                                    {servicioAsignado && (
                                                        <div className="servicios-asignados">
                                                            <p className="servicio-asignado-title">✓ Servicio asignado</p>
                                                            <p className="contratado-detalle">Nombre: {servicioAsignado.nombre}</p>
                                                            <p className="contratado-detalle">Tipo: {servicioAsignado.tipo}</p>
                                                            <p className="contratado-detalle">Fechas: {servicioAsignado.fechas}</p>
                                                            <p className="servicio-asignado-descripcion">{servicioAsignado.descripcion}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Lado derecho: Formulario para añadir servicios */}
                        <div className="mis-espacios-right">
                            <div className="admin-content-box">
                                <h3 className="form-title">
                                    CREAR NUEVO SERVICIO
                                </h3>

                                {servicioSeleccionado?.espacioId ? (
                                    <p style={{color: '#00e5ff', fontSize: '14px', marginBottom: '20px'}}>
                                        📌 Espacio seleccionado: {espacioSeleccionado?.nombre}
                                    </p>
                                ) : (
                                    <p style={{color: '#df188a', fontSize: '14px', marginBottom: '20px'}}>
                                        ⚠️ Selecciona un espacio antes de crear un servicio
                                    </p>
                                )}

                                {servicioSeleccionado?.espacioId && espacioSeleccionadoTieneServicio && !reemplazoActivo && (
                                    <p style={{color: '#df188a', fontSize: '14px', marginBottom: '20px'}}>
                                        ⚠️ Este espacio ya tiene un servicio asignado. Solo se permite uno por espacio.
                                    </p>
                                )}

                                {servicioSeleccionado?.espacioId && espacioSeleccionadoTieneServicio && !reemplazoActivo ? (
                                    <div className="servicio-bloqueado-box">
                                        <p className="servicio-bloqueado-text">
                                            Este espacio ya tiene un servicio activo. Selecciona otro espacio para asignar un nuevo servicio.
                                        </p>
                                        <button
                                            type="button"
                                            className="btn-reemplazar-servicio"
                                            onClick={() => {
                                                const servicioActual = espacioSeleccionado?.servicios?.[0];
                                                if (!servicioActual) return;

                                                setFormServicio({
                                                    nombre: servicioActual.nombre || '',
                                                    tipo: servicioActual.tipo || 'Restauración',
                                                    descripcion: servicioActual.descripcion || '',
                                                    fechas: servicioActual.fechas || ''
                                                });
                                                setModoReemplazoEspacioId(espacioSeleccionado.id);
                                            }}
                                        >
                                            Reemplazar servicio
                                        </button>
                                    </div>
                                ) : (
                                    <form className="admin-form">
                                        {reemplazoActivo && (
                                            <p style={{color: '#00e5ff', fontSize: '14px', marginBottom: '15px'}}>
                                                ✏️ Modo reemplazo activo: actualiza los datos y guarda los cambios.
                                            </p>
                                        )}
                                        <div className="form-grid">
                                            <input 
                                                type="text" 
                                                placeholder="Nombre del servicio" 
                                                value={formServicio.nombre}
                                                onChange={(e) => setFormServicio({...formServicio, nombre: e.target.value})}
                                            />
                                            <select 
                                                value={formServicio.tipo}
                                                onChange={(e) => setFormServicio({...formServicio, tipo: e.target.value})}
                                            >
                                                <option value="Restauración">Restauración</option>
                                                <option value="Merchandising">Merchandising</option>
                                                <option value="Entretenimiento">Entretenimiento</option>
                                                <option value="Bebidas">Bebidas</option>
                                                <option value="Otro">Otro</option>
                                            </select>

                                            <textarea 
                                                placeholder="Descripción del servicio"
                                                value={formServicio.descripcion}
                                                onChange={(e) => setFormServicio({...formServicio, descripcion: e.target.value})}
                                                style={{gridColumn: '1 / -1'}}
                                            />

                                            <input 
                                                type="text" 
                                                placeholder="Fechas (ej: 17-20 julio)" 
                                                value={formServicio.fechas}
                                                onChange={(e) => setFormServicio({...formServicio, fechas: e.target.value})}
                                            />
                                        </div>

                                        <div className="form-actions">
                                            <button 
                                                type="button"
                                                className="btn-add-artist"
                                                disabled={!servicioSeleccionado?.espacioId || !formServicio.nombre || !formServicio.fechas}
                                                onClick={() => {
                                                    if (servicioSeleccionado?.espacioId && formServicio.nombre && formServicio.fechas) {
                                                        if (espacioSeleccionadoTieneServicio && !reemplazoActivo) {
                                                            alert(`"${espacioSeleccionado?.nombre}" ya tiene un servicio asignado.`);
                                                            return;
                                                        }

                                                        const nuevoServicio = {
                                                            ...formServicio,
                                                            id: Date.now(),
                                                            espacioId: servicioSeleccionado.espacioId
                                                        };

                                                        setServiciosProveedor(prev => [
                                                            ...prev.filter(servicio => servicio.espacioId !== servicioSeleccionado.espacioId),
                                                            nuevoServicio
                                                        ]);

                                                        setEspaciosContratados(prev => prev.map(espacio => 
                                                            espacio.id === servicioSeleccionado.espacioId
                                                                ? { ...espacio, tipo: formServicio.tipo, servicios: [nuevoServicio] }
                                                                : espacio
                                                        ));

                                                        setFormServicio({nombre: '', tipo: 'Restauración', descripcion: '', fechas: ''});
                                                        setModoReemplazoEspacioId(null);
                                                        alert(`Servicio "${nuevoServicio.nombre}" asignado a "${espacioSeleccionado?.nombre}"`);
                                                    }
                                                }}
                                            >
                                                {reemplazoActivo ? 'Guardar Reemplazo' : 'Asignar Servicio'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* SECCIÓN ESPACIOS DISPONIBLES */}
                {activeSection === 'ESPACIOS' && (
                    <div className="espacios-container">
                        {/* Filtros laterales */}
                        <aside className="espacios-filters">
                            <div className="filter-section">
                                <h4>Zona General</h4>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtros.zona.includes('Norte')}
                                        onChange={() => handleFiltroChange('zona', 'Norte')}
                                    />
                                    Norte
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtros.zona.includes('Centro')}
                                        onChange={() => handleFiltroChange('zona', 'Centro')}
                                    />
                                    Centro
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtros.zona.includes('Este')}
                                        onChange={() => handleFiltroChange('zona', 'Este')}
                                    />
                                    Este
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtros.zona.includes('Oeste')}
                                        onChange={() => handleFiltroChange('zona', 'Oeste')}
                                    />
                                    Oeste
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtros.zona.includes('Sur')}
                                        onChange={() => handleFiltroChange('zona', 'Sur')}
                                    />
                                    Sur
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
                                                     <span className="zona-badge">{espacio.zonaGeneral}</span>
                                        <h3>{espacio.nombre}</h3>
                                                     <p className="espacio-tipo">{espacio.caracteristica}</p>
                                                     <p className="espacio-detalle">💰 {espacio.precio}</p>
                                        <p className="espacio-detalle">📍 {espacio.lugar}</p>
                                        <p className="espacio-detalle">📏 {espacio.tamano}</p>
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
                            <p className="modal-subtitle">{selectedEspacio.caracteristica}</p>
                            
                            <div className="modal-grid">
                                <div className="modal-section">
                                    <h4>📏 Dimensiones</h4>
                                    <p><strong>Tamaño:</strong> {selectedEspacio.tamano}</p>
                                    <p><strong>Capacidad:</strong> {selectedEspacio.capacidad}</p>
                                </div>

                                <div className="modal-section">
                                    <h4>📍 Ubicación</h4>
                                    <p><strong>Lugar:</strong> {selectedEspacio.lugar}</p>
                                    <p><strong>Zona:</strong> {selectedEspacio.zonaGeneral}</p>
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
