
/* ========== ENTRADAS ========== */
const entradas = [
  {
    id: 1,
    nombre: "ABONO GENERAL",
    precio: "72,50€",
    descripcion: "Acceso a todos los escenarios durante los 3 días del festival.",
    etiqueta: "MÁS VENDIDO",
    tipoEtiqueta: "popular",
    estado: "disponible",
    img: "/imgsTickets/ticketNormal.jpg"
  },
  {
    id: 2,
    nombre: "ABONO VIP",
    precio: "155€",
    descripcion: "Zona VIP exclusiva, acceso prioritario y barra privada.",
    etiqueta: "MUY LIMITADO",
    tipoEtiqueta: "limitado",
    estado: "disponible",
    img: "/imgsTickets/ticketVIP.jpg"
  },
  {
    id: 3,
    nombre: "DREAM VIP",
    precio: "300€",
    descripcion: "Experiencia premium completa, backstage y catering exclusivo.",
    etiqueta: "NOVEDAD",
    tipoEtiqueta: "nuevo",
    estado: "agotado",
    img: "/imgsTickets/ticketDreamVIP.jpg"
  }
];

/* Esto simula una latencia real de red, despuesd de los 300ms, devuelve los datos */
export function getEntradas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(entradas);
    }, 300);
  });
}

/* ========== ARTISTAS ========== */

const artistas = [
    { id: 1, nombre: "Bad Bunny", dia: "Viernes 17 Julio", img: "/artists/badbunny.avif" },
    { id: 2, nombre: "Rosalía", dia: "Viernes 17 Julio", img: "/artists/rosalia.jpg" },
    { id: 3, nombre: "Martín Garrix", dia: "Viernes 17 Julio", img: "/artists/martingarrix.jpg" },
    { id: 4, nombre: "Quevedo", dia: "Viernes 17 Julio", img: "/artists/quevedo.jpg" },
    { id: 5, nombre: "Bizarrap", dia: "Viernes 17 Julio", img: "/artists/biza.webp" },
    { id: 6, nombre: "Charlotte de Witte", dia: "Viernes 17 Julio", img: "/artists/charlotte.jpg" },
    { id: 7, nombre: "Saiko", dia: "Viernes 17 Julio", img: "/artists/saiko.jpg" },
    { id: 9, nombre: "Trueno", dia: "Viernes 17 Julio", img: "/artists/trueno.jpg" },
    { id: 10, nombre: "Anuel AA", dia: "Viernes 17 Julio", img: "/artists/anuel.jpg" },
    { id: 11, nombre: "Amelie Lens", dia: "Viernes 17 Julio", img: "/artists/amelielens.webp" },
    { id: 12, nombre: "Mora", dia: "Viernes 17 Julio", img: "/artists/mora.jpg" },
    { id: 13, nombre: "Don Diablo", dia: "Viernes 17 Julio", img: "/artists/dondiablo.jpg" },
    { id: 14, nombre: "Vintage Culture", dia: "Viernes 17 Julio", img: "/artists/vintage.jpg" },

    { id: 15, nombre: "Feid", dia: "Sábado 18 Julio", img: "/artists/feid.webp" },
    { id: 16, nombre: "David Guetta", dia: "Sábado 18 Julio", img: "/artists/davidguetta.jpeg" },
    { id: 17, nombre: "Karol G", dia: "Sábado 18 Julio", img: "/artists/karolg.jpg" },
    { id: 18, nombre: "Myke Towers", dia: "Sábado 18 Julio", img: "/artists/myketowers.webp" },
    { id: 19, nombre: "Carl Cox", dia: "Sábado 18 Julio", img: "/artists/carlcox.jpg" },
    { id: 20, nombre: "Rauw Alejandro", dia: "Sábado 18 Julio", img: "/artists/rauw.webp" },
    { id: 21, nombre: "Tale Of Us", dia: "Sábado 18 Julio", img: "/artists/tale.jpg" },
    { id: 22, nombre: "Dellafuente", dia: "Sábado 18 Julio", img: "/artists/dellafuente.avif" },
    { id: 23, nombre: "Peggy Gou", dia: "Sábado 18 Julio", img: "/artists/peggygou.jpg" },
    { id: 25, nombre: "Anyma", dia: "Sábado 18 Julio", img: "/artists/anyma.jpg" },
    { id: 26, nombre: "Marco Trujillo", dia: "Sábado 18 Julio", img: "/artists/marcotrujillo.jpg" },
    { id: 27, nombre: "Aidan DJ", dia: "Sábado 18 Julio", img: "/artists/aidandj.jpg" },

    { id: 28, nombre: "J Balvin", dia: "Domingo 19 Julio", img: "/artists/jbalvin.jpg" },
    { id: 29, nombre: "Amelie Lens", dia: "Domingo 19 Julio", img: "/artists/amelielens.webp" },
    { id: 30, nombre: "Rauw Alejandro", dia: "Domingo 19 Julio", img: "/artists/rauw.webp" },
    { id: 32, nombre: "Eladio Carrión", dia: "Domingo 19 Julio", img: "/artists/eladio.jpg" },
    { id: 33, nombre: "Steve Aoki", dia: "Domingo 19 Julio", img: "/artists/aoki.jpg" },
    { id: 34, nombre: "Central Cee", dia: "Domingo 19 Julio", img: "/artists/centralcee.jpg" },
    { id: 35, nombre: "Bad Gyal", dia: "Domingo 19 Julio", img: "/artists/badgyal.jpg" },
    { id: 37, nombre: "Duki", dia: "Domingo 19 Julio", img: "/artists/duki.jpg" },
    { id: 38, nombre: "Solomun", dia: "Domingo 19 Julio", img: "/artists/solomun.jpg" },
    { id: 39, nombre: "Alesso", dia: "Domingo 19 Julio", img: "/artists/alesso.jpg" }
];

export function getArtistas() {
    return Promise.resolve(artistas);
}