import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUsuario } from '../../services/api';

function Login() {
    const navigate = useNavigate();

    // Estados para controlar el formulario y los errores
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        // Evitamos que la página se recargue
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, rellena todos los campos.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Llamada al Backend Real
            const data = await loginUsuario(email, password);

            // 2. Lógica de redirección basada en el ROL que devuelve tu Java
            // Ajusta los strings ('ROLE_ADMIN', etc.) según lo que tengas en tu DB
            const role = data.role;

            if (role === 'ROLE_ADMIN' || role === 'ADMINISTRADOR') {
                navigate('/perfil-admin');
            } else if (role === 'ROLE_PROVEEDOR' || role === 'PROVEEDOR') {
                navigate('/perfil-proveedor');
            } else {
                navigate('/perfil'); // Perfil de cliente por defecto
            }

        } catch (err) {
            // 3. Si las credenciales fallan o el servidor no responde
            console.error("Error en el inicio de sesión:", err);
            setError('Email o contraseña incorrectos. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* MITAD IZQUIERDA */}
            <div className="login-left">
                {/* Logo vuelve al home */}
                <div className="login-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src="/logoPI.png" alt="Logo Subsonic" />
                </div>

                <div className="login-box">
                    <h2>Iniciar Sesión</h2>
                    <p>Bienvenido de nuevo al festival</p>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Introduce tu email..."
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                required
                            />
                        </div>

                        {error && (
                            <p style={{ color: '#ff4d6d', fontSize: '13px', textAlign: 'center', margin: '10px 0' }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn-entrar"
                            disabled={loading}
                        >
                            {loading ? 'CONECTANDO...' : 'ENTRAR'}
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
            <div className="login-right">
            </div>
        </div>
    );
}

export default Login;