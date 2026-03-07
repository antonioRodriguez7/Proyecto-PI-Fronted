import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {

    const navigate = useNavigate();

    // Valores posibles: 'cliente' | 'proveedor' | 'administrador'
    const [tipoUsuario] = useState('administrador');

    // Estado del formulario de perfil
    const [perfil, setPerfil] = useState({
        nombre: 'Juan',
        apellidos: 'Pérez',
        username: 'juanito_99',
        descripcion: '',
        email: 'juan@ejemplo.com',
        password: '••••••••'
    });

    const handleChange = (field, value) =>
        setPerfil(prev => ({ ...prev, [field]: value }));

    const nombreCompleto = [perfil.nombre, perfil.apellidos].filter(Boolean).join(' ');

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
                            <span>{perfil.nombre ? perfil.nombre[0].toUpperCase() : 'U'}</span>
                        </div>

                        <h3 className="perfil-username">
                            {nombreCompleto || 'Nombre Usuario'}
                        </h3>

                        {perfil.username && (
                            <p className="perfil-at-username">@{perfil.username}</p>
                        )}

                        <p className="perfil-desc-text">
                            {perfil.descripcion || <span style={{ color: '#555', fontStyle: 'italic' }}>Sin descripción</span>}
                        </p>
                    </div>

                    {/* DERECHA */}
                    <div className="perfil-right">
                        <form className="perfil-form" onSubmit={e => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={perfil.nombre}
                                onChange={e => handleChange('nombre', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Apellidos"
                                value={perfil.apellidos}
                                onChange={e => handleChange('apellidos', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                value={perfil.username}
                                onChange={e => handleChange('username', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Descripción usuario"
                                value={perfil.descripcion}
                                onChange={e => handleChange('descripcion', e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={perfil.email}
                                onChange={e => handleChange('email', e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={perfil.password}
                                onChange={e => handleChange('password', e.target.value)}
                            />

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

                {/* SECCIÓN INFERIOR: panel para admin/proveedor, productos para cliente */}
                <div className="perfil-bottom-section">
                    {(tipoUsuario === 'administrador' || tipoUsuario === 'proveedor') ? (
                        <div className="panel-admin-wrapper">
                            <h3 className="section-title">
                                {tipoUsuario === 'administrador' ? 'Administración' : 'Panel de Proveedor'}
                            </h3>
                            <p className="perfil-desc-text" style={{ marginBottom: '24px' }}>
                                {tipoUsuario === 'administrador'
                                    ? 'Accede al panel de administración para gestionar artistas, entradas y espacios.'
                                    : 'Accede a tu panel de proveedor para gestionar tus espacios y servicios.'}
                            </p>
                            <button
                                className="btn-panel-admin"
                                onClick={() => navigate(
                                    tipoUsuario === 'administrador'
                                        ? '/perfil-admin'
                                        : '/perfil-proveedor'
                                )}
                            >
                                Panel de Administración
                            </button>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Perfil;