import axios from 'axios';

// 1. Definimos las URLs de ambos microservicios
const URL_USUARIOS = 'http://localhost:8080/api';  // Microservicio de Usuarios/Auth
const URL_CONTENIDO = 'http://localhost:8081/api'; // Microservicio de Contenido (Artistas, Entradas, etc.)

// 2. Creamos dos instancias de Axios
const apiUsuarios = axios.create({
    baseURL: URL_USUARIOS
});

const apiContenido = axios.create({
    baseURL: URL_CONTENIDO
});

// 3. Interceptor único para añadir el Token a ambas instancias
const authInterceptor = (config) => {
    const token = localStorage.getItem('subsonic_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

apiUsuarios.interceptors.request.use(authInterceptor);
apiContenido.interceptors.request.use(authInterceptor);

/* ========== ARTISTAS (Contenido - 8081) ========== */
export async function getArtistas() {
    const response = await apiContenido.get('/artistas');
    return response.data;
}

export async function getArtistasPorDia(dia) {
    const response = await apiContenido.get(`/artistas?dia=${encodeURIComponent(dia)}`);
    return response.data;
}

export async function getArtistaById(id) {
    const response = await apiContenido.get(`/artistas/${id}`);
    return response.data;
}

/* ========== ENTRADAS / TICKETS (Contenido - 8081) ========== */
export async function getEntradas() {
    const response = await apiContenido.get('/entradas');
    return response.data;
}

export async function getEntradasDisponibles() {
    const response = await apiContenido.get('/entradas/disponibles');
    return response.data;
}

export async function getEntradaById(id) {
    const response = await apiContenido.get(`/entradas/${id}`);
    return response.data;
}

/* ========== ESPACIOS (Contenido - 8081) ========== */
export async function getEspacios() {
    const response = await apiContenido.get('/espacios');
    return response.data;
}

export async function getEspaciosDisponibles() {
    const response = await apiContenido.get('/espacios/disponibles');
    return response.data;
}

export async function getEspaciosReservados() {
    const response = await apiContenido.get('/espacios/reservados');
    return response.data;
}

export async function getEspacioById(id) {
    const response = await apiContenido.get(`/espacios/${id}`);
    return response.data;
}

export async function getEspaciosContratadosProveedor() {
    const response = await apiContenido.get('/espacios/reservados');
    return response.data;
}

/* ========== FAQS (Contenido - 8081) ========== */
export async function getFaqsUsuarios() {
    const response = await apiContenido.get('/faqs/usuarios');
    return response.data;
}

export async function getFaqsProveedores() {
    const response = await apiContenido.get('/faqs/proveedores');
    return response.data;
}

export async function getFaqs() {
    const response = await apiContenido.get('/faqs');
    return response.data;
}

/* ========== SERVICIOS (Contenido - 8081) ========== */
export async function getServicios() {
    const response = await apiContenido.get('/servicios');
    return response.data;
}

export async function getServiciosProveedor(proveedorId = 1) {
    const response = await apiContenido.get(`/servicios/proveedor/${proveedorId}`);
    return response.data;
}

export async function getServiciosEspacio(espacioId) {
    const response = await apiContenido.get(`/servicios/espacio/${espacioId}`);
    return response.data;
}

export async function getServicioById(id) {
    const response = await apiContenido.get(`/servicios/${id}`);
    return response.data;
}

/* ========== USUARIOS & AUTENTICACIÓN (Usuarios - 8080) ========== */

export async function loginUsuario(email, password) {
    try {
        const response = await apiUsuarios.post('/auth/login', { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('subsonic_token', response.data.token);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_role', response.data.role);
        }
        return response.data;
    } catch (error) {
        console.error("Error en login real (Puerto 8080):", error);
        throw error;
    }
}

export async function registrarUsuario(userData) {
    try {
        const response = await apiUsuarios.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error en registro real (Puerto 8080):", error);
        throw error;
    }
}

export async function getUsuarios() {
    const response = await apiUsuarios.get('/users/all');
    return response.data;
}

export async function getUsuarioById(id) {
    const response = await apiUsuarios.get(`/users/${id}`);
    return response.data;
}