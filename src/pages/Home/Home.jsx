import React, { useState } from 'react';
import './Home.css';
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Perfil from '../Perfil/Perfil';
import Admin from '../Admin/Admin';

function Home() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isEntradasOpen, setIsEntradasOpen] = useState(false);
    const [pantallaActual, setPantallaActual] = useState('home');
    const [usuarioLogeado, setUsuarioLogeado] = useState(null);

    const [filtroActivo, setFiltroActivo] = useState('Todos');

    // BASE DE DATOS DE ARTISTAS provisional
    const artistas = [
        { id: 1, nombre: 'Bad Gyal', fecha: '17 Julio 2026', genero: 'Urbano', dia: 'Viernes', img: 'Bad Gyal' },
        { id: 2, nombre: 'Quevedo', fecha: '18 Julio 2026', genero: 'Urbano', dia: 'Sábado', img: 'Quevedo' },
        { id: 3, nombre: 'Bizarrap', fecha: '19 Julio 2026', genero: 'Electrónica', dia: 'Viernes', img: 'Bizarrap' },
        { id: 4, nombre: 'Rosalía', fecha: '20 Julio 2026', genero: 'Urbano', dia: 'Sábado', img: 'Rosalía' },
        { id: 5, nombre: 'Amelie Lens', fecha: '17 Julio 2026', genero: 'Electrónica', dia: 'Viernes', img: 'Amelie Lens' },
    ];

    const artistasFiltrados = artistas.filter(artista => {
        if (filtroActivo === 'Todos') return true;
        // Filtra si coincide con el día o con el género
        return artista.dia === filtroActivo || artista.genero === filtroActivo;
    });

    const toggleInfo = (e) => {
        e.preventDefault();
        setIsInfoOpen(!isInfoOpen);
    };
    const toggleEntradas = (e) => {
        e.preventDefault();
        setIsEntradasOpen(!isEntradasOpen);
    };

    if (pantallaActual === 'login') {
        return <Login
            onVolver={() => setPantallaActual('home')}
            onIrRegistro={() => setPantallaActual('registro')}
            onLogin={(tipo) => {
                setUsuarioLogeado(tipo);
                setPantallaActual('home');
            }}
        />;
    }

    if (pantallaActual === 'registro') {
        return <Registro
            onVolver={() => setPantallaActual('home')}
            onIrLogin={() => setPantallaActual('login')}
        />;
    }

    if (pantallaActual === 'perfil') {
        return <Perfil
            tipoUsuario={usuarioLogeado}
            onVolver={() => setPantallaActual('home')}
            onLogout={() => {
                setUsuarioLogeado(null);
                setPantallaActual('home');
            }}
        />;
    }

    if (pantallaActual === 'admin') {
        return <Admin onLogout={() => {
            setUsuarioLogeado(null);
            setPantallaActual('home');
        }} />;
    }

    // --- PANTALLA PRINCIPAL (HOME) ---
    return (
        <div className="app-container">

            {/* 1. CABECERA */}
            <header className="header">
                <div className="logo">
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>
                <nav>
                    <div className="nav-dropdown">
                        <a href="#Entradas" onClick={toggleEntradas}>
                            Entradas {isEntradasOpen ? '▴' : '▾'}
                        </a>
                        {isEntradasOpen && (
                            <div className="dropdown-menu">
                                <a href="#EntradasNormales">Entradas Normales</a>
                                <a href="#EntradasVip">Entradas VIP</a>
                            </div>
                        )}
                    </div>
                    <a href="#Cartel">Cartel</a>
                    <a href="#servicios">Servicios</a>

                    <div className="nav-dropdown">
                        <a href="#Info" onClick={toggleInfo}>
                            Info {isInfoOpen ? '▴' : '▾'}
                        </a>
                        {isInfoOpen && (
                            <div className="dropdown-menu">
                                <a href="#politica">Política y Privacidad</a>
                                <a href="#faq">Preguntas Frecuentes</a>
                            </div>
                        )}
                    </div>
                </nav>

                {usuarioLogeado ? (
                    <button className="login-btn" onClick={() => setPantallaActual('perfil')}>MI PERFIL</button>
                ) : (
                    <button className="login-btn" onClick={() => setPantallaActual('login')}>Acceder / Registro</button>
                )}
            </header>

            <main>
                {/* 2. HERO SECTION */}
                <section className="hero-section">
                    <h1>SUBSONIC FESTIVAL 2026</h1>
                    <p className="hero-subtitle">El mayor evento de música urbana y electrónica del mundo</p>
                </section>

                {/* 3. SECCIÓN DE EVENTOS Y FILTROS */}
                <section className="events-section">
                    <h2>Artistas Confirmados</h2>

                    {/* BARRA DE FILTROS DINÁMICA */}
                    <div className="filters-bar">
                        {['Todos', 'Viernes', 'Sábado', 'Electrónica', 'Urbano'].map((nombreFiltro) => (
                            <button
                                key={nombreFiltro}
                                className={`filter-btn ${filtroActivo === nombreFiltro ? 'active' : ''}`}
                                onClick={() => setFiltroActivo(nombreFiltro)}
                            >
                                {nombreFiltro}
                            </button>
                        ))}
                    </div>

                    {/* GRID DE ARTISTAS FILTRADOS */}
                    <div className="events-grid">
                        {artistasFiltrados.length > 0 ? (
                            artistasFiltrados.map((artista) => (
                                <div className="event-card" key={artista.id}>
                                    <div className="event-image">[ Imagen de {artista.nombre} ]</div>
                                    <h3>{artista.nombre}</h3>
                                    <p>{artista.fecha}</p>
                                    <p style={{fontSize: '0.8rem', color: '#666'}}>
                                        {artista.genero} | {artista.dia}
                                    </p>
                                    <button>INFO & ENTRADAS</button>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron artistas con ese filtro.</p>
                        )}
                    </div>

                    <div className="view-more-container">
                        <button className="view-more-btn">VER TODO EL CARTEL</button>
                    </div>
                </section>
            </main>

            {/* 4. FOOTER */}
            <footer className="footer">
                <div className="footer-left">
                    <a href="#ig" className="circle-icon">IG</a>
                    <a href="#tw" className="circle-icon">TW</a>
                    <a href="#fb" className="circle-icon">FB</a>
                </div>

                <div className="footer-center">
                    <a href="#proveedores" className="proveedores-link">Acceso Proveedores</a>
                </div>

                <div className="footer-right">
                    <div className="spotify-placeholder">
                        Música, API SPOTIFY
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Home;