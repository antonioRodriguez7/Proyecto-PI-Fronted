import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Admin() {

    const navigate = useNavigate();

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
                    <button className="admin-nav-btn active">ARTISTA</button>
                    <button className="admin-nav-btn">ESPACIOS</button>
                    <button className="admin-nav-btn">HISTORIAL DE COMPRA</button>
                    <button className="admin-nav-btn">HISTORIAL DE PROVEEDORES</button>
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
                    <h2>Gestión de Artistas</h2>
                    <div className="admin-profile-circle">A</div>
                </header>

                <div className="admin-content-box">
                    <h3 className="form-title">
                        RELLENA LOS CAMPOS CON EL NUEVO ARTISTA
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

            </main>
        </div>
    );
}

export default Admin;