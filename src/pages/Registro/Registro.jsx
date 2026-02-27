import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro() {

    const navigate = useNavigate();

    const [tipoUsuario, setTipoUsuario] = useState('cliente');

    return (
        <div className="registro-wrapper">

            {/* CABECERA */}
            <div className="registro-top">
                <img 
                    src="/logoPI.png" 
                    alt="Logo Subsonic" 
                    className="registro-logo"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                />
                <h2>REGISTRO DE USUARIO</h2>
            </div>

            <div className="registro-container">

                {/* IZQUIERDA */}
                <div className="registro-left">
                    <h3 className="section-title">👤 INFORMACIÓN PERSONAL</h3>

                    <form className="registro-form">
                        <input type="text" placeholder="Nombre Completo" />
                        <input type="email" placeholder="Correo electrónico" />
                        <input type="text" placeholder="Dirección" />
                        <input type="password" placeholder="Contraseña" />
                        <input type="password" placeholder="Confirmar contraseña" />
                    </form>
                </div>

                <div className="registro-divider"></div>

                {/* DERECHA */}
                <div className="registro-right">
                    <h3 className="section-title">👥 TIPO DE USUARIO</h3>

                    <div className="tipo-usuario-selector">
                        <div
                            className={`tipo-card ${tipoUsuario === 'cliente' ? 'active' : ''}`}
                            onClick={() => setTipoUsuario('cliente')}
                        >
                            Cliente
                        </div>

                        <div
                            className={`tipo-card ${tipoUsuario === 'proveedor' ? 'active' : ''}`}
                            onClick={() => setTipoUsuario('proveedor')}
                        >
                            Proveedor
                        </div>
                    </div>

                    {tipoUsuario === 'proveedor' && (
                        <textarea
                            className="descripcion-box"
                            placeholder="Descripción de tu servicio (ej. Foodtruck, Sonido...)"
                            rows="4"
                        ></textarea>
                    )}

                    <div className="terms-group">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            Acepto los Términos y Condiciones y la Política de Seguridad
                        </label>
                    </div>

                    <button 
                        className="btn-crear"
                        onClick={() => navigate('/login')}
                    >
                        CREAR CUENTA
                    </button>

                    <p className="login-link">
                        ¿Tienes cuenta?
                        <span 
                            onClick={() => navigate('/login')}
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            {' '}Inicia Sesión
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Registro;