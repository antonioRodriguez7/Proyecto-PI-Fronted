import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {

    const navigate = useNavigate();

    return (
        <div className="perfil-page">

            {/* CABECERA PERFIL */}
            <div className="perfil-nav">
                <button 
                    className="btn-atras"
                    onClick={() => navigate('/')}
                >
                    ← Atrás
                </button>

                <img 
                    src="/logoPI.png" 
                    alt="Logo" 
                    className="perfil-logo"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                />

                <button 
                    className="btn-logout-nav"
                    onClick={() => navigate('/login')}
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="perfil-container">

                {/* PARTE SUPERIOR */}
                <div className="perfil-top-section">

                    {/* IZQUIERDA */}
                    <div className="perfil-left">
                        <div className="avatar-circle">
                            <span>U</span>
                        </div>

                        <h3 className="perfil-username">Nombre Usuario</h3>

                        <p className="perfil-desc-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque suscipit, lorem a suscipit congue, elit urna
                            dapibus sem, vel bibendum sem lectus vel ex.
                        </p>
                    </div>

                    {/* DERECHA */}
                    <div className="perfil-right">
                        <form className="perfil-form">
                            <input type="text" placeholder="Nombre" defaultValue="Juan" />
                            <input type="text" placeholder="Apellidos" defaultValue="Pérez" />
                            <input type="text" placeholder="Nombre de usuario" defaultValue="juanito_99" />
                            <input type="text" placeholder="Descripción usuario" />
                            <input type="email" placeholder="Email" defaultValue="juan@ejemplo.com" />
                            <input type="password" placeholder="Contraseña" defaultValue="••••••••" />

                            <button 
                                type="button"
                                className="btn-guardar"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>

                {/* DIVISOR */}
                <hr className="perfil-divider" />

                {/* PRODUCTOS */}
                <div className="perfil-bottom-section">
                    <h3 className="section-title">Productos adquiridos</h3>

                    <div className="productos-grid">
                        <div className="producto-card">
                            <div className="producto-img">🎟️</div>
                            <p>Abono 3 Días</p>
                        </div>

                        <div className="producto-card">
                            <div className="producto-img">⭐</div>
                            <p>Pase VIP</p>
                        </div>

                        <div className="producto-card">
                            <div className="producto-img">👕</div>
                            <p>Camiseta Subsonic</p>
                        </div>

                        <div className="producto-card">
                            <div className="producto-img">🚌</div>
                            <p>Bus Lanzadera</p>
                        </div>

                        <div className="producto-card empty">
                            <p>+</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Perfil;