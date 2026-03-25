import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
    const navigate = useNavigate();

    // 1. LEER LOS DATOS REALES (Los que guardamos en Login.jsx)
    const token = localStorage.getItem('subsonic_token');
    const userRole = localStorage.getItem('user_role');
    const userEmail = localStorage.getItem('user_email');

    // 2. PROTECCIÓN DE RUTA: Si no hay token, fuera
    useEffect(() => {
        if (!token) {
            console.log("No hay token, redirigiendo al login...");
            navigate('/login');
        }
    }, [token, navigate]);

    // 3. ESTADO DEL PERFIL
    // Nota: Como no tenemos el objeto 'usuarioActivo' entero,
    // lo ideal sería hacer un fetch al backend aquí con el token.
    const [perfil, setPerfil] = useState({
        nombre: 'Usuario',
        apellidos: '',
        username: userEmail ? userEmail.split('@')[0] : 'usuario',
        descripcion: '',
        email: userEmail || '',
        password: ''
    });

    const handleChange = (field, value) =>
        setPerfil(prev => ({ ...prev, [field]: value }));

    const nombreCompleto = [perfil.nombre, perfil.apellidos].filter(Boolean).join(' ');

    // 4. LOGOUT CORREGIDO
    const handleLogout = () => {
        localStorage.removeItem('subsonic_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
        window.location.href = '/login';
    };

    return (
        <div className="perfil-page">
            <div className="perfil-nav">
                <button className="btn-atras" onClick={() => navigate('/')}>← Atrás</button>
                <img src="/logoPI.png" alt="Logo" className="perfil-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                <button className="btn-logout-nav" onClick={handleLogout}>Cerrar Sesión</button>
            </div>

            <div className="perfil-container">
                <div className="perfil-top-section">
                    <div className="perfil-left">
                        <div className="avatar-circle">
                            <span>{perfil.nombre ? perfil.nombre[0].toUpperCase() : 'U'}</span>
                        </div>
                        <h3 className="perfil-username">{nombreCompleto}</h3>
                        <p className="perfil-at-username">@{perfil.username}</p>
                        <p className="perfil-desc-text">{perfil.descripcion || <i>Sin descripción</i>}</p>
                    </div>

                    <div className="perfil-right">
                        <form className="perfil-form" onSubmit={e => e.preventDefault()}>
                            <input type="text" placeholder="Nombre" value={perfil.nombre} onChange={e => handleChange('nombre', e.target.value)} />
                            <input type="email" placeholder="Email" value={perfil.email} readOnly />
                            <button type="button" className="btn-guardar">Guardar Cambios</button>
                        </form>
                    </div>
                </div>

                <hr className="perfil-divider" />

                <div className="perfil-bottom-section">
                    {/* Ajustado para usar userRole */}
                    {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_PROVEEDOR') ? (
                        <div className="panel-admin-wrapper">
                            <h3 className="section-title">
                                {userRole === 'ROLE_ADMIN' ? 'Administración' : 'Panel de Proveedor'}
                            </h3>
                            <button
                                className="btn-panel-admin"
                                onClick={() => navigate(userRole === 'ROLE_ADMIN' ? '/perfil-admin' : '/perfil-proveedor')}
                            >
                                Panel de Gestión
                            </button>
                        </div>
                    ) : (
                        <h3 className="section-title">Mis Entradas</h3>
                        // ... resto de tus productos ...
                    )}
                </div>
            </div>
        </div>
    );
}

export default Perfil;