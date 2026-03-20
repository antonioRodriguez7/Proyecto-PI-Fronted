import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Interceptor para pegar el Token en cada llamada
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('subsonic_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ========== ARTISTAS ========== */
export async function getArtistas() {
    const response = await api.get('/artists/all');
    return response.data;
}

/* ========== ENTRADAS (TICKETS) ========== */
export async function getEntradas() {
    const response = await api.get('/tickets/all');
    return response.data;
}

/* ========== ESPACIOS ========== */
export async function getEspacios() {
    const response = await api.get('/spaces/all');
    return response.data;
}

// Para la página de proveedores que busca espacios disponibles
export async function getEspaciosDisponibles() {
    const response = await api.get('/spaces/available');
    return response.data;
}

/* ========== USUARIOS & AUTENTICACIÓN ========== */

export async function loginUsuario(email, password) {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('subsonic_token', response.data.token);
            localStorage.setItem('user_email', email);
            // Guardamos el rol para las redirecciones en el Front
            localStorage.setItem('user_role', response.data.role);
        }
        return response.data;
    } catch (error) {
        console.error("Error en login real:", error);
        throw error;
    }
}

// Esta es la función que conectará con tu formulario de Registro
export async function registrarUsuario(userData) {
    try {
        // userData debe traer: { name, email, password, role }
        // El role será "CLIENTE", "PROVEEDOR" o "ADMIN" según lo que elijan
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error en registro real:", error);
        throw error;
    }
}

export async function getUsuarios() {
    const response = await api.get('/users/all');
    return response.data;
}

export async function getUsuarioById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

/* ========== FAQS (Suelen ser estáticas, pero aquí las tienes por si las subes a DB) ========== */
export async function getFaqsUsuarios() {
    // Si no tienes tabla de FAQs en Java, puedes devolver un array estático aquí
    // o crear el endpoint en Spring Boot
    const response = await api.get('/faqs/users');
    return response.data;
}