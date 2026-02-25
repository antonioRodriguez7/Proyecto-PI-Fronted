import React, { useState } from 'react';
import './Home.css';
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Perfil from '../Perfil/Perfil';
import Admin from '../Admin/Admin';

function Home() {
    // 1. Creamos el estado para saber si el menú está abierto o cerrado
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isEntradasOpen, setIsEntradasOpen] = useState(false);

    const [pantallaActual, setPantallaActual] = useState('home');
    const [usuarioLogeado, setUsuarioLogeado] = useState(null);

    // 2. Función para abrir/cerrar el menú al hacer clic
    const toggleInfo = (e) => {
        e.preventDefault(); // Evita que la página suba arriba de golpe
        setIsInfoOpen(!isInfoOpen);
    };
    const toggleEntradas = (e) => {
        e.preventDefault(); // Evita que la página suba arriba de golpe
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

    return (
        <div className="app-container">

            {/* 1. CABECERA */}
            <header className="header">
                <div className="logo">
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>
                <nav>
                    {/* AQUÍ ESTÁ EL MENÚ DESPLEGABLE */}
                    <div className="nav-dropdown">
                        <a href="#Entradas" onClick={toggleEntradas}>
                            Entradas {isEntradasOpen ? '▴' : '▾'}
                        </a>

                        {/* Esto solo se dibuja si isEntradasOpen es true */}
                        {isEntradasOpen && (
                            <div className="dropdown-menu">
                                <a href="#EntradasNormales">Entradas Normales</a>
                                <a href="#EntradasVip">Entradas VIP</a>
                            </div>
                        )}
                    </div>
                    <a href="#Cartel">Cartel</a>
                    <a href="#servicios">Servicios</a>

                    {/* AQUÍ ESTÁ EL MENÚ DESPLEGABLE */}
                    <div className="nav-dropdown">
                        <a href="#Info" onClick={toggleInfo}>
                            Info {isInfoOpen ? '▴' : '▾'}
                        </a>

                        {/* Esto solo se dibuja si isInfoOpen es true */}
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
            {/* 2. SECCIÓN PRINCIPAL (HERO) Y BUSCADOR */}
            <main>
                <section className="hero-section">
                    <h1>SUBSONIC FESTIVAL 2026</h1>
                    <p className="hero-subtitle">El mayor evento de música urbana y electrónica del mundo</p>
                </section>

                {/* 3. LISTADO DE ARTISTAS / EVENTOS */}
                <section className="events-section">
                    <h2>Artistas Confirmados</h2>

                    {/* Barra de filtros */}
                    <div className="filters-bar">
                        <button className="filter-btn active">Todos</button>
                        <button className="filter-btn">Viernes</button>
                        <button className="filter-btn">Sábado</button>
                        <button className="filter-btn">Electrónica</button>
                        <button className="filter-btn">Urbano</button>
                    </div>

                    <div className="events-grid">

                        <div className="event-card">
                            <div className="event-image">[ Imagen de Bad Gyal ]</div>
                            <h3>Bad Gyal</h3>
                            <p>17 Julio 2026</p>
                            <button>INFO & ENTRADAS</button>
                        </div>

                        <div className="event-card">
                            <div className="event-image">[ Imagen de Quevedo ]</div>
                            <h3>Quevedo</h3>
                            <p>18 Julio 2026</p>
                            <button>INFO & ENTRADAS</button>
                        </div>

                        <div className="event-card">
                            <div className="event-image">[ Imagen de Bizarrap ]</div>
                            <h3>Bizarrap</h3>
                            <p>19 Julio 2026</p>
                            <button>INFO & ENTRADAS</button>
                        </div>

                        <div className="event-card">
                            <div className="event-image">[ Imagen de Rosalía ]</div>
                            <h3>Rosalía</h3>
                            <p>20 Julio 2026</p>
                            <button>INFO & ENTRADAS</button>
                        </div>

                    </div>

                    {/* Botón para ver más */}
                    <div className="view-more-container">
                        <button className="view-more-btn">VER TODO EL CARTEL</button>
                    </div>

                </section>
            </main>

            {/* 4. FOOTERR */}
            <footer className="footer">

                {/* Izquierda: Redes Sociales */}
                <div className="footer-left">
                    <a href="#ig" className="circle-icon">IG</a>
                    <a href="#tw" className="circle-icon">TW</a>
                    <a href="#fb" className="circle-icon">FB</a>
                </div>

                {/* Centro: Acceso Proveedores */}
                <div className="footer-center">
                    <a href="#proveedores" className="proveedores-link">Acceso Proveedores</a>
                </div>

                {/* Derecha: API Spotify (Placeholder) */}
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