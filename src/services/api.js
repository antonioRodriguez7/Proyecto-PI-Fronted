/* Importamos ambos backends, el falso y el real, y luego exportamos el que queremos usar */
import * as fake from "./fakeBackend";
import * as real from "./realBackend";

const usarBackendFalso = false;

const backend = usarBackendFalso ? fake : real;

export const getEntradas = backend.getEntradas;

export const getArtistas = backend.getArtistas;

export const getFaqsUsuarios = backend.getFaqsUsuarios;
export const getFaqsProveedores = backend.getFaqsProveedores;

export const getEspaciosContratadosProveedor = backend.getEspaciosContratadosProveedor;
export const getServiciosProveedor = backend.getServiciosProveedor;
export const getEspaciosDisponibles = backend.getEspaciosDisponibles;
export const getEspacios = backend.getEspacios;

export const getUsuarios = backend.getUsuarios;
export const getUsuarioById = backend.getUsuarioById;
export const loginUsuario = backend.loginUsuario;
export const registrarUsuario = backend.registrarUsuario;