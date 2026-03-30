import axios from 'axios';

const URL_BASE = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: URL_BASE
});

// Interceptor para añadir el Token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('subsonic_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ========== ARTISTAS (Artists - 8080) ========== */
export async function getArtistas() {
    const response = await api.get('/artists/all');
    return response.data;
}

export async function createArtist(artistData) {
    const isoDate = "2026-07-18"; // Fecha por defecto para LocalDate
    const dataParaJava = {
        name: artistData.nombre,
        spotifyUrl: artistData.spotifyUrl,
        imageUrl: artistData.imageUrl || artistData.img,
        performanceDate: isoDate,
        genre: "Electronic",
        description: "Artista añadido desde el panel",
        stage: "Main Stage"
    };
    const response = await api.post('/artists', dataParaJava);
    return response.data;
}

export async function deleteArtist(id) {
    const response = await api.delete(`/artists/${id}`);
    return response.data;
}

/* ========== ENTRADAS / TICKETS (Tickets - 8080) ========== */
export async function getEntradas() {
    const response = await api.get('/tickets/all');
    return response.data;
}

export async function createTicket(ticketData) {
    const dataParaJava = {
        category: ticketData.categoria || ticketData.category,
        description: ticketData.descripcion || ticketData.description,
        price: parseFloat(ticketData.precio || ticketData.price),
        feature: ticketData.caracteristica || ticketData.feature || "Acceso estándar",
        imageUrl: ticketData.imagenUrl || ticketData.imageUrl || "https://via.placeholder.com/300",
        stock: parseInt(ticketData.stock) || 100
    };
    const response = await api.post('/tickets', dataParaJava);
    return response.data;
}

export async function deleteTicket(id) {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
}

/* ========== ESPACIOS (Spaces - 8080) ========== */

// Obtener todos los espacios
export async function getEspacios() {
    const response = await api.get('/spaces/all');
    return response.data;
}

// Crear un espacio (ESTA ES LA QUE TE FALTABA)
export async function createSpace(spaceData) {
    const dataParaJava = {
        name: spaceData.name,
        type: spaceData.type,
        price: parseFloat(spaceData.price),
        sizeSquareMeters: parseInt(spaceData.sizeSquareMeters),
        isRented: spaceData.isRented || false
    };
    console.log("Enviando Espacio a Java:", dataParaJava);
    const response = await api.post('/spaces', dataParaJava);
    return response.data;
}

// Eliminar un espacio (ESTA TAMBIÉN)
export async function deleteSpace(id) {
    const response = await api.delete(`/spaces/${id}`);
    return response.data;
}

// Actualizar un espacio
export async function updateSpace(id, spaceData) {
    const response = await api.put(`/spaces/${id}`, spaceData);
    return response.data;
}

/* ========== USUARIOS & AUTENTICACIÓN ========== */
export async function loginUsuario(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
        localStorage.setItem('subsonic_token', response.data.token);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_role', response.data.role);
    }
    return response.data;
}

export async function registrarUsuario(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
}

export async function getUsuarios() {
    const response = await api.get('/users/all');
    return response.data;
}