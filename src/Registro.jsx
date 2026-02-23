import React, { useState } from 'react';
import './Registro.css';

function Registro({ onVolver, onIrLogin }) {
    // Estado para controlar qué tipo de usuario está seleccionado
    const [tipoUsuario, setTipoUsuario] = useState('cliente');

    return (
        <div className="registro-wrapper">

            {/* Cabecera del registro con el logo para volver al Home */}
            <div className="registro-top">
                <img src="/logoPI.png" alt="Logo Subsonic" className="registro-logo" onClick={onVolver} />
                <h2>REGISTRO DE USUARIO</h2>
            </div>

            <div className="registro-container">

                {/* COLUMNA IZQUIERDA: Info Personal */}
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

                {/* LÍNEA DIVISORIA EN MEDIO */}
                <div className="registro-divider"></div>

                {/* COLUMNA DERECHA: Tipo de Usuario */}
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

                    {/* Esto SOLO se muestra si elige Proveedor */}
                    {tipoUsuario === 'proveedor' && (
                        <textarea
                            className="descripcion-box"
                            placeholder="Descripción de tu servicio (ej. Foodtruck, Sonido...)"
                            rows="4"
                        ></textarea>
                    )}

                    <div className="terms-group">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">Acepto los Términos y Condiciones y la Política de Seguridad</label>
                    </div>

                    <button className="btn-crear">CREAR CUENTA</button>

                    <p className="login-link">
                        ¿Tienes cuenta? <span onClick={onIrLogin}>Inicia Sesión</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Registro;