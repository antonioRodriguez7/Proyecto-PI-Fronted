import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUsuario } from '../../services/api';

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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

                    <form className="login-form" onSubmit={e => e.preventDefault()}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Introduce tu email..."
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(''); }}
                            />
                        </div>

                        <div className="input-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError(''); }}
                            />
                        </div>

                        {error && (
                            <p style={{ color: '#ff4d6d', fontSize: '13px', textAlign: 'center', margin: '0' }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="button"
                            className="btn-entrar"
                            onClick={async () => {
                                if (!email || !password) {
                                    setError('Por favor, rellena todos los campos.');
                                    return;
                                }
                                const usuario = await loginUsuario(email, password);
                                if (!usuario) {
                                    setError('Email o contraseña incorrectos.');
                                    return;
                                }
                                localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                                navigate('/perfil');
                            }}
                        >
                            ENTRAR
                        </button>
                    </form>

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