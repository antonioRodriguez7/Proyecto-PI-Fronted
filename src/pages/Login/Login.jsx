import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

    const navigate = useNavigate();

    return (
        <div className="login-container">

            {/* MITAD IZQUIERDA */}
            <div className="login-left">

                {/* Logo vuelve al home */}
                <div className="login-logo" onClick={() => navigate('/')}>
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

                        {/* Simulación login cliente */}
                        <button
                            type="button"
                            className="btn-entrar"
                            onClick={() => navigate('/perfil')}
                        >
                            ENTRAR
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px' }}>
                        <span
                            style={{ color: '#888', cursor: 'pointer', display: 'block', marginBottom: '8px' }}
                            onClick={() => navigate('/perfil-admin')}
                        >
                            [Prueba] Entrar como Admin
                        </span>
                        <span
                            style={{ color: '#888', cursor: 'pointer' }}
                            onClick={() => navigate('/perfil-proveedor')}
                        >
                            [Prueba] Entrar como Proveedor
                        </span>
                    </p>

                    <div className="login-links">
                        <a href="#olvido" className="link-olvido">
                            ¿Olvidaste la contraseña?
                        </a>

                        <p className="link-registro">
                            ¿No tienes cuenta?
                            <span
                                onClick={() => navigate('/registro')}
                                style={{ cursor: 'pointer', color: '#df188a', fontWeight: 'bold' }}
                            >
                                {' '}Regístrate aquí
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* MITAD DERECHA */}
            <div className="login-right"></div>

        </div>
    );
}

export default Login;