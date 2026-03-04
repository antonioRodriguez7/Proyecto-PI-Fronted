export async function getEntradas() {

  const response = await fetch("http://localhost:8000/entradas");

  if (!response.ok) {
    throw new Error("Error al obtener entradas");
  }

  return await response.json();
}