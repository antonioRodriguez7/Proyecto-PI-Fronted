import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_BASE_URL
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
    const response = await api.get('/artistas');
    return response.data;
}

export async function getArtistasPorDia(dia) {
    const response = await api.get(`/artistas?dia=${encodeURIComponent(dia)}`);
    return response.data;
}

export async function getArtistaById(id) {
    const response = await api.get(`/artistas/${id}`);
    return response.data;
}

/* ========== ENTRADAS (TICKETS) ========== */
export async function getEntradas() {
    const response = await api.get('/entradas');
    return response.data;
}

export async function getEntradasDisponibles() {
    const response = await api.get('/entradas/disponibles');
    return response.data;
}

export async function getEntradaById(id) {
    const response = await api.get(`/entradas/${id}`);
    return response.data;
}

/* ========== ESPACIOS ========== */
export async function getEspacios() {
    const response = await api.get('/espacios');
    return response.data;
}

export async function getEspaciosDisponibles() {
    const response = await api.get('/espacios/disponibles');
    return response.data;
}

export async function getEspaciosReservados() {
    const response = await api.get('/espacios/reservados');
    return response.data;
}

export async function getEspacioById(id) {
    const response = await api.get(`/espacios/${id}`);
    return response.data;
}

// Simulando estas funciones desde APIs nuevas
export async function getEspaciosContratadosProveedor() {
    const response = await api.get('/espacios/reservados');
    return response.data;
}

/* ========== FAQS ========== */
export async function getFaqsUsuarios() {
    const response = await api.get('/faqs/usuarios');
    return response.data;
}

export async function getFaqsProveedores() {
    const response = await api.get('/faqs/proveedores');
    return response.data;
}

export async function getFaqs() {
    const response = await api.get('/faqs');
    return response.data;
}

/* ========== SERVICIOS ========== */
export async function getServicios() {
    const response = await api.get('/servicios');
    return response.data;
}

export async function getServiciosProveedor(proveedorId = 1) { // 1 como fallback si no se pasa
    const response = await api.get(`/servicios/proveedor/${proveedorId}`);
    return response.data;
}

export async function getServiciosEspacio(espacioId) {
    const response = await api.get(`/servicios/espacio/${espacioId}`);
    return response.data;
}

export async function getServicioById(id) {
    const response = await api.get(`/servicios/${id}`);
    return response.data;
}

/* ========== USUARIOS & AUTENTICACIÓN ========== */

export async function loginUsuario(email, password) {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('subsonic_token', response.data.token);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_role', response.data.role);
        }
        return response.data;
    } catch (error) {
        console.error("Error en login real:", error);
        throw error;
    }
}

export async function registrarUsuario(userData) {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error en registro real:", error);
        throw error;
    }
}

export async function getUsuarios() {
    const response = await api.get('/users/all'); // Assuming user endpoints remain the same
    return response.data;
}

export async function getUsuarioById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
}