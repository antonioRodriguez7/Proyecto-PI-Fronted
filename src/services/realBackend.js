import axios from 'axios';

// Ahora solo hay una URL, todo al 8080
const URL_BASE = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: URL_BASE
});

// Interceptor para añadir el Token automáticamente en cada petición
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('subsonic_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ========== ARTISTAS (Artists - 8080) ========== */
export async function getArtistas() {
    const response = await api.get('/artists/all'); // Coincide con tu @GetMapping("/all")
    return response.data;
}

export async function createArtist(artistData) {
    // 1. Convertimos la fecha al formato que entiende LocalDate (YYYY-MM-DD)
    // Como tu formulario envía día y mes por separado, lo ideal sería montar un string ISO.
    // De momento, para probar, pondremos una fecha fija o intentaremos formatearla:
    const isoDate = "2026-07-18"; // Formato ISO estricto que requiere LocalDate

    const dataParaJava = {
        name: artistData.nombre,           // de 'nombre' a 'name'
        spotifyUrl: artistData.spotifyUrl, // de 'spoty' a 'spotifyUrl'
        imageUrl: artistData.img,          // de 'img' a 'imageUrl'
        performanceDate: isoDate,
        genre: "Electronic",               // Campo requerido en tu DTO
        description: "Artista añadido desde el panel", // Campo requerido
        stage: "Main Stage"                // Campo requerido
    };

    console.log("Enviando DTO correcto a Java:", dataParaJava);

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
    // 1. Aseguramos que el precio sea un número
    const precioNumerico = parseFloat(ticketData.precio) || 0.0;

    // 2. Aseguramos que el stock sea un número entero
    const stockNumerico = parseInt(ticketData.stock) || 100;

    // 3. Construimos el objeto EXACTO que pide TicketDTO.java
    const dataParaJava = {
        category: ticketData.categoria || "General",
        description: ticketData.descripcion || "Sin descripción",
        price: precioNumerico,
        feature: ticketData.caracteristica || "Acceso estándar",
        imageUrl: ticketData.imagenUrl || "https://via.placeholder.com/300",
        stock: stockNumerico
    };

    console.log("Enviando DTO final a Java:", dataParaJava);

    try {
        // La ruta es /api/tickets (definida en @RequestMapping("/api/tickets"))
        const response = await api.post('/tickets', dataParaJava);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(" Error 400 - Detalles de Java:", error.response.data);
        }
        throw error;
    }
}

export async function deleteTicket(id) {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
}

/* ========== ESPACIOS (Spaces - 8080) ========== */
export async function getEspacios() {
    const response = await api.get('/spaces/all');
    return response.data;
}

/* ========== USUARIOS & AUTENTICACIÓN (Auth - 8080) ========== */
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
        console.error("Error en login (8080):", error);
        throw error;
    }
}

export async function registrarUsuario(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
}

// ========== OTROS MÉTODOS (Adaptar según necesites) ==========

export async function getUsuarios() {
    const response = await api.get('/users/all');
    return response.data;
}

export async function getFaqsUsuarios() {
    // Si aún no tienes Controller de FAQs en el 8080, esto dará 404
    const response = await api.get('/faqs/usuarios');
    return response.data;
}