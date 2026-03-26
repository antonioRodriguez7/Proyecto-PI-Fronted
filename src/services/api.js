/* Importamos ambos backends */
import * as fake from "./fakeBackend";
import * as real from "./realBackend";

// Cambia a 'true' si quieres usar datos de prueba sin el servidor encendido
const usarBackendFalso = false;

const backend = usarBackendFalso ? fake : real;

// --- GET (Lectura) ---
export const getEntradas = backend.getEntradas;
export const getArtistas = backend.getArtistas;
export const getEspacios = backend.getEspacios;
export const getEspaciosDisponibles = backend.getEspaciosDisponibles;

// --- AUTH ---
export const loginUsuario = backend.loginUsuario;
export const registrarUsuario = backend.registrarUsuario;
export const getUsuarios = backend.getUsuarios;
export const getUsuarioById = backend.getUsuarioById;

// --- POST / DELETE (Escritura - Solo en realBackend) ---
// Estas funciones DEBEN estar definidas en tu realBackend.js
export const createArtist = real.createArtist;
export const deleteArtist = real.deleteArtist;
export const createTicket = real.createTicket;
export const deleteTicket = real.deleteTicket;

// --- OTROS ---
export const getFaqsUsuarios = backend.getFaqsUsuarios;
export const getFaqsProveedores = backend.getFaqsProveedores;
export const getEspaciosContratadosProveedor = backend.getEspaciosContratadosProveedor;
export const getServiciosProveedor = backend.getServiciosProveedor;