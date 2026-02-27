import React from 'react';
import './Login.css';

function Login({ onVolver, onIrRegistro, onLogin }) {
    return (
        <div className="login-container">

            {/* MITAD IZQUIERDA: FORMULARIO */}
            <div className="login-left">

                {/* Logo sirve para volver atrás */}
                <div className="login-logo" onClick={onVolver}>
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>

                <div className="login-box">
                    <h2>Iniciar Sesión</h2>
                    <p>Bienvenido de nuevo al festival</p>

                    <form className="login-form">
                        <div className="input-group">
                            <label>Usuario / Email</label>
                            <input type="text" placeholder="Introduce tu usuario..." />
                        </div>

                        <div className="input-group">
                            <label>Contraseña</label>
                            <input type="password" placeholder="••••••••" />
                        </div>

                        {/* BOTÓN inicia sesión como 'cliente' */}
                        <button type="button" className="btn-entrar" onClick={() => onLogin('cliente')}>ENTRAR</button>
                    </form>

                    <p style={{textAlign: 'center', marginTop: '15px', fontSize: '13px'}}>
                        <span style={{color: '#888', cursor: 'pointer'}} onClick={() => onLogin('proveedor')}>
                            [Prueba] Entrar como Proveedor
                        </span>
                    </p>

                    <div className="login-links">
                        <a href="#olvido" className="link-olvido">¿Olvidaste la contraseña?</a>
                        <p className="link-registro">¿No tienes cuenta? <span onClick={onIrRegistro} style={{cursor: 'pointer', color: '#df188a', fontWeight: 'bold'}}>Regístrate aquí</span></p>
                    </div>
                </div>
            </div>

            {/* MITAD DERECHA: IMAGEN DEL FESTIVAL */}
            <div className="login-right">
            </div>

        </div>
    );
}

export default Login;